import { useCallback, useEffect, useSyncExternalStore } from 'react'

const getLocalStorageItem = (key: string): null | string => {
  if (typeof window === 'undefined') return null

  return window.localStorage.getItem(key)
}

const dispatchStorageEvent = (key: string, newValue: string | null) => {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }))
}

const setLocalStorageItem = (key: string, value: unknown) => {
  const stringifiedValue = JSON.stringify(value)
  window.localStorage.setItem(key, stringifiedValue)
  dispatchStorageEvent(key, stringifiedValue)
}

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key)
  dispatchStorageEvent(key, null)
}

const useLocalStorageSubscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function useLocalStorage(key: string, initialValue: unknown) {
  const getSnapshot = () => getLocalStorageItem(key)

  const store = useSyncExternalStore<string | null>(
    useLocalStorageSubscribe,
    getSnapshot
  )

  const setState = useCallback(
    (v: unknown) => {
      try {
        const nextState =
          typeof v === 'function'
            ? v(store ? JSON.parse(store) : initialValue)
            : v

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key)
        } else {
          setLocalStorageItem(key, nextState)
        }
      } catch (e) {
        console.warn(e)
      }
    },
    [key, store, initialValue]
  )

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== 'undefined'
    ) {
      setLocalStorageItem(key, initialValue)
    }
  }, [key, initialValue])

  return [store ? JSON.parse(store) : initialValue, setState]
}
