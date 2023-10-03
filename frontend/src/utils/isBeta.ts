export function isBeta() {
  //Tempory because VITE ignore globals defined in vite.config.ts
  //in deployment environment related issue: #47

  return true
  // console.log('isBeta', globalThis.APP_VERSION.includes('beta'))
  // return globalThis.APP_VERSION.includes('beta')
}
