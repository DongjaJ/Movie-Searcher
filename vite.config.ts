import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    resolve: {
      alias: [
        {find:'@',replacement: resolve(__dirname, '/src')},
    ]
    },
  },
  plugins: [vue(), tsconfigPaths()],
})
