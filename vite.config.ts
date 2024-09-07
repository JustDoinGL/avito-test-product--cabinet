import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
