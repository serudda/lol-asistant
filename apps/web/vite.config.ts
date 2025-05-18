import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function getModulePath(moduleName: string) {
  try {
    const moduleUrl = import.meta.resolve(moduleName);
    const modulePath = fileURLToPath(moduleUrl);
    return modulePath.substring(0, modulePath.lastIndexOf('node_modules')).replace(/\/+$/, '') || '';
  } catch (error) {
    console.error(`Module ${moduleName} resolution failed:`, (error as Error).message);
    return '';
  }
}

const prismaNodeModulesPath = `${getModulePath('@prisma/client')}/node_modules`;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '.prisma/client/index-browser': `${prismaNodeModulesPath}/.prisma/client/index-browser.js`,
    },
  },
});
