import { HeaderOnboarding } from 'components/organisms/HeaderOnboarding'
import { TemplateOnboarding } from 'components/templates/Onboarding.template'

export const PageOnboarding = () => {
  const MainOnboarding = () => {
    return <h1>Main</h1>
  }
  const FooterOnboarding = () => {
    return <h1>Footer</h1>
  }

  return (
    <TemplateOnboarding
      header={<HeaderOnboarding />}
      main={<MainOnboarding />}
      footer={<FooterOnboarding />}
    />
  )
}
