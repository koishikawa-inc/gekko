import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/gekko.ts'),
      name: 'Gekko',
      fileName: (format) => (format === 'umd' ? 'gekko.min.js' : `gekko.${format}.js`),
    },
  },
});
