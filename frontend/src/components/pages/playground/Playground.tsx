import { Button } from 'components/atoms'
import { AnimatedText } from 'components/molecules/animateText/AnimatedText'
import { useState } from 'react'

export const Playground = () => {
  const [key, setKey] = useState('title')
  const [visibility, setVisibility] = useState<'visible' | 'hidden'>('visible')
  return (
    <>
      <div className="text-primary text-h2">
        <AnimatedText i18nKey={key} ns="landing" visibility={visibility} />
      </div>

      <Button
        buttonStyle="solid"
        className="w-40 py-4 px-9 text-button-large"
        onClick={() => {
          setVisibility('hidden')
        }}
      >
        Hide
      </Button>

      <Button
        buttonStyle="solid"
        className="w-40 py-4 px-9 text-button-large"
        onClick={() => {
          setVisibility('visible')
        }}
      >
        Show
      </Button>

      <Button
        buttonStyle="solid"
        className="w-40 py-4 px-9 text-button-large"
        onClick={() => {
          setVisibility('hidden')
          setTimeout(() => {
            key === 'title' ? setKey('subtitle') : setKey('title')
            setVisibility('visible')
          }, 1000)
        }}
      >
        Title
      </Button>
    </>
  )
}
