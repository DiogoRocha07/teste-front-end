import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api/produtos": {
        target: "https://app.econverse.com.br",
        changeOrigin: true,
        rewrite: () =>
          "/teste-front-end/junior/tecnologia/lista-produtos/produtos.json",
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
    },
  },
});
