import { useEffect } from 'react'
export const useUpdateQueryStringValueWithoutReload = function (
  queryKey: string,
  queryValue: string
) {
  useEffect(() => {
    let reload = false
    let currentSearchParams = new URLSearchParams(
      window.location.hash.split('#/')[1]
    )

    if (currentSearchParams.size === 0) {
      currentSearchParams = new URLSearchParams(window.location.search)
      reload = true
    }
    const oldQuery = currentSearchParams.get(queryKey) ?? ''
    if (queryValue === oldQuery) return

    if (queryValue) {
      currentSearchParams.set(queryKey, queryValue)
    } else {
      currentSearchParams.delete(queryKey)
    }
    const newUrl = [
      window.location.pathname + '#/',
      ,
      currentSearchParams.toString(),
    ]
      .filter(Boolean)
      .join('?')

    window.history.replaceState(null, '', newUrl)
    if (reload) {
      window.location.reload()
    }
  }, [queryKey, queryValue])
}
