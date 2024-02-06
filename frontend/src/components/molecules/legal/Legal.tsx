import { Checkbox } from 'components/atoms/checkbox'
import { FC, useEffect, useState } from 'react'
import { Trans } from 'components/atoms'
import { motion } from 'framer-motion'

export const Legal: FC<{
  setIsCompleted: (isCompleted: boolean) => void
  shouldCheckLegal: boolean
}> = ({
  setIsCompleted,
  shouldCheckLegal,
}: {
  setIsCompleted: (isCompleted: boolean) => void
  shouldCheckLegal: boolean
}) => {
  const [showError, setShowError] = useState(false)

  const [checked, setIsChecked] = useState({
    thirdParty: false,
    termsAndConditions: false,
  })

  useEffect(() => {
    if (checked.termsAndConditions && checked.thirdParty) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
      if (shouldCheckLegal) {
        setShowError(true)
      }
    }
  }, [
    checked.termsAndConditions,
    checked.thirdParty,
    setIsCompleted,
    shouldCheckLegal,
  ])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
      }}
      className="col-span-12 flex flex-col gap-3 text-darkblue-700"
    >
      <Checkbox
        label={() => (
          <div className="text-body-extra-large">
            <Trans i18nKey="legal.thirdParty" ns="welcome.step" />
          </div>
        )}
        error={showError && !checked.thirdParty}
        onChange={(e) => {
          setIsChecked({
            ...checked,
            thirdParty: e.target.checked,
          })
        }}
      />
      <Checkbox
        label={() => (
          <div className="text-body-extra-large">
            <Trans i18nKey="legal.termsAndConditions" ns="welcome.step" />
          </div>
        )}
        error={showError && !checked.termsAndConditions}
        onChange={(e) => {
          setIsChecked({
            ...checked,
            termsAndConditions: e.target.checked,
          })
        }}
      />

      {showError ? (
        <div className="text-dangerred-200 text-button-large text-kanit">
          <Trans i18nKey="legal.error" ns="welcome.step" />
        </div>
      ) : (
        ''
      )}
    </motion.div>
  )
}
