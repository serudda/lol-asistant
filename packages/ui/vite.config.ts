import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, './src/common/'),
    },
  },
});
