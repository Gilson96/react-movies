/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
     'small-phone': '320px',
     'medium-phone': '375px',
     'large-phone': '425px',
     'tablet': '760px',
     'laptop': '1024px',
     'medium-laptop': '1360px',
     'large-laptop': '1440px',
     '4k': '2560px' 
    },

    extend: {
      fontFamily: {
        display: 'Titillium Web, sans-serif',
        body: 'Roboto, sans-serif'
      },
      colors: {
        darkGray: '#2B2D42',
        mediuamGray: '#8D99AE',
        lightGray: '#EDF2F4'
      },
      backgroundImage: {
        'background': "url('./assets/background.jpg')",
      }
    },

  },
  plugins: [],
};

