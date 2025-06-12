document.addEventListener('DOMContentLoaded', function() {
  const languageToggle = document.getElementById('language-toggle');
  const languageDropdown = document.querySelector('.language-dropdown');
  const languageOptions = document.querySelectorAll('.language-option');
  const currentLanguageEl = document.querySelector('.current-language');
  
  // Set up translations
  const translations = {};
  
  // Function to load translations
  const loadTranslations = async (lang) => {
    if (!translations[lang]) {
      try {
        const response = await fetch(`${siteBaseUrl}/assets/js/i18n/${lang}.json`);
        translations[lang] = await response.json();
      } catch (error) {
        console.error(`Could not load translations for ${lang}:`, error);
        return false;
      }
    }
    return true;
  };
  
  // Function to apply translations
  const applyTranslations = (lang) => {
    if (!translations[lang]) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const keyParts = key.split('.');
      
      let translation = translations[lang];
      for (const part of keyParts) {
        if (translation && translation[part]) {
          translation = translation[part];
        } else {
          translation = null;
          break;
        }
      }
      
      if (translation) {
        el.textContent = translation;
      }
    });
  };
  
  // Function to change the language
  const changeLanguage = async (lang) => {
    // Load translations
    const success = await loadTranslations(lang);
    if (!success) return;
    
    // Update the current language display
    currentLanguageEl.textContent = lang.toUpperCase();
    
    // Update active class
    languageOptions.forEach(option => {
      if (option.getAttribute('data-lang') === lang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
    
    // Apply translations
    applyTranslations(lang);
    
    // Save language preference
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
    
    // Close dropdown
    languageDropdown.classList.remove('active');
  };
  
  // Initialize language
  const initLanguage = async () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    await changeLanguage(savedLanguage);
  };
  
  // Toggle dropdown
  languageToggle.addEventListener('click', function() {
    languageDropdown.classList.toggle('active');
  });
  
  // Language selection
  languageOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.language-switcher')) {
      languageDropdown.classList.remove('active');
    }
  });
  
  // Initialize
  initLanguage();
});
