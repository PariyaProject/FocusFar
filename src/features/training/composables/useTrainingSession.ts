import { ref, computed, readonly } from 'vue';
import type { TrainingSessionConfig, SessionPhaseType, TrainingRecord } from '../types';

export function useTrainingSession() {
  const config = ref<TrainingSessionConfig | null>(null);
  
  const status = ref<'idle' | 'running' | 'paused' | 'completed' | 'stopped'>('idle');
  const currentPhase = ref<SessionPhaseType>('locking');
  
  const currentRound = ref(1);
  const currentCycles = ref(0);
  const timeLeftSec = ref(0);
  const actualDurationSec = ref(0);
  const timerId = ref<number | null>(null);
  const startTime = ref<number>(0);

  const totalRounds = computed(() => config.value?.rounds || 0);

  const startSession = (sessionConfig: TrainingSessionConfig) => {
    config.value = sessionConfig;
    status.value = 'running';
    currentPhase.value = 'locking';
    currentRound.value = 1;
    startTime.value = Date.now();
    actualDurationSec.value = 0;
    
    // In locking phase, there is no strict timer, user must click "Ready"
    runDurationCounter();
  };

  const confirmLock = () => {
    if (status.value !== 'running' || currentPhase.value !== 'locking') return;
    startDynamicPhase();
  };

  const startDynamicPhase = () => {
    currentPhase.value = 'dynamic';
    currentCycles.value = 0;
    timeLeftSec.value = 0; 
  };

  const startRestPhase = () => {
    currentPhase.value = 'rest';
    timeLeftSec.value = config.value?.restSec || 10;
  };

  // We have two timers: one for the phase countdown (if applicable), 
  // one for the overall duration. We can combine them.
  const runDurationCounter = () => {
    clearTimer();
    timerId.value = window.setInterval(() => {
      if (status.value !== 'running') return;

      actualDurationSec.value++;

      // If we are in a timed phase
      if (currentPhase.value === 'rest') {
        timeLeftSec.value--;
        if (timeLeftSec.value <= 0) {
          handlePhaseComplete();
        }
      }
    }, 1000);
  };

  const handlePhaseComplete = () => {
    if (currentPhase.value === 'dynamic') {
      startRestPhase();
    } else if (currentPhase.value === 'rest') {
      if (currentRound.value < totalRounds.value) {
        currentRound.value++;
        startDynamicPhase(); // go straight into next dynamic phase
      } else {
        finishSession();
      }
    }
  };

  const clearTimer = () => {
    if (timerId.value !== null) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  };

  const setCycle = (count: number) => {
    if (currentPhase.value !== 'dynamic' || status.value !== 'running') return;
    currentCycles.value = count;
    if (config.value && count >= config.value.cycles) {
      handlePhaseComplete();
    }
  };

  const pauseSession = () => {
    if (status.value === 'running') {
      status.value = 'paused';
    }
  };

  const resumeSession = () => {
    if (status.value === 'paused') {
      status.value = 'running';
    }
  };

  const stopSession = () => {
    status.value = 'stopped';
    clearTimer();
  };

  const finishSession = () => {
    status.value = 'completed';
    currentPhase.value = 'completed';
    clearTimer();
  };

  const getRecord = (): TrainingRecord | null => {
    if (!config.value || status.value === 'idle') return null;

    const plannedSec = config.value.rounds * (30 + config.value.restSec);

    return {
      id: Math.random().toString(36).substring(2, 9),
      mode: `stereo_${config.value.stereoMode}`,
      startedAt: new Date(startTime.value).toISOString(),
      endedAt: new Date().toISOString(),
      plannedDurationSec: plannedSec,
      actualDurationSec: actualDurationSec.value,
      completed: status.value === 'completed',
      completedRounds: status.value === 'completed' ? config.value.rounds : Math.max(0, currentRound.value - 1)
    };
  };

  return {
    status: readonly(status),
    currentPhase: readonly(currentPhase),
    currentRound: readonly(currentRound),
    currentCycles: readonly(currentCycles),
    totalRounds,
    timeLeftSec: readonly(timeLeftSec),
    actualDurationSec: readonly(actualDurationSec),
    startSession,
    confirmLock,
    pauseSession,
    resumeSession,
    stopSession,
    getRecord,
    setCycle
  };
}
