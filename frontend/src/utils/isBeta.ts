export function isBeta() {
  console.log('isBeta', globalThis.APP_VERSION.includes('beta'))
  return globalThis.APP_VERSION.includes('beta')
}
