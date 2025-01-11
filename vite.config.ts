import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "src/renderer"),
  base: "./",
  build: {
    // 出力先をプロジェクトルート直下の dist/renderer に
    outDir: resolve(__dirname, "dist", "renderer"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
