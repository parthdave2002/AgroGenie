/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./node_modules/flowbite-react/lib/**/*.{js,tsx,ts}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    
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
      sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      mono: ["ui-monospace", "Menlo", "Monaco", "monospace"],
    },
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
