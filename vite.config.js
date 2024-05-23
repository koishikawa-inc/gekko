import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/gekko.ts'),
      name: 'Gekko',
      fileName: (format) => `gekko.${format}.js`,
      // fileName: (format) => (format === 'umd' ? 'gekko.min.js' : `gekko.${format}.js`),
    },
    rollupOptions: {
      external: [], // 外部依存があればここに追加
      output: {
        globals: {},
      },
    },
  },
});
