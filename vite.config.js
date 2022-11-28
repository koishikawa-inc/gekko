import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/gekko.ts'),
      name: 'Gekko',
      fileName: (format) => (format === 'umd' ? 'gekko.min.js' : `gekko.${format}.js`),
    },
    // MEMO: yarn dev を実行するときにコメントアウトを外す
    // rollupOptions: {
    //   input: {
    //     main: resolve(__dirname, 'index.html'),
    //     nested: resolve(__dirname, 'link.html'),
    //   },
    // },
  },
});
