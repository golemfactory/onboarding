import { match } from 'ts-pattern'
import { Trans } from 'components/atoms'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { LeftDotsOrnament } from 'components/atoms/ornaments/leftDots'

export const ProgressStage = ({
  isCompleted,
  isCurrent,
  stage,
  index,
}: {
  isCompleted: boolean
  isCurrent: boolean
  stage: string
  index: number
}) => {
  return (
    <div>
      {match([isCompleted, isCurrent])
        .with([true, false], () => {
          return (
            <div className="grid grid-cols-5">
              <div className="col-span-1 justify-center flex">
                <CheckCircleIcon className=" h-10 text-success-100" />
              </div>
              <div className="text-h4 text-primary col-span-4 pt-1">
                <Trans i18nKey={`${stage}.title`} ns="progress" />
              </div>
            </div>
          )
        })
        .with([false, true], () => {
          return (
            <div className="grid grid-cols-5 gap-0">
              <div className="col-span-1 flex flex-col items-center">
                <div className="w-8 h-8 text-h4 pt-0.5 flex justify-center text-center rounded-full text-white bg-primary">
                  {index}
                </div>

                <LeftDotsOrnament fill="fill-primary" />
              </div>

              <div className="col-span-4 flex flex-col gap-3">
                <div className="text-h4 text-primary">
                  <Trans i18nKey={`${stage}.title`} ns="progress" />
                </div>
                <div className="text-body-normal text-primary">
                  <Trans i18nKey={`${stage}.description`} ns="progress" />
                </div>
              </div>
            </div>
          )
        })
        .with([false, false], () => {
          return (
            <div className="grid grid-cols-5 gap-0 text-neutral-grey-200">
              <div className="col-span-1 flex flex-col items-center">
                <div className="w-8 h-8 text-h4 pt-0.5 flex justify-center text-center rounded-full border-1">
                  {index}
                </div>
              </div>

              <div className="col-span-4 flex flex-col gap-3">
                <div className="text-h4">
                  <Trans i18nKey={`${stage}.title`} ns="progress" />
                </div>
                <div className="text-body-normal ">
                  <Trans i18nKey={`${stage}.description`} ns="progress" />
                </div>
              </div>
            </div>
          )
        })
        .otherwise(() => 'Error')}
    </div>
  )
}
