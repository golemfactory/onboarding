import { FC } from 'react'
import { LayoutPropsType } from 'types/ui'

export const LayoutTemplate: FC<LayoutPropsType> = ({
  header,
  footer,
  main,
}: LayoutPropsType) => {
  return (
    <main>
      <header className="bg-blue-500">{header}</header>
      <section>{main}</section>
      <footer>{footer}</footer>
    </main>
  )
}
