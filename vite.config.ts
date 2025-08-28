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
  // Keep optimizeDeps for local development, but it won't affect the build with externalization
  optimizeDeps: {
    include: ['three'],
  },
  build: {
    rollupOptions: {
      // Explicitly externalize 'three' so Rollup doesn't try to bundle it
      external: ['three'],
      output: {
        // Ensure that external modules are handled correctly if they appear in chunks
        globals: {
          three: 'THREE', // Map 'three' import to the global THREE object
        },
      },
    },
  },
}));
