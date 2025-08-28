import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // We are externalizing 'three', so optimizeDeps won't be strictly necessary for the build,
  // but keeping it for potential local dev benefits.
  optimizeDeps: {
    include: ['three'],
  },
  build: {
    rollupOptions: {
      // Explicitly externalize 'three' so Rollup does NOT try to bundle it.
      // It will be loaded globally via the CDN script.
      external: ['three'],
      output: {
        // Map 'three' import to the global THREE object provided by the CDN.
        globals: {
          three: 'THREE',
        },
      },
    },
  },
}));
