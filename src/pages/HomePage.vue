<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { statsService } from '../features/stats/statsService';
import { Icon } from '@iconify/vue';

const router = useRouter();
const { t } = useI18n();
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
        {{ t('app.title') }}
      </h1>
      <p class="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto">
        {{ t('app.description') }}
      </p>
    </div>

    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-white/5 transition-all hover:shadow-2xl w-full max-w-sm text-center">
      <div class="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">{{ t('home.todayCompleted') }}</div>
      <div class="text-6xl font-black text-slate-800 dark:text-white mt-2 tracking-tight">
        {{ todayCompleted }} <span class="text-lg font-medium text-slate-400">{{ t('home.times') }}</span>
      </div>

      <button @click="startTraining" 
        class="mt-8 group relative overflow-hidden bg-primary hover:bg-primary-hover text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg">
        <span class="relative z-10 flex items-center gap-2">
          <Icon icon="mdi:play-circle" class="w-6 h-6" />
          {{ t('home.startTraining') }}
        </span>
      </button>
      
      <div class="mt-4 text-xs text-slate-400">
        {{ t('home.defaultFlow') }}
      </div>
    </div>
  </div>
</template>
