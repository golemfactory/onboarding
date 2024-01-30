// import { useLayoutEffect, useState } from 'react'

export const useIsDesktop = () => {
  // REFACTOR : we decide not go with screen size approach
  // const [isDesktop, setIsDesktop] = useState(false)
  // useLayoutEffect(() => {
  //   const handleResize = () => {
  //     const isDesktop = window.innerWidth >= 1920
  //     setIsDesktop(isDesktop)
  //     document.body.classList.toggle('is-desktop', isDesktop)
  //   }

  //   window.addEventListener('resize', handleResize)
  //   handleResize()

  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])
  const mobileIndicators = [
    'Android',
    'webOS',
    'iPhone',
    'iPad',
    'iPod',
    'BlackBerry',
    'Windows Phone',
  ]

  return !mobileIndicators.some((m) => window.navigator.userAgent.includes(m))
}
