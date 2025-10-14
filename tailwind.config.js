/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/images/bg-img2.jpg')",
        // 'pattern': "url('./img/mensbg.jpg')",
      },
      colors: {
        rust: '#A73928', // Define a custom color named "rust"
      },
    },
    prefix: 'tw-',
  },
  plugins: [],
};

