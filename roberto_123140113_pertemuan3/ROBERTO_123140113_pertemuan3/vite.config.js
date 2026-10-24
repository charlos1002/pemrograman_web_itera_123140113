import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Konfigurasi Vite + Vitest (environment jsdom agar komponen bisa dirender di test)
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
