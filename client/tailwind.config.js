const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        customA:'#6420AA',
        customB:'#FF3EA5',
        customC:'#FF7ED4',
        customD:'#FFB5DA',
      }
    },
  },
  plugins: [flowbite.plugin()],
  
}