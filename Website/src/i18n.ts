import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './assets/i18n/en/translation.json';
import gjTranslation from './assets/i18n/gj/translation.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: { translation: enTranslation },
      gj: { translation: gjTranslation },
    },
  });
