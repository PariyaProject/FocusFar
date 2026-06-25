<script setup lang="ts">
import { onBeforeUnmount, watch, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useTrainingSession } from '../features/training/composables/useTrainingSession';
import { useSettingsStore } from '../features/settings/settingsStore';
import { statsService } from '../features/stats/statsService';
import StereoCanvas2D from '../features/stereo/StereoCanvas2D.vue';
import StereoCanvas3D from '../features/stereo/StereoCanvas3D.vue';
import { Icon } from '@iconify/vue';

const router = useRouter();
const { t } = useI18n();
const settingsStore = useSettingsStore();
const session = useTrainingSession();

const isPortrait = ref(false);
const checkOrientation = () => {
  isPortrait.value = window.innerHeight > window.innerWidth;
  if (isPortrait.value && session.status.value === 'running') {
    session.pauseSession();
  }
};

onMounted(() => {
  checkOrientation();
  window.addEventListener('resize', checkOrientation);
});

session.startSession(settingsStore.$state);

watch(() => session.status.value, (newStatus) => {
  if (newStatus === 'completed') {
    const record = session.getRecord();
    if (record) statsService.saveRecord(record);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkOrientation);
  if (session.status.value === 'running' || session.status.value === 'paused') {
    session.stopSession();
    const record = session.getRecord();
    if (record) statsService.saveRecord(record);
  }
  exitFullscreenAndUnlock();
});

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const exitFullscreenAndUnlock = async () => {
  try {
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  } catch (err) {
    console.warn("Exit fullscreen or orientation unlock failed", err);
  }
};

const enterFullscreenAndLandscape = async () => {
  try {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      await elem.requestFullscreen();
    }
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock('landscape');
    }
  } catch (err) {
    console.warn("Fullscreen or orientation lock failed", err);
  }
};

const handleBack = async () => {
  if (session.status.value === 'running') {
    if (!confirm(t('training.confirmExit'))) return;
  }
  await exitFullscreenAndUnlock();
  router.push('/');
};

const togglePause = () => {
  if (session.status.value === 'running') {
    session.pauseSession();
  } else if (session.status.value === 'paused') {
    session.resumeSession();
  }
};
</script>

<template>
  <div class="flex-1 flex flex-col pt-2 pb-2 h-full">
    <div class="flex justify-between items-center mb-6">
      <button @click="handleBack" class="p-2 -ml-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <Icon icon="mdi:arrow-left" class="w-6 h-6" />
      </button>
      
      <div class="text-xs sm:text-sm font-medium text-slate-500 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
        <span v-if="session.status.value !== 'completed'">
          {{ t('training.round') }}: {{ session.currentRound.value }} / {{ session.totalRounds.value }}
        </span>
        <span v-else class="text-primary font-bold">{{ t('training.completed') }}</span>
        
        <span v-if="session.currentPhase.value === 'dynamic'" class="text-primary font-bold font-mono text-base sm:text-lg bg-primary/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md">
          {{ session.currentCycles.value }} / {{ settingsStore.cycles }} {{ t('training.times') }}
        </span>
      </div>

      <button 
        v-if="session.status.value === 'running' || session.status.value === 'paused'"
        @click="togglePause" 
        class="p-2 -mr-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <Icon :icon="session.status.value === 'running' ? 'mdi:pause' : 'mdi:play'" class="w-6 h-6" />
      </button>
      <div v-else class="w-10"></div>
    </div>

    <div class="flex-1 flex flex-col mb-2 relative min-h-0">
      
      <!-- Orientation Warning Overlay -->
      <div v-if="isPortrait" class="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md rounded-2xl text-white p-6 text-center border border-slate-700">
        <Icon icon="mdi:phone-rotate-landscape" class="w-24 h-24 mb-6 text-primary animate-bounce" />
        <h2 class="text-xl sm:text-2xl font-bold mb-4">{{ t('training.rotate.title') }}</h2>
        <p class="text-sm sm:text-base text-slate-300 max-w-sm leading-relaxed mb-8">{{ t('training.rotate.desc') }}</p>
        
        <button @click="enterFullscreenAndLandscape" class="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2">
          <Icon icon="mdi:fullscreen" class="w-6 h-6" />
          {{ t('training.rotate.autoRotate') }}
        </button>
      </div>

      <div v-if="session.currentPhase.value === 'rest'" v-show="!isPortrait" class="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700/50">
        <div class="text-7xl font-black text-slate-800 dark:text-slate-100 mb-6 font-mono tracking-tighter opacity-50">
          {{ formatTime(session.timeLeftSec.value) }}
        </div>
        <div class="text-xl font-medium text-primary">{{ t('training.rest') }}</div>
      </div>

      <div v-else-if="session.currentPhase.value !== 'completed'" v-show="!isPortrait" class="flex-1 flex flex-col relative">
        <div class="flex-1 min-h-0 flex flex-col relative w-full h-full">
          <StereoCanvas2D 
            v-if="settingsStore.renderEngine === '2d'"
            :mode="settingsStore.stereoMode"
            :is-dynamic="session.currentPhase.value === 'dynamic'"
            :intensity="settingsStore.parallaxIntensity"
            :speed="settingsStore.speed"
            :is-paused="session.status.value === 'paused'"
            :min-distance="settingsStore.minDistance"
            :max-distance="settingsStore.maxDistance"
            :use-physical-calibration="settingsStore.usePhysicalCalibration"
            :userIPD="settingsStore.userIPD"
            :screen-diagonal="settingsStore.screenDiagonal"
            @cycle="session.setCycle"
          />
          <StereoCanvas3D 
            v-else
            :mode="settingsStore.stereoMode"
            :is-dynamic="session.currentPhase.value === 'dynamic'"
            :intensity="settingsStore.parallaxIntensity"
            :speed="settingsStore.speed"
            :is-paused="session.status.value === 'paused'"
            :min-distance="settingsStore.minDistance"
            :max-distance="settingsStore.maxDistance"
            :use-physical-calibration="settingsStore.usePhysicalCalibration"
            :userIPD="settingsStore.userIPD"
            :screen-diagonal="settingsStore.screenDiagonal"
            @cycle="session.setCycle"
          />
        </div>

        <div v-if="session.status.value === 'paused'" class="absolute inset-0 flex items-center justify-center bg-slate-900/10 dark:bg-slate-900/40 backdrop-blur-[2px] z-10 rounded-xl">
          <div class="text-2xl font-bold tracking-widest text-slate-700 dark:text-slate-300">{{ t('training.paused') }}</div>
        </div>

        <div v-if="session.currentPhase.value === 'locking'" class="fixed inset-x-0 bottom-8 flex flex-col items-center justify-center z-20 pointer-events-none px-4">
          <div class="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl shadow-2xl max-w-md w-full mx-auto text-center pointer-events-auto">
            <div class="text-lg font-medium text-slate-100 mb-2">
              {{ t('training.locking.instruction', { mode: settingsStore.stereoMode === 'cross' ? t('training.locking.cross') : t('training.locking.parallel') }) }}
            </div>
            <div class="text-sm text-slate-400 mb-6">
              {{ t('training.locking.desc') }}
            </div>
            <button @click="session.confirmLock" class="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 animate-pulse w-full">
              {{ t('training.locking.confirm') }}
            </button>
          </div>
        </div>
      </div>
      
      <div v-else v-show="!isPortrait" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <Icon icon="mdi:check-circle" class="w-24 h-24 text-primary mx-auto mb-4" />
          <div class="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{{ t('training.done.title') }}</div>
          <div class="text-slate-500 mb-8">{{ t('training.done.desc') }}</div>
          <button @click="handleBack" class="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-xl shadow-md transition-colors">
            {{ t('training.done.back') }}
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>
