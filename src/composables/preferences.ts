import { ref, watch } from 'vue'
import { en, zh, type MessageKey } from '../data/messages'

type Locale = 'zh' | 'en'
type Theme = 'light' | 'dark'
function saved(key: string) {
  try { return localStorage.getItem(key) } catch { return null }
}
function persist(key: string, value: string) {
  try { localStorage.setItem(key, value) } catch { /* Preferences still work with storage disabled. */ }
}
const locale = ref<Locale>(saved('oddletics-language') === 'en' ? 'en' : 'zh')
const theme = ref<Theme>(saved('oddletics-theme') === 'dark' || (!saved('oddletics-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light')
function t(key: MessageKey, values: Record<string, string | number> = {}) {
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), (locale.value === 'zh' ? zh : en)[key])
}
watch(locale, value => {
  persist('oddletics-language', value)
  document.documentElement.lang = value === 'zh' ? 'zh-CN' : 'en'
  document.title = t('pageTitle')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('pageDescription'))
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('pageTitle'))
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('pageDescription'))
}, { immediate: true })
watch(theme, value => {
  persist('oddletics-theme', value)
  document.documentElement.dataset.theme = value
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'light' ? '#ffd166' : '#22231e')
}, { immediate: true })
export function useSitePreferences() {
  return { locale, theme, t, toggleTheme: () => { theme.value = theme.value === 'light' ? 'dark' : 'light' } }
}
