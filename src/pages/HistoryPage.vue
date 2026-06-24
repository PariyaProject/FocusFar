<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { statsService } from '../features/stats/statsService';
import type { TrainingRecord } from '../features/training/types';
import { Icon } from '@iconify/vue';

const { t, locale } = useI18n();
const records = ref<TrainingRecord[]>([]);

onMounted(() => {
  records.value = statsService.getRecords().reverse(); // Show newest first
});

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString(locale.value, { 
    month: 'short', day: 'numeric', 
    hour: '2-digit', minute: '2-digit' 
  });
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) {
    return locale.value === 'zh-CN' ? `${m}分${s}秒` : `${m}m${s}s`;
  }
  return locale.value === 'zh-CN' ? `${s}秒` : `${s}s`;
};
</script>

<template>
  <div class="py-8">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <Icon icon="mdi:history" class="w-6 h-6 text-primary" />
      {{ t('history.title') }}
    </h1>

    <div v-if="records.length === 0" class="text-center py-16 text-slate-400 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-3xl border border-white/50 dark:border-white/10">
      <Icon icon="mdi:calendar-blank" class="w-12 h-12 mx-auto mb-3 opacity-50" />
      <p>{{ t('history.empty') }}</p>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="record in records" 
        :key="record.id"
        class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 border border-white/50 dark:border-white/10 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div class="flex items-center gap-4">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center',
            record.completed ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700'
          ]">
            <Icon :icon="record.completed ? 'mdi:check-bold' : 'mdi:stop'" class="w-5 h-5" />
          </div>
          <div>
            <div class="font-medium text-slate-800 dark:text-slate-200">
              {{ record.mode === 'near_far_focus' ? (locale === 'zh-CN' ? '远近切换训练' : 'Near/Far Focus Training') : 'Training' }}
              <span v-if="!record.completed" class="text-xs font-normal text-slate-400 ml-2">
                {{ locale === 'zh-CN' ? '(已中断)' : '(Interrupted)' }}
              </span>
            </div>
            <div class="text-sm text-slate-500">{{ formatTime(record.startedAt) }}</div>
          </div>
        </div>
        
        <div class="flex gap-6 text-sm text-slate-600 dark:text-slate-300">
          <div class="text-center">
            <div class="text-xs text-slate-400 mb-1">{{ locale === 'zh-CN' ? '完成轮数' : 'Completed' }}</div>
            <div class="font-medium">{{ record.completedRounds }}</div>
          </div>
          <div class="text-center">
            <div class="text-xs text-slate-400 mb-1">{{ locale === 'zh-CN' ? '实际时长' : 'Duration' }}</div>
            <div class="font-medium">{{ formatDuration(record.actualDurationSec) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
