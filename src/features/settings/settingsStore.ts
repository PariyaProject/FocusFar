import { defineStore } from 'pinia';
import type { UserSettings } from '../training/types';

const STORAGE_KEY = 'focusfar_user_settings';

const defaultSettings: UserSettings = {
  stereoMode: 'cross',
  parallaxIntensity: 0.5,
  speed: 0.3,
  cycles: 20,
  rounds: 3,
  restSec: 10,
};

export const useSettingsStore = defineStore('settings', {
  state: (): UserSettings => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
    return { ...defaultSettings };
  },
  
  actions: {
    saveSettings() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state));
    },
    
    updateSettings(partialSettings: Partial<UserSettings>) {
      this.$patch(partialSettings);
      this.saveSettings();
    },

    resetToDefault() {
      this.$state = { ...defaultSettings };
      this.saveSettings();
    }
  }
});
