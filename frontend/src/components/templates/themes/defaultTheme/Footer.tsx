export const Footer = () => {
  return (
    <div className="inline h-4 col-span-12 flex justify-between text-c-n mt-24 whitespace-nowrap">
      <div>Copyright © 2024 Golem Factory GmbH</div>
      <div className="inline flex gap-1 text-kanit">
        <div>Made with</div>
        <img src="heart.svg" />
        <div className="text-primary inline">
          in <strong>Golem Factory</strong>{' '}
        </div>
      </div>
    </div>
  )
}
