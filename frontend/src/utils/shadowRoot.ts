export function queryShadowRootDeep(
  hostsSelectorList: ReadonlyArray<{
    selector: string
    useShadowRoot: boolean
  }>
): ShadowRoot | HTMLElement | never {
  let element: ShadowRoot | Element | null | undefined = undefined

  hostsSelectorList.forEach(
    ({
      selector,
      useShadowRoot,
    }: {
      selector: string
      useShadowRoot: boolean
    }) => {
      const root = element ?? document
      element = useShadowRoot
        ? root.querySelector(selector)?.shadowRoot
        : root.querySelector(selector)
      if (!element)
        throw new Error(
          `Cannot find a shadowRoot element with selector "${selector}". The selectors chain is: ${hostsSelectorList.join(
            ', '
          )}`
        )
    }
  )

  if (!element)
    throw new Error(
      `Cannot find a shadowRoot of this chain: ${hostsSelectorList.join(', ')}`
    )
  return element as ShadowRoot | HTMLElement
}

export function adjustShadowRootStyles(
  hostsSelectorList: ReadonlyArray<{
    selector: string
    useShadowRoot: boolean
  }>,
  styles: string
): void {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(styles)

  const shadowRoot = queryShadowRootDeep(hostsSelectorList)

  if (shadowRoot instanceof Element) {
    throw new Error(
      `The shadowRoot of this chain: ${hostsSelectorList.join(
        ', '
      )} is not a ShadowRoot`
    )
  } else {
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet]
  }
}
