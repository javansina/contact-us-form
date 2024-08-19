/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            teal: {
               1000: '#1E3D42',
            },
         },
      },
      container: {
         center: true,
         padding: '15%',
      },
   },
   plugins: [],
};
