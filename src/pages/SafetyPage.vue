<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="py-8">
    <h1 class="text-2xl font-bold mb-6 flex items-center gap-2">
      <Icon icon="mdi:shield-alert-outline" class="w-6 h-6 text-amber-500" />
      安全说明与免责声明
    </h1>

    <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-6 text-slate-700 dark:text-slate-300">
      
      <section>
        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
          <Icon icon="mdi:information-outline" class="text-primary" />
          项目定位
        </h2>
        <p class="leading-relaxed">
          远眺计划 (FocusFar) 是一个旨在帮助长时间使用屏幕的用户定时休息、进行轻量化远近切换的辅助网页工具。
          本工具<strong>不是医疗产品</strong>，不具有诊断、治疗、矫正近视或恢复视力的功能。
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
          <Icon icon="mdi:alert-circle-outline" class="text-amber-500" />
          使用注意事项
        </h2>
        <ul class="list-disc pl-5 space-y-2 leading-relaxed">
          <li>在使用过程中，如出现眼痛、头晕、恶心、复视或任何明显不适，请<strong>立即停止使用</strong>并闭眼休息。</li>
          <li>儿童、斜视、弱视、患有眼部疾病或处于眼科术后恢复期的用户，在使用本工具前应先咨询专业眼科医生。</li>
          <li>请保持使用环境的光线适中，避免在过暗或过亮的环境下长时间注视屏幕。</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
          <Icon icon="mdi:eye-check-outline" class="text-primary" />
          科学护眼建议
        </h2>
        <p class="leading-relaxed">
          缓解数字视疲劳最有效的方法是遵循 <strong>20-20-20 法则</strong>：每使用屏幕 20 分钟，将视线转移到至少 20 英尺（约 6 米）外的物体上，保持至少 20 秒。定期进行专业的眼科检查也是保护视力的关键。
        </p>
      </section>

    </div>
  </div>
</template>
