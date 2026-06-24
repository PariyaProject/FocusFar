import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/training',
    name: 'Training',
    component: () => import('../pages/TrainingPage.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../pages/HistoryPage.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/SettingsPage.vue')
  },
  {
    path: '/safety',
    name: 'Safety',
    component: () => import('../pages/SafetyPage.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
