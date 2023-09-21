//yeah I know how ugly hack it is
const rampElementsQuery = '[style*="width: 100%; height: 100%;"]'

const setTransparentBackgroundInShadowRoot = (root: Element) => {
  if (root.shadowRoot) {
    root.shadowRoot.querySelectorAll('.overlay').forEach((overlayElement: any) => {
      overlayElement.style.backgroundColor = 'transparent'
    })
  }
}

const hideIframe = (root: Element) => {
  if (root.shadowRoot) {
    root.shadowRoot.querySelectorAll('iframe').forEach((element) => {
      element.style.display = 'none'
    })
  }
}

export const hideRampBackground = () => {
  document.querySelectorAll(rampElementsQuery).forEach((element) => {
    setTransparentBackgroundInShadowRoot(element)
  })
}

export const hideRampWidget = () => {
  document.querySelectorAll(rampElementsQuery).forEach((element) => {
    hideIframe(element)
  })
}
