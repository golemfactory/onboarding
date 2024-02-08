import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

type TooltipContextData = {
  visible: boolean
  id: string
  show: () => void
  hide: () => void
  toggle: () => void
  startHide: () => void
  cancelHide: () => void
}

type TooltipType = { sections: string[]; appearance: 'primary' | 'secondary' }

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
      startHide: () => {
        return null
      },
      cancelHide: () => {
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

  const timeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const show = (id: string) => {
    setTooltips({ ...tooltips, ...{ [id]: true } })
  }

  const hide = (id: string) => {
    setTooltips({ ...tooltips, ...{ [id]: false } })
  }

  const toggle = (id: string) => {
    setTooltips({ ...tooltips, ...{ [id]: !tooltips[id] } })
  }

  const startHide = (id: string) => {
    timeouts.current[id] = setTimeout(() => {
      return hide(id)
    }, 100)
  }

  const cancelHide = (id: string) => {
    clearTimeout(timeouts.current[id])
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
            startHide: () => startHide(tooltipId),
            cancelHide: () => cancelHide(tooltipId),
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
            startHide: () => startHide(id),
            cancelHide: () => cancelHide(id),
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
  id: string
  tooltip: TooltipType
}) => {
  tooltipsRegistry[id] = tooltip
}

export const useTooltip = (name: string, id?: string) => {
  if (!id) {
    id = name
  }
  const context = useContext(TooltipContext)
  useEffect(() => {
    //@ts-ignore
    context.addTooltip(id)
  })
  const tooltip = context.tooltips.find((t) => t.id === id)

  return {
    ...tooltip,
    ...tooltipsRegistry[name],
  }
}
