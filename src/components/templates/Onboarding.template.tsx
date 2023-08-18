import { FC } from 'react'

type Props = {
  header: JSX.Element
  footer: JSX.Element
  main: JSX.Element
}
export const TemplateOnboarding: FC<Props> = ({
  header,
  footer,
  main,
}: {
  header: JSX.Element
  footer: JSX.Element
  main: JSX.Element
}) => {
  return (
    <main>
      <header className="bg-golemblue">{header}</header>
      <section>{main}</section>
      <footer>{footer}</footer>
    </main>
  )
}
