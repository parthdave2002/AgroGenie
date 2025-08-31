import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-datepicker/dist/react-datepicker.css": path.resolve(
        "node_modules/react-datepicker/dist/react-datepicker.css"
      ),
    },
  },
});
