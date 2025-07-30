import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },
  build: {
    lib: {
      entry: "src/poc-plugin.tsx",
      formats: ["es"],
      fileName: () => "plugin.js",
    },
    rollupOptions: {
      // external: ["react", "react-dom/client", "single-spa-react"],
      output: {
        format: "es",
      },
    },
    target: "es2020",
    minify: false,
    sourcemap: true,
  },
  server: {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    },
    port: 3000,
  },
});
