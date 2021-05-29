module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        320: "320px",
        100: "100px",
      },
      width: {
        320: "320px",
        100: "100px",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      keyframes: {
        show: {
          "0%": { opacity: "0" },
          "45%": { opacity: "0.6" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        show: "show 1s ease-in-out",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "hover", "focus"],
      outline: ["active", "hover", "focus"],
    },
  },
  plugins: [],
}
