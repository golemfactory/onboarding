import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import landingEn from './en/landing.json'
import landingEs from './es/landing.json'
import welcomeEn from './en/welcome.step.json'
import connectWalletEn from './en/connectWallet.step.json'
import unsupportedEn from './en/unsupported.json'
import tooltipsEn from './en/tooltips.json'
import chooseNetworkEn from './en/chooseNetwork.step.json'
import onRampEn from './en/onRamp.step.json'

i18next.use(initReactI18next).init({
  lng: 'en',
  debug: false,
  resources: {
    en: {
      landing: landingEn,
      unsupported: unsupportedEn,
      'chooseNetwork.step': chooseNetworkEn,
      'welcome.step': welcomeEn,
      tooltips: tooltipsEn,
      'connect-wallet.step': connectWalletEn,
      'onRamp.step': onRampEn,
    },
    es: {
      landing: landingEs,
    },
  },
})
