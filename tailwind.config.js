module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        golemblue: "#0c14d4",
        primary: "#181ea9",
        secondary: "#f6f8fc",
        pociejGray: "rgb(225, 226, 230)",
      },
      transitionDuration: {
        5000: "5000ms",
      },
      minHeight: {
        "screen-without-footer-and-header": "calc(100vh - 14rem)",
      },
      maxWidth: {
        "1/2": "50%",
      },
      fontSize: {
        mini: ".65rem",
      },
      spacing: {
        "golem-logo": "5.76rem",
      },
      scale: {
        10: "0.10",
        25: "0.25",
        30: "0.30",
        33: "0.33",
        35: "0.35",
        38: "0.38",
        40: "0.40",
        45: "0.45",
        75: "0.75",
        85: "0.85",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
