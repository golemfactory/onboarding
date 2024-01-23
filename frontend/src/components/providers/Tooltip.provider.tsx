import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { StepType } from 'state/steps'

type TooltipContextData = {
  visible: boolean
  id: string
  show: () => void
  hide: () => void
  toggle: () => void
}

type TooltipType = { sections: string[] }

const tooltipsRegistry: Record<string, TooltipType> = {}

export const TooltipContext = createContext<{
  tooltips: TooltipContextData[]
  addTooltip: (id: string) => TooltipContextData
  removeTooltip: (id: string) => void
}>({
  tooltips: [],
  addTooltip: (id) => {
    return {
      id,
      visible: false,
      show: () => {
        return null
      },
      hide: () => {
        return null
      },
      toggle: () => {
        return null
      },
    }
  },
  removeTooltip: () => {
    return null
  },
})

export const TooltipProvider = ({ children }: PropsWithChildren) => {
  const [tooltips, setTooltips] = useState<Record<string, boolean>>({})

  const show = (id: string) => {
    setTooltips({ ...tooltips, ...{ [id]: true } })
  }

  const hide = (id: string) => {
    setTooltips({ ...tooltips, ...{ [id]: false } })
  }

  const toggle = (id: string) => {
    console.log('toggle', tooltips)
    setTooltips({ ...tooltips, ...{ [id]: !tooltips[id] } })
  }
  return (
    <TooltipContext.Provider
      value={{
        tooltips: Object.keys(tooltips).map((tooltipId) => {
          return {
            id: tooltipId,
            visible: tooltips[tooltipId],
            show: () => show(tooltipId),
            hide: () => hide(tooltipId),
            toggle: () => toggle(tooltipId),
          }
        }),
        addTooltip: (id: string) => {
          if (!tooltipsRegistry[id]) {
            //throw new Error(`tooltip:tooltipNotRegistered ${id}`)
          }
          const existingTooltip = tooltips[id]

          if (existingTooltip === undefined) {
            setTooltips({ ...tooltips, ...{ [id]: false } })
          }
          return {
            id,
            visible: existingTooltip ?? false,
            show: () => show(id),
            hide: () => hide(id),
            toggle: () => toggle(id),
          }
        },
        removeTooltip: (id: string) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: removed, ...rest } = tooltips
          setTooltips(rest)
        },
      }}
    >
      {children}
    </TooltipContext.Provider>
  )
}

TooltipProvider.registerTooltip = ({
  id,
  tooltip,
}: {
  id: StepType
  tooltip: TooltipType
}) => {
  tooltipsRegistry[id] = tooltip
}

export const useTooltip = (id: string) => {
  const context = useContext(TooltipContext)
  useEffect(() => {
    context.addTooltip(id)
  })
  const tooltip = context.tooltips.find((t) => t.id === id)

  return {
    ...tooltip,
    ...tooltipsRegistry[id],
  }
}
