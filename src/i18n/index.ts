import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh-CN';
import zhTW from './locales/zh-TW';
import enUS from './locales/en-US';
import jaJP from './locales/ja-JP';
import koKR from './locales/ko-KR';
import esES from './locales/es-ES';
import frFR from './locales/fr-FR';
import deDE from './locales/de-DE';

// Try to get saved language from localStorage, otherwise fallback to browser language
const getBrowserLang = () => {
  const lang = navigator.language.toLowerCase();
  if (lang === 'zh-tw' || lang === 'zh-hk') return 'zh-TW';
  if (lang.includes('zh')) return 'zh-CN';
  if (lang.includes('ja')) return 'ja-JP';
  if (lang.includes('ko')) return 'ko-KR';
  if (lang.includes('es')) return 'es-ES';
  if (lang.includes('fr')) return 'fr-FR';
  if (lang.includes('de')) return 'de-DE';
  return 'en-US';
};

const savedLang = localStorage.getItem('focusfar_lang') || getBrowserLang();

export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: savedLang,
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
    'ja-JP': jaJP,
    'ko-KR': koKR,
    'es-ES': esES,
    'fr-FR': frFR,
    'de-DE': deDE
  }
});

export const setLanguage = (lang: string) => {
  i18n.global.locale.value = lang as any;
  localStorage.setItem('focusfar_lang', lang);
};
