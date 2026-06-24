<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t, tm } = useI18n();

const generalItems = computed(() => tm('safety.sections.general.items') as string[]);
const usageItems = computed(() => tm('safety.sections.usage.items') as string[]);
const disclaimerItems = computed(() => tm('safety.sections.disclaimer.items') as string[]);
</script>

<template>
  <div class="pb-4">
    <h1 class="text-2xl font-bold mb-4 flex items-center gap-2">
      <Icon icon="mdi:shield-alert-outline" class="w-6 h-6 text-amber-500" />
      {{ t('safety.title') }}
    </h1>

    <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 border border-white/50 dark:border-white/10 space-y-4 text-slate-700 dark:text-slate-300 transition-all">
      
      <section>
        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
          <Icon icon="mdi:information-outline" class="text-primary" />
          {{ t('safety.sections.general.title') }}
        </h2>
        <ul class="list-disc pl-5 space-y-1.5 leading-relaxed">
          <li v-for="(item, index) in generalItems" :key="index">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
          <Icon icon="mdi:alert-circle-outline" class="text-amber-500" />
          {{ t('safety.sections.usage.title') }}
        </h2>
        <ul class="list-disc pl-5 space-y-1.5 leading-relaxed">
          <li v-for="(item, index) in usageItems" :key="index">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
          <Icon icon="mdi:eye-check-outline" class="text-primary" />
          {{ t('safety.sections.disclaimer.title') }}
        </h2>
        <ul class="list-disc pl-5 space-y-1.5 leading-relaxed">
          <li v-for="(item, index) in disclaimerItems" :key="index">
            {{ item }}
          </li>
        </ul>
      </section>

    </div>
  </div>
</template>
