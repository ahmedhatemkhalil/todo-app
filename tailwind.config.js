/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#9E78CF',
        'button-hover': ' #3E1671',
        container: '#1D1825',
        'section-task': '#15101C',
        'icon-hover': '#3E1671',
        'done' : ' #78CFB0',
      },
      borderWidth: {
        1: '1px',
      },
      borderRadius: {
        25: '25%',
        10: '10px'
      },

      spacing: {
        45: '45px',
        10: '40px',
        1.25: '5px',
        3.75: '15px',
        20: '20px',
      },
      width: {
        30: '30%',
        90: '90%',
        25: '25%',
      },
    },
  },
  plugins: [],
}

