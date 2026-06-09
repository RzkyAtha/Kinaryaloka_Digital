import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type Language = 'id' | 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isTranslating: boolean
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const LANG_MAP: Record<Language, string> = { id: '', en: 'en', zh: 'zh-CN' }

function getCombo(): HTMLSelectElement | null {
  return document.querySelector('.goog-te-combo') as HTMLSelectElement | null
}

function clearGoogTransCookie() {
  const host = window.location.hostname                       // e.g. www.kinaryaloka.com
  const bare = host.replace(/^www\./, '')                     // e.g. kinaryaloka.com
  const domains = ['', host, '.' + host, bare, '.' + bare]
  const paths = ['/', '']
  for (const domain of domains) {
    for (const path of paths) {
      const d = domain ? `; domain=${domain}` : ''
      const p = path ? `; path=${path}` : ''
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC${p}${d}`
    }
  }
}

function doTranslate(lang: Language): boolean {
  if (lang === 'id') {
    // Restore original: clear cookie and reload
    clearGoogTransCookie()
    // Try using Google Translate's restore mechanism
    const frame = document.querySelector('.goog-te-banner-frame') as HTMLIFrameElement | null
    if (frame?.contentDocument) {
      const btn = frame.contentDocument.querySelector('.goog-close-link') as HTMLElement | null
      if (btn) { btn.click(); return true }
    }
    // Fallback: set combo to empty and trigger
    const combo = getCombo()
    if (combo) {
      combo.value = ''
      combo.dispatchEvent(new Event('change'))
      // If still translated after a moment, force reload
      setTimeout(() => {
        const html = document.documentElement
        if (html.classList.contains('translated-ltr') || html.classList.contains('translated-rtl')) {
          window.location.reload()
        }
      }, 500)
      return true
    }
    // Last resort: reload
    window.location.reload()
    return true
  }

  const combo = getCombo()
  if (!combo) return false
  const target = LANG_MAP[lang]
  combo.value = target
  combo.dispatchEvent(new Event('change'))
  return true
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id')
  const [isTranslating, setIsTranslating] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)

  // Load Google Translate script & init
  useEffect(() => {
    ;(window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'id', autoDisplay: false, includedLanguages: 'en,zh-CN,id' },
        'google_translate_element'
      )
    }

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.body.appendChild(script)
    }

    // Poll for widget readiness
    const interval = setInterval(() => {
      if (getCombo()) {
        setWidgetReady(true)
        clearInterval(interval)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  // Once widget is ready, apply saved language
  useEffect(() => {
    if (!widgetReady) return
    const saved = localStorage.getItem('kinaryaloka_lang') as Language | null
    if (saved && saved !== 'id') {
      setLanguageState(saved)
      // Small delay to let widget fully init
      setTimeout(() => doTranslate(saved), 200)
    }
  }, [widgetReady])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('kinaryaloka_lang', lang)

    if (lang === 'id') {
      // For restoring to Indonesian:
      // 1. Clear all possible googtrans cookies
      clearGoogTransCookie()
      localStorage.setItem('kinaryaloka_lang', 'id')

      // 2. Try Google Translate's own restore mechanism first
      const combo = getCombo()
      if (combo) {
        combo.value = ''
        combo.dispatchEvent(new Event('change'))
      }

      // 3. Force a clean navigation (not reload) to bypass cached GT state
      const url = new URL(window.location.href)
      url.searchParams.set('_lang', Date.now().toString())
      window.location.href = url.toString()
      return
    }

    setIsTranslating(true)

    // Retry mechanism — poll until translation takes effect
    let attempts = 0
    const maxAttempts = 15
    const tryTranslate = () => {
      attempts++
      const success = doTranslate(lang)
      if (!success && attempts < maxAttempts) {
        setTimeout(tryTranslate, 300)
      } else {
        // Give translation a moment to render
        setTimeout(() => setIsTranslating(false), 600)
      }
    }
    tryTranslate()
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isTranslating }}>
      <div id="google_translate_element" style={{ position: 'fixed', top: '-9999px', left: '-9999px', opacity: 0, pointerEvents: 'none' }} />
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
