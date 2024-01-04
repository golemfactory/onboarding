import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import landingEn from './en/landing.json'
import landingEs from './es/landing.json'

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      landing: landingEn,
    },
    es: {
      landing: landingEs,
    },
  },
})
