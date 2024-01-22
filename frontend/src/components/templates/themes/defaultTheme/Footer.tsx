export const Footer = () => {
  return (
    <div className="col-span-12 flex justify-between text-c-n mt-24">
      <div>Copyright © 2024 Golem Factory GmbH</div>
      <div className="flex gap-1 text-kanit">
        Made with <img src="heart.svg" /> in
        <div className="text-primary">
          <strong>Golem Factory</strong>{' '}
        </div>
      </div>
    </div>
  )
}
