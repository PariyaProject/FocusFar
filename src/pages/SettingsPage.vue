<script setup lang="ts">
import { useSettingsStore } from '../features/settings/settingsStore';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';

const settingsStore = useSettingsStore();
const { stereoMode, parallaxIntensity, speed, cycles, rounds, restSec, minDistance, maxDistance, usePhysicalCalibration, userIPD, screenDiagonal } = storeToRefs(settingsStore);
const { t } = useI18n();

const save = () => {
  settingsStore.saveSettings();
  alert(t('settings.saved'));
};

const reset = () => {
  if (confirm(t('settings.confirmReset'))) {
    settingsStore.resetToDefault();
  }
};
</script>

<template>
  <div class="py-8">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <Icon icon="mdi:cog-outline" class="w-6 h-6 text-primary" />
      {{ t('settings.title') }}
    </h1>

    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 border border-white/50 dark:border-white/10 space-y-8 transition-all">
      
      <section>
        <h2 class="text-lg font-semibold mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">{{ t('settings.mode.title') }}</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{{ t('settings.mode.focusMethod') }}</label>
            <div class="flex gap-4">
              <label class="flex-1 cursor-pointer">
                <input type="radio" v-model="stereoMode" value="parallel" class="peer sr-only" />
                <div class="p-3 text-center border rounded-lg peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                  <div class="font-bold">{{ t('settings.mode.parallelTitle') }}</div>
                  <div class="text-xs text-slate-500 mt-1">{{ t('settings.mode.parallelDesc') }}</div>
                </div>
              </label>
              <label class="flex-1 cursor-pointer">
                <input type="radio" v-model="stereoMode" value="cross" class="peer sr-only" />
                <div class="p-3 text-center border rounded-lg peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                  <div class="font-bold">{{ t('settings.mode.crossTitle') }}</div>
                  <div class="text-xs text-slate-500 mt-1">{{ t('settings.mode.crossDesc') }}</div>
                </div>
              </label>
            </div>
          </div>
          
          <div class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 space-y-4">
            <div class="flex items-center justify-between">
              <span class="font-medium text-slate-700 dark:text-slate-300">{{ t('settings.calibration.title') }}</span>
              <label class="relative inline-flex items-center cursor-pointer" :title="t('settings.calibration.use')">
                <input type="checkbox" v-model="usePhysicalCalibration" class="sr-only peer">
                <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
              </label>
            </div>

            <div v-if="!usePhysicalCalibration" class="pt-2 border-t border-slate-200 dark:border-slate-600">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
                <span>{{ t('settings.mode.intensity') }}</span>
                <span>{{ (parallaxIntensity * 100).toFixed(0) }}%</span>
              </label>
              <input type="range" v-model.number="parallaxIntensity" min="0.1" max="1.0" step="0.1" class="w-full accent-primary" />
            </div>
            
            <div v-if="usePhysicalCalibration" class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-600">
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{{ t('settings.calibration.ipd') }}</label>
                <input type="number" v-model.number="userIPD" min="40" max="80" step="1"
                  class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
                <div class="text-xs text-slate-500 mt-1">{{ t('settings.calibration.ipdDesc') }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{{ t('settings.calibration.screen') }}</label>
                <input type="number" v-model.number="screenDiagonal" min="10" max="100" step="0.1"
                  class="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
                <div class="text-xs text-slate-500 mt-1">{{ t('settings.calibration.screenDesc') }}</div>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
              <span>{{ t('settings.mode.speed') }}</span>
              <span>{{ speed.toFixed(1) }}x</span>
            </label>
            <input type="range" v-model.number="speed" min="0.1" max="1.0" step="0.05" class="w-full accent-primary" />
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">{{ t('settings.process.title') }}</h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{{ t('settings.process.cycles') }}</label>
            <input type="number" v-model.number="cycles" min="5" max="100" 
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{{ t('settings.process.rounds') }}</label>
            <input type="number" v-model.number="rounds" min="1" max="10" 
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{{ t('settings.process.restSec') }}</label>
            <input type="number" v-model.number="restSec" min="0" max="60" 
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{{ t('settings.process.minDistance') }}</label>
            <input type="number" v-model.number="minDistance" min="1" max="100" 
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{{ t('settings.process.maxDistance') }}</label>
            <input type="number" v-model.number="maxDistance" min="1" max="1000" 
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
          </div>
        </div>
      </section>



      <div class="pt-4 flex gap-4">
        <button @click="save" class="flex-1 bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded-lg transition-colors">
          {{ t('settings.save') }}
        </button>
        <button @click="reset" class="px-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-medium py-2 rounded-lg transition-colors">
          {{ t('settings.reset') }}
        </button>
      </div>

    </div>
  </div>
</template>
