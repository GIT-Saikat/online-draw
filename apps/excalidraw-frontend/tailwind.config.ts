/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // Next.js App Directory
    "./components/**/*.{js,ts,jsx,tsx}", // Your custom components
    "./pages/**/*.{js,ts,jsx,tsx}",      // (if you're using the /pages dir too)
  ],
  theme: {
    extend: {}, // Customize your theme here
  },
  plugins: [],
};
