import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true,
  },
  build: {
    cssCodeSplit: true,
  },
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false,
    },
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://json-server:80',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
