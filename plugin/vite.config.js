import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSingleSpa from 'vite-plugin-single-spa'

export default defineConfig({
  plugins: [
    react(),
    vitePluginSingleSpa({ serverPort: 3000, spaEntryPoints: "src/poc-plugin.tsx" }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
  },
  server: { port: 3000, cors: true },
  build: {
    lib: { entry: "src/poc-plugin.tsx", formats: ["es"], fileName: () => "plugin.js" },
    rollupOptions: { output: { format: "es" } },
    target: "es2020",
    minify: false,
    sourcemap: true,
  },
});

