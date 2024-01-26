export function getStyle(className: string, styleName: string): string | null {
  const styleSheets: StyleSheetList = document.styleSheets
  let cssRule: CSSStyleRule
  for (let i = 0; i < styleSheets.length; i += 1) {
    try {
      const rules: CSSRuleList = styleSheets[i].cssRules
      for (let j = 0; j < rules.length; j += 1) {
        if (rules[j] instanceof CSSStyleRule) {
          cssRule = rules[j] as CSSStyleRule
          if (cssRule.selectorText === '.' + className) {
            return cssRule.style.getPropertyValue(styleName)
          }
        }
      }
    } catch (e) {
      console.warn('Cannot read rules from stylesheet', styleSheets[i], e)
    }
  }
  return null
}
