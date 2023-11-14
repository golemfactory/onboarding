export function extractBaseURL(url: string) {
  const urlObj = new URL(url)
  const baseURL = `${urlObj.protocol}//${urlObj.hostname}${
    urlObj.port ? `:${urlObj.port}` : ''
  }${urlObj.pathname}`
  return baseURL
}
