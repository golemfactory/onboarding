import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { ComponentProps, ComponentType, forwardRef } from 'react'

export const IconInput = forwardRef<
  HTMLInputElement,
  {
    icon:
      | ComponentType<ComponentProps<'svg'>>
      | ComponentType<ComponentProps<'img'>>
    label: string
    isError?: boolean
  } & ComponentProps<'input'>
>(function IconInput({ isError, icon: Icon, label, ...rest }, ref) {
  return (
    <div>
      <div
        className={`relative mt-2 rounded-md shadow-sm ${
          isError ? 'text-dangerred-200' : 'text-primary'
        }`}
      >
        <input
          {...rest}
          ref={ref}
          type="text"
          name="account-number"
          id="account-number"
          className={`pl-2 block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900  placeholder:text-gray-400 ${
            isError
              ? 'ring-2 ring-dangerred-200 text-dangerred-200 focus:ring-dangerred-200 text-dangerred-200'
              : 'ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-primary'
          }  sm:text-sm sm:leading-6`}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-body-normal">
          {isError ? (
            <ExclamationCircleIcon
              className="h-5 w-5 text-dangerred-200"
              aria-hidden="true"
            />
          ) : (
            <>
              <Icon className="h-5 w-5 mr-2" aria-hidden="true" />
              {label}
            </>
          )}
        </div>
      </div>
    </div>
  )
})
