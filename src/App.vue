<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLanguage } from './i18n'
import { useSettingsStore } from './features/settings/settingsStore'
import { storeToRefs } from 'pinia'

const { t, locale } = useI18n()
const settingsStore = useSettingsStore()
const { stereoMode } = storeToRefs(settingsStore)



const setViewMode = (mode: 'cross' | 'parallel') => {
  stereoMode.value = mode
  settingsStore.saveSettings()
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/50 border-b border-slate-200/50 dark:border-white/10 transition-colors">
      <div class="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <RouterLink to="/" class="text-xl font-bold text-primary flex items-center gap-2">
          {{ t('app.title') }}
        </RouterLink>
        <div class="flex items-center gap-4">
          <div class="flex bg-slate-100 dark:bg-slate-700 p-0.5 rounded-lg border border-slate-200 dark:border-slate-600">
            <button 
              @click="setViewMode('parallel')" 
              :class="['text-xs font-medium px-2 py-1 rounded-md transition-colors', stereoMode === 'parallel' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300']"
            >
              {{ t('app.viewMode.parallel') }}
            </button>
            <button 
              @click="setViewMode('cross')" 
              :class="['text-xs font-medium px-2 py-1 rounded-md transition-colors', stereoMode === 'cross' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300']"
            >
              {{ t('app.viewMode.cross') }}
            </button>
          </div>
          <select 
            v-model="locale" 
            @change="setLanguage(($event.target as HTMLSelectElement).value)" 
            class="text-xs font-medium bg-transparent text-slate-500 hover:text-primary transition-colors cursor-pointer outline-none appearance-none pr-1"
          >
            <option value="zh-CN">简体中文</option>
            <option value="zh-TW">繁體中文</option>
            <option value="en-US">English</option>
            <option value="ja-JP">日本語</option>
            <option value="ko-KR">한국어</option>
            <option value="es-ES">Español</option>
            <option value="fr-FR">Français</option>
            <option value="de-DE">Deutsch</option>
          </select>
          <nav class="flex gap-3 text-sm font-medium ml-2">
            <RouterLink to="/history" class="hover:text-primary transition-colors">{{ t('app.nav.history') }}</RouterLink>
            <RouterLink to="/settings" class="hover:text-primary transition-colors">{{ t('app.nav.settings') }}</RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col">
      <RouterView />
    </main>

    <footer class="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
      <RouterLink to="/safety" class="hover:text-primary transition-colors mb-2 inline-block">{{ t('app.footer.safety') }}</RouterLink>
      <p>{{ t('app.footer.copyright') }}</p>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  color: var(--color-primary);
}
</style>
