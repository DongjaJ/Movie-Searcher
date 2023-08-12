import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [vue(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:3000' },
    },
  },
});
