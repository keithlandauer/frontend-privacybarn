/* eslint-disable no-undef */
module.exports = {
  content: ["./src/**/*.{vue,js,html}", "./node-modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'custom-cyan': '#67E9FF'
      },
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tw-elements/dist/plugin")
  ],
}
