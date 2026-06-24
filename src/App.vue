<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10">
      <div class="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <RouterLink to="/" class="text-xl font-bold text-primary flex items-center gap-2">
          FocusFar
        </RouterLink>
        <nav class="flex gap-4 text-sm font-medium">
          <RouterLink to="/history" class="hover:text-primary transition-colors">记录</RouterLink>
          <RouterLink to="/settings" class="hover:text-primary transition-colors">设置</RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col">
      <RouterView />
    </main>

    <footer class="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
      <RouterLink to="/safety" class="hover:text-primary transition-colors mb-2 inline-block">安全说明与免责声明</RouterLink>
      <p>© 2026 FocusFar Project. 不用于医疗用途。</p>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  color: var(--color-primary);
}
</style>
