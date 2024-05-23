import sectionStyle from './Run.section.module.css'

import { AnimatedSection } from './AnimatedSection'

import { Card, CardDataType } from 'components/molecules/useCaseCard/Card'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

export const CommandLine = (command: string, idx: number) => {
  //Match <color='red'> </color> tags
  const regex = /<color='(.*?)'>(.*?)<\/color>/g
  let match
  const elements = []
  let lastIndex = 0

  while ((match = regex.exec(command)) !== null) {
    if (lastIndex < match.index) {
      //Add text before match as a span
      elements.push(
        <span key={lastIndex}>{command.slice(lastIndex, match.index)}</span>
      )
    }
    //Add match as a span with color
    elements.push(
      <span key={match.index} style={{ color: match[1] }}>
        {match[2]}
      </span>
    )

    lastIndex = regex.lastIndex
  }

  //add remaining text as a span if any
  if (lastIndex < command.length) {
    elements.push(<span key={lastIndex}>{command.slice(lastIndex)}</span>)
  }

  return <div key={idx}>{elements}</div>
}

const CommandBox = ({ command }: { command: string }) => {
  return (
    <div className={sectionStyle.commandBox}>
      {command.split('\n').map(CommandLine)}
    </div>
  )
}

const underlyingCardData: CardDataType = {
  title: 'runCardTitle',
  description: `runCardDescription`,
  icon: ChevronDoubleRightIcon,
  exploreLink: 'https://github.com/golemfactory/golem-kernel-python',
  namespace: 'landing',
  appearance: 'landing',
}

const Progress = [
  () => {
    return (
      <div key="progress_step_image" className={sectionStyle.progressBox}>
        <span className="mt-2">Progress: 1/4</span>
        <span className="ml-2">
          Resolving image tag:{' '}
          <span style={{ color: '#F472B6' }}>
            jupyter-on-golem/python-kernel:latest…
          </span>{' '}
          Ok.
        </span>
      </div>
    )
  },
  () => {
    return (
      <div key="progress_step_demand" className={sectionStyle.progressBox}>
        <span className="mt-2">Progress: 2/4</span>
        <span className="ml-2">
          Demand created. Waiting for counter proposal.
        </span>
        <span className="ml-2">Searching for just any machine… </span>
        <span className="ml-2">
          Will try to connect for <span className="font-bold">10 minutes.</span>{' '}
        </span>
      </div>
    )
  },
  () => {
    return (
      <div key="progress_step_params" className={sectionStyle.progressBox}>
        <span className="mt-2">Progress: 3/4</span>
        <span className="ml-2">Agreement created.</span>
        <span className="ml-2">
          Connected to{' '}
          <span className="font-bold">
            provider_1.h [0x0000000000000000000000000000000000000000]
          </span>
        </span>
        <span className="ml-2">
          RAM: <span className="font-bold"> 8.0 GB</span>{' '}
        </span>
        <span className="ml-2">
          DISK: <span className="font-bold"> 20.0 GB</span>{' '}
        </span>
        <span className="ml-2">
          CPU: <span className="font-bold"> 8 cores</span>{' '}
        </span>
      </div>
    )
  },
  () => {
    return (
      <div key="progress_step_starting" className={sectionStyle.progressBox}>
        <span className="mt-2">Progress: 4/4</span>
        <span className="ml-2 mb-1">
          Engine is starting. Depending on provider, it might take few to
        </span>
        <span className="ml-2 mb-1 font-bold">~10 minutes…</span>
      </div>
    )
  },
  () => {
    return (
      <div
        key="progress_step_ready"
        className={`${sectionStyle.progressBox} mt-2s`}
      >
        <span>Ready</span>
      </div>
    )
  },
]
export const RunSection = () => {
  return (
    <AnimatedSection>
      <div className={sectionStyle.container}>
        <Card
          {...underlyingCardData}
          style={{
            cardLanding: sectionStyle.cardUnderlying,
            descriptionLanding: sectionStyle.description,
            iconLanding: 'h-9 text-primary',
          }}
        />
        {/* <div
          className={`${sectionStyle.overlayContainer} ${sectionStyle.card}`}
        >
          <CommandBox command="%connect mem>8 disk >20 cores>4" />
          {Progress.map((x) => x())}
          <div className="mt-2" />
          <CommandBox command="%pip install colorama" />
          <div className="mt-2" />
          <CommandBox
            command={
              "from colsorama <color='#5BC281'>import </color>Fore \n print(Fore.BLUE + <color='#F472B6'>‘Jupyter on Golem is great!’</color>)"
            }
          />

          <div className={sectionStyle.greatJupyter}>
            Jupyter on Golem is great!
          </div>
        </div> */}
      </div>
    </AnimatedSection>
  )
}
