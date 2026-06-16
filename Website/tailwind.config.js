/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin 2s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
         wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      colors: {
        // Blue color
        CrystalBlue:      "#bfdbfe", 
        Alexandra:        "#3b82f6",
        BrilliantBlue:    "#1d4ed8",

        // Dark Background color and Text color  ( Gray color)
        White :           "#ffffff",    // white
        LuxuryWhite :     "#f9fafb",    // gray-50
        TitaniumWhite:    "#f3f4f6",    // gray-100
        WhiteMarble :     "#e5e7eb",    // gray-200
        SoothingBlueGrey: "#d1d5db",    // gray-300
        SilverSteel :     "#9ca3af",    // gray-400
        SharkGray :       "#6b7280",    // gray-500
        Hydrocarbon :     "#4b5563",    // gray-600
        TranquilBlack :   "#374151",    // gray-700
        Cosmos :          "#1f2937",    // gray-800
        DarkBackground :  "#111827",    // gray-900

        Cultured:         "#F5F5FA",
        Red:              "#e71616",
        danger:           "#f87171",
        deletebutton:     "#ff6969",
        addbutton:        "#5db55d",
        Platinum:         "#e3e3e3",
      },
      fontFamily: {
        body: ['"Open Sans"', "sans-serif"],
        heading: ['"Chilanka"', "cursive"],
      },
    },
  },
  plugins: [],
}