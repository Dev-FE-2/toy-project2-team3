import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BASE_DIR = 'src';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      public: path.resolve(__dirname, 'public'),
      '@': path.resolve(__dirname, BASE_DIR),
      '@assets': path.resolve(__dirname, `${BASE_DIR}/assets`),
      '@components': path.resolve(__dirname, `${BASE_DIR}/components`),
      '@slices': path.resolve(__dirname, `${BASE_DIR}/slices`),
      '@store': path.resolve(__dirname, `${BASE_DIR}/state/store.ts`),
      '@styles': path.resolve(__dirname, `${BASE_DIR}/styles`),
      '@types': path.resolve(__dirname, `${BASE_DIR}/types`),
    },
  },
});
