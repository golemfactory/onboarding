import { useLayoutEffect, useState } from 'react'

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  useLayoutEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1920
      setIsDesktop(isDesktop)
      document.body.classList.toggle('is-desktop', isDesktop)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isDesktop
}
