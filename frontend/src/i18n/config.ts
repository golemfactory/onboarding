import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import landingEn from './en/landing.json'
import landingEs from './es/landing.json'
import welcomeEn from './en/welcome.step.json'
import connectWalletEn from './en/connectWallet.step.json'
import unsupportedEn from './en/unsupported.json'
import tooltipsEn from './en/tooltips.json'
i18next.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      landing: landingEn,
      unsupported: unsupportedEn,
      'welcome.step': welcomeEn,
      tooltips: tooltipsEn,
      'connect-wallet.step': connectWalletEn,
    },
    es: {
      landing: landingEs,
    },
  },
})
