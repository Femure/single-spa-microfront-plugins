import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    cors: true,
    fs: {
      allow: [".."], // Allow serving files from parent directories
    },
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "single-spa-react"],
      output: {
        format: "es",
      },
    },
  },
});
