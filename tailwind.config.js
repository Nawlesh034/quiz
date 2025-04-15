/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        loader: 'loaderAnim 15s linear forwards',
      },
      keyframes: {
        loaderAnim: {
          '0%': { 'background-size': '0% 100%' },
          '100%': { 'background-size': '100% 100%' },
        },
      },
    },
  },
  plugins: [],
}