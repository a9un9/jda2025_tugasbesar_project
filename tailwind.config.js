/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    keyframes: {
      pulseStrong: {
        '0%, 100%': { opacity: 1, transform: 'scale(1)' },
        '50%': { opacity: 0.4, transform: 'scale(1.3)' },
      },
    },
    animation: {
      'pulse-strong': 'pulseStrong 1s ease-in-out infinite',
    },
  },
  },  
  plugins: [
    require("tailwindcss-animate"),
  ],
};


