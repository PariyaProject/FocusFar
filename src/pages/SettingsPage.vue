<script setup lang="ts">
import { useSettingsStore } from '../features/settings/settingsStore';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue';

const settingsStore = useSettingsStore();
const { stereoMode, parallaxIntensity, speed, cycles, rounds, restSec } = storeToRefs(settingsStore);

const save = () => {
  settingsStore.saveSettings();
  alert('设置已保存');
};

const reset = () => {
  if (confirm('确定要恢复默认设置吗？')) {
    settingsStore.resetToDefault();
  }
};
</script>

<template>
  <div class="py-8">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <Icon icon="mdi:cog-outline" class="w-6 h-6 text-primary" />
      训练设置
    </h1>

    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
      
      <section>
        <h2 class="text-lg font-semibold mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">裸眼 3D 模式</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">对焦方式</label>
            <div class="flex gap-4">
              <label class="flex-1 cursor-pointer">
                <input type="radio" v-model="stereoMode" value="cross" class="peer sr-only" />
                <div class="p-3 text-center border rounded-lg peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                  <div class="font-bold">交叉眼 (Cross-view)</div>
                  <div class="text-xs text-slate-500 mt-1">视线在屏幕前相交，俗称斗鸡眼</div>
                </div>
              </label>
              <label class="flex-1 cursor-pointer">
                <input type="radio" v-model="stereoMode" value="parallel" class="peer sr-only" />
                <div class="p-3 text-center border rounded-lg peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary transition-all">
                  <div class="font-bold">平行眼 (Parallel-view)</div>
                  <div class="text-xs text-slate-500 mt-1">视线在屏幕后相交，发呆看远方</div>
                </div>
              </label>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
              <span>调节强度 (视差拉扯幅度)</span>
              <span>{{ (parallaxIntensity * 100).toFixed(0) }}%</span>
            </label>
            <input type="range" v-model.number="parallaxIntensity" min="0.1" max="1.0" step="0.1" class="w-full accent-primary" />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
              <span>动画速度</span>
              <span>{{ speed.toFixed(1) }}x</span>
            </label>
            <input type="range" v-model.number="speed" min="0.1" max="1.0" step="0.05" class="w-full accent-primary" />
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">流程参数</h2>
        
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">单轮拉伸 (次)</label>
            <input type="number" v-model.number="cycles" min="5" max="100" 
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">循环轮数</label>
            <input type="number" v-model.number="rounds" min="1" max="10" 
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">闭眼休息 (秒)</label>
            <input type="number" v-model.number="restSec" min="0" max="60" 
              class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-primary" />
          </div>
        </div>
      </section>

      <!-- 操作按钮 -->
      <div class="pt-4 flex gap-4">
        <button @click="save" class="flex-1 bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded-lg transition-colors">
          保存设置
        </button>
        <button @click="reset" class="px-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-medium py-2 rounded-lg transition-colors">
          恢复默认
        </button>
      </div>

    </div>
  </div>
</template>

