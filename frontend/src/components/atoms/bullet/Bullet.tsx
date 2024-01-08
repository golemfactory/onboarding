import style from './Bullet.module.css'

const ExternalDot = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ position: 'absolute' }}
    >
      <g filter="url(#filter0_i_1841_24293)">
        <circle
          cx="12.0004"
          cy="11.9997"
          r="11.6838"
          transform="rotate(-178.426 12.0004 11.9997)"
          fill="url(#paint0_linear_1841_24293)"
        />
      </g>
      <circle
        cx="12.0004"
        cy="11.9997"
        r="11.1838"
        transform="rotate(-178.426 12.0004 11.9997)"
        stroke="url(#paint1_radial_1841_24293)"
      />
      <defs>
        <filter
          id="filter0_i_1841_24293"
          x="-7.68359"
          y="-2.68359"
          width="31.3677"
          height="26.3672"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-8" dy="-3" />
          <feGaussianBlur stdDeviation="16.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0941176 0 0 0 0 0.117647 0 0 0 0 0.662745 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_1841_24293"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1841_24293"
          x1="1.50704"
          y1="0.315962"
          x2="23.8353"
          y2="1.8212"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EAEAFF" />
          <stop offset="1" stopColor="#C8CAFF" stopOpacity="0.21" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_1841_24293"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(12.3759 13.258) rotate(-27.8552) scale(17.5883 23.3594)"
        >
          <stop stopColor="#181EA9" />
          <stop offset="0.0001" stopColor="#F6F8FC" />
          <stop offset="0.989583" stopColor="#F6F8FC" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

const Dot = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      style={{ position: 'absolute' }}
    >
      <g filter="url(#filter0_i_1841_24294)">
        <circle
          cx="7.99301"
          cy="7.99906"
          r="7.01027"
          transform="rotate(-178.426 7.99301 7.99906)"
          fill="url(#paint0_linear_1841_24294)"
        />
      </g>
      <circle
        cx="7.99301"
        cy="7.99906"
        r="6.51027"
        transform="rotate(-178.426 7.99301 7.99906)"
        stroke="url(#paint1_radial_1841_24294)"
      />
      <defs>
        <filter
          id="filter0_i_1841_24294"
          x="-7.01709"
          y="-2.01172"
          width="22.0205"
          height="17.0215"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-8" dy="-3" />
          <feGaussianBlur stdDeviation="16.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0941176 0 0 0 0 0.117647 0 0 0 0 0.662745 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_1841_24294"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1841_24294"
          x1="1.697"
          y1="0.988796"
          x2="15.094"
          y2="1.89194"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#181EA9" />
          <stop offset="1" stopColor="#181EA9" stopOpacity="0.34" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_1841_24294"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(8.21834 8.75402) rotate(-27.8552) scale(10.553 14.0156)"
        >
          <stop stopColor="#181EA9" />
          <stop offset="0.0001" stopColor="#F6F8FC" />
          <stop offset="0.989583" stopColor="#8DABE8" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export const Bullet = () => {
  return (
    <div className={style.container}>
      <div className={style.bulletContainer}>
        <div className={`${style.fadingLine} ${style.topStroke}`}></div>

        <div className={style.dotContainer}>
          <ExternalDot />
          <Dot />
        </div>
        <div className={`${style.fadingLine} ${style.bottomStroke}`}></div>
      </div>
    </div>
  )
}
