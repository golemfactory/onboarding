import React, { useState, useLayoutEffect } from 'react'

//would be better to use sass so we can use variables
export const RightDot = ({ top }: { top: string }) => {
  const [rightValue, setRightValue] = useState('0px')

  const calculateRight = () => {
    const screenWidth = window.innerWidth
    if (screenWidth < 1600) {
      return '-205px'
    } else if (screenWidth >= 1600 && screenWidth < 1920) {
      return `${((-24 - -205) * (screenWidth - 1600)) / 320 - 205}px`
    } else {
      return '-24px'
    }
  }

  useLayoutEffect(() => {
    const updateRightValue = () => {
      setRightValue(calculateRight())
    }
    updateRightValue()
    window.addEventListener('resize', updateRightValue)
    return () => window.removeEventListener('resize', updateRightValue)
  }, [])

  return (
    <img
      src="rightDot.svg"
      alt="rightDot"
      className="absolute"
      style={{
        top: top || '750px',
        right: rightValue,
      }}
    />
  )
}
