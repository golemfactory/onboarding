export const OnRamp = ({ goToNextStep }: { goToNextStep: () => {} }) => {
  const metamask = useMetaMask()
  const account = metamask.wallet.accounts[0]
  let widget: RampInstantSDK | null = null

  const [done, setDone] = useState(false)

  useEffect(() => {
    if (account && !done) {
      debug('creating widget')
      widget = new RampInstantSDK({
        hostAppName: 'Your App',
        hostLogoUrl: 'https://assets.ramp.network/misc/test-logo.png',
        hostApiKey: '9the9ervmr72ezz6fwaxus72y3h2w5p47j9u8m9o',
        url: 'https://app.demo.ramp.network',
        swapAsset: 'MATIC_MATIC',
        fiatValue: '6',
        fiatCurrency: 'EUR',
        userAddress: account,
      })
      widget.show()

      widget.on('*', (event) => {
        debug('event')
        debug(event.type)
        if (event.type === 'WIDGET_CLOSE') {
          goToNextStep()
          debug('closing widget')
          hideRampWidget()
        }
      })
      debug('setting done')
      setDone(true)
    }

    hideRampBackground()
  }, [account, done])

  return <OnRampPresentational onConfirm={goToNextStep} />
}
