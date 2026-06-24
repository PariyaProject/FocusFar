export type StereoMode = 'cross' | 'parallel';

export type SessionPhaseType =
  | 'locking'       // User is trying to merge the two images
  | 'dynamic'       // The parallax is actively changing
  | 'rest'          // User closes eyes
  | 'completed';

export interface TrainingSessionConfig {
  stereoMode: StereoMode;
  parallaxIntensity: number; // 0.1 to 1.0 (multiplier for max separation)
  speed: number;             // 0.1 to 2.0 (multiplier for animation speed)
  cycles: number;            // Number of cycles per round
  rounds: number;            // Number of dynamic/rest cycles
  restSec: number;           // Seconds to rest after each dynamic round
}

export interface TrainingRecord {
  id: string;
  mode: string;
  startedAt: string;
  endedAt: string;
  plannedDurationSec: number;
  actualDurationSec: number;
  completed: boolean;
  completedRounds: number;
}

export interface UserSettings {
  stereoMode: StereoMode;
  parallaxIntensity: number;
  speed: number;
  cycles: number;
  rounds: number;
  restSec: number;
}
