import { ComponentProps, ComponentType, forwardRef } from 'react'

export const IconInput = forwardRef<
  HTMLInputElement,
  {
    icon: ComponentType<ComponentProps<'svg'>>
    label: string
  } & ComponentProps<'input'>
>(function IconInput({ icon: Icon, label, ...rest }, ref) {
  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          {...rest}
          ref={ref}
          type="text"
          name="account-number"
          id="account-number"
          className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Icon className="h-5 w-5 mr-2" aria-hidden="true" />
          {label}
        </div>
      </div>
    </div>
  )
})
