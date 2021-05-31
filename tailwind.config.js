module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        320: "340px",
        100: "100px",
      },
      width: {
        320: "340px",
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
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        show: "show 1s ease-in-out",
        wiggle: "wiggle 1s ease-in-out infinite",
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
