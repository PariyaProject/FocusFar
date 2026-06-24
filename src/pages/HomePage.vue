<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { statsService } from '../features/stats/statsService';
import { Icon } from '@iconify/vue';

const router = useRouter();
const todayCompleted = ref(0);

onMounted(() => {
  todayCompleted.value = statsService.getTodayCompletedCount();
});

const startTraining = () => {
  router.push('/training');
};
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center py-12">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 flex items-center justify-center gap-3">
        <Icon icon="mdi:eye-outline" class="text-primary w-10 h-10" />
        远眺计划
      </h1>
      <p class="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto">
        一个帮助你定时远眺、放松眼睛、减少连续近距离用眼的网页工具。
      </p>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 w-full max-w-sm text-center">
      <div class="mb-8">
        <div class="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">今日完成训练</div>
        <div class="text-5xl font-black text-primary">
          {{ todayCompleted }} <span class="text-lg font-medium text-slate-400">次</span>
        </div>
      </div>

      <button 
        @click="startTraining"
        class="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-green-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        <Icon icon="mdi:play" class="w-6 h-6" />
        开始训练
      </button>
      
      <div class="mt-4 text-xs text-slate-400">
        默认流程: 准备 5s → (看近 5s → 看远 20s → 闭眼 10s) × 3
      </div>
    </div>
  </div>
</template>
