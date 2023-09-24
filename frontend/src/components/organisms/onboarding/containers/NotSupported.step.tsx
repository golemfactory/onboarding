export const NotSupported = ({ goToNextStep }: { goToNextStep: MouseEventHandler }) => {
  return <NotSupportedPresentational onConfirm={goToNextStep} />
}
