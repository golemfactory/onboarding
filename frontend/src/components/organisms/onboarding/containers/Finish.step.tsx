export const Finish = ({ goToNextStep }: { goToNextStep: MouseEventHandler }) => {
  return <FinishPresentational onConfirm={goToNextStep} />
}
