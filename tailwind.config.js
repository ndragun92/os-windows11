/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 */
module.exports = {
  content: [],
  theme: {
    screens: {
      touch: { raw: "hover: none" },
      "can-hover": { raw: "hover: hover" },
      xxs: "380px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
      "5xl": "3840px",
    },
    extend: {
      fontSize: {
        xxs: ".65rem",
      },
      colors: {},
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
  safelist: [
    "left-full",
    "right-full",
    "bottom-full",
    "top-full",
    "z-[51]",
    "z-50",
    "right-[4px]",
    "left-[4px]",
    "top-[4px]",
    "w-[calc(100%-8px)]",
    "w-[50vw]",
  ],
};
