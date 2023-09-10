/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mybg': "url('src/assets/wp-bg.jpg')",
      }

    },
  },
  plugins: [],
}
