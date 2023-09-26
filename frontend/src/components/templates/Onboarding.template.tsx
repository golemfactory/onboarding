import { FC, ReactNode } from 'react'

type Props = {
  header: ReactNode
  footer: ReactNode
  main: ReactNode
}

export const TemplateOnboarding: FC<Props> = ({
  header,
  footer,
  main,
}: Props) => {
  return (
    <main>
      <header className="bg-blue-500">{header}</header>
      <section>{main}</section>
      <footer>{footer}</footer>
    </main>
  )
}
