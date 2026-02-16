// ============================================
// LANGUAGE SWITCHER COMPONENT
// Handles bilingual content switching
// ============================================

class LanguageSwitcher {
  constructor() {
    this.currentLang = this.getStoredLanguage() || this.detectBrowserLanguage();
    this.content = null;
    this.init();
  }

  // Get language from localStorage
  getStoredLanguage() {
    return localStorage.getItem('preferred-language');
  }

  // Detect browser language
  detectBrowserLanguage() {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('es') ? 'es' : 'en';
  }

  // Initialize language switcher
  async init() {
    await this.loadContent();
    this.createSwitcher();
    this.applyLanguage(this.currentLang);
    this.attachEventListeners();
  }

  // Load content JSON
  async loadContent() {
    try {
      const response = await fetch('/src/data/content.json');
      this.content = await response.json();
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  }

  // Create language switcher UI
  createSwitcher() {
    const switcher = document.querySelector('.lang-switcher');
    if (!switcher) return;

    switcher.innerHTML = `
      <button class="lang-switcher__btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
      <button class="lang-switcher__btn ${this.currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
    `;
  }

  // Attach event listeners
  attachEventListeners() {
    const buttons = document.querySelectorAll('.lang-switcher__btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        this.switchLanguage(lang);
      });
    });
  }

  // Switch language
  switchLanguage(lang) {
    if (lang === this.currentLang) return;
    
    this.currentLang = lang;
    localStorage.setItem('preferred-language', lang);
    this.applyLanguage(lang);
    
    // Update active state
    document.querySelectorAll('.lang-switcher__btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // Apply language to all elements with data-i18n
  applyLanguage(lang) {
    if (!this.content) return;

    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      const translation = this.getTranslation(key, lang);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.innerHTML = translation;
        }
      }
    });

    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  // Get translation by key path (e.g., "nav.home")
  getTranslation(key, lang) {
    const keys = key.split('.');
    let value = this.content[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return null;
      }
    }
    
    return value;
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLang;
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
  });
} else {
  window.languageSwitcher = new LanguageSwitcher();
}
