import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3001,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 4000,
    strictPort: true,
    host: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
});
