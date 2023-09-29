export const BetaRibbon = () => {
  return (
    <div
      className=" bg-red-500 origin-top float-right mt-9 mr-9 w-72 h-14 text-center"
      style={{
        transform: 'translateX(50%) rotate(315deg)',
        position: 'absolute',
        bottom: '40px',
        right: '40px',
      }}
    >
      <div className="text-4xl mt-2 mr-8 font-bold text-white">BETA</div>
    </div>
  )
}
