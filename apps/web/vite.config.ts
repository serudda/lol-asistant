import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '.prisma/client/index-browser': path.resolve(__dirname, 'src/stubs/prisma-index-browser-stub.js'),
    },
  },
});
