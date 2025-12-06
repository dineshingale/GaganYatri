/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Add these animation properties
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'subtle-bounce': 'subtleBounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': { opacity: 0, transform: 'translateY(40px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        subtleBounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        }
      },
    },
  },
  plugins: [],
}

