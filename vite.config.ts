import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BASE_DIR = 'src';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: [
      {
        find: 'public',
        replacement: path.resolve(__dirname, 'public'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, BASE_DIR),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, `${BASE_DIR}/assets`),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, `${BASE_DIR}/components`),
      },
      {
        find: '@slices',
        replacement: path.resolve(__dirname, `${BASE_DIR}/slices`),
      },
      {
        find: '@store',
        replacement: path.resolve(__dirname, `${BASE_DIR}/state/store`),
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, `${BASE_DIR}/styles`),
      },
      {
        find: '@types',
        replacement: path.resolve(__dirname, `${BASE_DIR}/types`),
      },
    ],
  },
});
