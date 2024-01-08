module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridColumn: {
        all: 'col-span-4 md:col-span-8 xl:col-span-12',
      },
      colors: {
        golemblue: '#0C14D4',
        primary: '#181EA9',
        'lightblue-50': '#F6F8FC',
        'lightblue-100': '#E8EBF6',
        'lightblue-200': '#C6CCED',
        'blue-300': '#A4ADDE',
        'blue-400': '#5F6ABF',
        'darkblue-500': '#181EA9',
        'darkblue-600': '#0E137C',
        'darkblue-000': '#0C0E55',

        //TODO add whole color palette with names
        'success-50': '#E8F6E8',
        'success-100': '#',
        'success-200': '#367946',
        // golemblue: '#0c14d4',
        // primary: '#181ea9',
        // secondary: '#f6f8fc',
      },
      transitionDuration: {
        5000: '5000ms',
      },
      minHeight: {
        'screen-without-footer-and-header': 'calc(100vh - 14rem)',
      },
      width: {
        '90p': '90%',
        'golem-grid-desktop': '1232px',
      },
      maxWidth: {
        '1/2': '50%',
      },
      fontSize: {
        mini: '.65rem',
        '3.5xl': [
          '32px',
          {
            lineHeight: '38.4px',
            letterSpacing: '-0.64px',
          },
        ],
      },
      spacing: {
        'golem-logo': '5.76rem',
      },
      border: {
        1: '1px',
      },
      scale: {
        10: '0.10',
        25: '0.25',
        30: '0.30',
        33: '0.33',
        35: '0.35',
        38: '0.38',
        40: '0.40',
        45: '0.45',
        75: '0.75',
        85: '0.85',
      },
    },
  },
}
