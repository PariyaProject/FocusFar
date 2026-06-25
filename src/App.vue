<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { setLanguage } from './i18n'
import { useSettingsStore } from './features/settings/settingsStore'
import { storeToRefs } from 'pinia'
import { watchEffect, ref } from 'vue'
import { Icon } from '@iconify/vue'

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

const isMenuOpen = ref(false)
const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }
const closeMenu = () => { isMenuOpen.value = false }

const localeNames: Record<string, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en-US': 'English',
  'ja-JP': '日本語',
  'ko-KR': '한국어',
  'es-ES': 'Español',
  'fr-FR': 'Français',
  'de-DE': 'Deutsch'
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
          <!-- Dropdown Menu -->
          <div class="relative ml-1 sm:ml-2">
            <button @click="toggleMenu" class="p-2 text-slate-500 hover:text-primary transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <Icon icon="mdi:dots-vertical" class="w-6 h-6" />
            </button>
            
            <div v-if="isMenuOpen" @click="closeMenu" class="fixed inset-0 z-40"></div>
            
            <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 flex flex-col py-1">
              <div class="relative px-4 py-3 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                <Icon icon="mdi:translate" class="w-5 h-5 text-slate-400 shrink-0 pointer-events-none" />
                <div class="w-full text-sm font-medium text-slate-600 dark:text-slate-300 pointer-events-none">
                  {{ localeNames[locale] || 'Language' }}
                </div>
                <Icon icon="mdi:chevron-down" class="w-4 h-4 text-slate-400 shrink-0 pointer-events-none" />
                
                <select 
                  v-model="locale" 
                  @change="setLanguage(($event.target as HTMLSelectElement).value); closeMenu()" 
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
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
              </div>
              <RouterLink @click="closeMenu" to="/history" class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors flex items-center gap-3">
                <Icon icon="mdi:history" class="w-5 h-5 text-slate-400" />
                {{ t('app.nav.history') }}
              </RouterLink>
              <RouterLink @click="closeMenu" to="/settings" class="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors flex items-center gap-3">
                <Icon icon="mdi:cog" class="w-5 h-5 text-slate-400" />
                {{ t('app.nav.settings') }}
              </RouterLink>
            </div>
          </div>
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
