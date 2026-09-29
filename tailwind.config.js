/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Arial", "sans-serif"],
        body: ["var(--font-inter)", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
