export const Footer = () => {
  return (
    <div className="inline h-4 mb-8 col-span-12 flex justify-between text-c-n whitespace-nowrap">
      <div>Copyright © 2024 Golem Factory GmbH</div>
      <div className="inline flex gap-1 text-kanit">
        <div>Made with</div>
        <img src="heart.svg" />
        <div className="text-primary inline">
          in{' '}
          <strong>
            <a
              href="https://www.golem.network/"
              target="_blank"
              rel="noreferrer"
            >
              Golem Factory
            </a>
          </strong>{' '}
        </div>
      </div>
    </div>
  )
}
