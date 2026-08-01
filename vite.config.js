import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        pitch: resolve(process.cwd(), 'pitch/index.html')
      }
    }
  },
  server: {
    host: '0.0.0.0'
  }
});
