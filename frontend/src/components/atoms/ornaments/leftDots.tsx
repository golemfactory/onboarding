const Dot = ({ opacity, fill }: { fill: string; opacity: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 5 5"
      fill="none"
    >
      <g filter="url(#filter0_b_2572_9138)">
        <circle
          cx="2.5"
          cy="2.5"
          r="1.5"
          transform="rotate(90 2.5 2.5)"
          className={fill}
          fillOpacity={opacity}
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="1.75"
          transform="rotate(90 2.5 2.5)"
          stroke="url(#paint0_radial_2572_9138)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_2572_9138"
          x="-99.5"
          y="-99.5"
          width="204"
          height="204"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="50" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2572_9138"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2572_9138"
            result="shape"
          />
        </filter>
        <radialGradient
          id="paint0_radial_2572_9138"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(2.56462 2.73827) rotate(-29.7523) scale(2.28064 2.92801)"
        >
          <stop stopColor="#181EA9" />
          <stop offset="0.0001" stopColor="#181EA9" />
          <stop offset="0.989583" stopColor="#181EA9" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export const LeftDotsOrnament = ({ fill }: { fill: string }) => {
  const opacityArr = [1, 1, 1, 1, 1, 1, 1, 0.8, 0.6, 0.4, 0.2, 0.05, 0]

  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      {opacityArr.map((opacity, idx) => {
        return (
          <Dot
            fill={fill}
            key={`opacity_${opacity}_${idx}`}
            opacity={opacity}
          />
        )
      })}
    </div>
  )
}
