<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLanguage } from './i18n'
import { useSettingsStore } from './features/settings/settingsStore'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'

const { t, locale } = useI18n()
const settingsStore = useSettingsStore()
const { stereoMode, renderEngine } = storeToRefs(settingsStore)

watchEffect(() => {
  document.title = t('app.title')
})

const setViewMode = (mode: 'cross' | 'parallel') => {
  stereoMode.value = mode
  settingsStore.saveSettings()
}

const setRenderEngine = (engine: '2d' | '3d') => {
  renderEngine.value = engine
  settingsStore.saveSettings()
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/50 border-b border-slate-200/50 dark:border-white/10 transition-colors">
      <div class="max-w-6xl mx-auto px-3 sm:px-4 py-2 min-h-[3.5rem] flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        <RouterLink to="/" class="text-lg sm:text-xl font-bold text-primary flex items-center gap-2">
          {{ t('app.title') }}
        </RouterLink>
        <div class="flex flex-wrap items-center gap-2 sm:gap-4">
          <!-- Render Engine Toggle -->
          <div class="flex bg-slate-100 dark:bg-slate-700 p-0.5 rounded-lg border border-slate-200 dark:border-slate-600">
            <button 
              @click="setRenderEngine('2d')" 
              :class="['text-xs font-medium px-2 py-1 rounded-md transition-colors', renderEngine === '2d' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300']"
            >
              2D
            </button>
            <button 
              @click="setRenderEngine('3d')" 
              :class="['text-xs font-medium px-2 py-1 rounded-md transition-colors', renderEngine === '3d' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300']"
            >
              3D
            </button>
          </div>
          
          <!-- Stereo Mode Toggle -->
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

    <main class="flex-1 max-w-6xl w-full mx-auto p-2 sm:p-4 flex flex-col">
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
