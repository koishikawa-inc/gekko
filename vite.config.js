import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/gekko.ts'),
      name: 'Gekko',
      fileName: (format) => (format === 'umd' ? 'gekko.min.js' : `gekko.${format}.js`),
      // formats: ['umd'],
    },
  },
});
