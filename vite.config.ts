import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
  ],
  esbuild: {
    // drop: ['console', 'debugger'],
  },
  resolve: {
    alias: {
      api: '/src/api',
      components: '/src/components',
      hooks: '/src/hooks',
      pages: '/src/pages',
      types: '/src/types',
      ui: '/src/ui',
      utils: '/src/utils',
      layouts: '/src/layouts',
      store: '/src/store',
    },
  },
});
