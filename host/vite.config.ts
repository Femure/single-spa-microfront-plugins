import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSingleSpa from 'vite-plugin-single-spa'

export default defineConfig({
  plugins: [
    react(),
    vitePluginSingleSpa({
      type: 'root',
      imo: '3.1.1'
    })
  ],
  server: {
    port: 4000,
    cors: true,
    // fs: {
    //   allow: [".."], // Allow serving files from parent directories
    // },
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
