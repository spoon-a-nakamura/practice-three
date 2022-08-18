import { defineConfig } from 'vite';
import path from 'path';
import glsl from 'vite-plugin-glsl';

export default defineConfig(({ mode }) => {
  console.log('⚓ ' + mode);
  return {
    root: './src',
    base: mode === 'development' ? '/' : '/practice-three/',
    publicDir: '../public',
    plugins: [glsl()],
    build: {
      rollupOptions: {
        input: {
          home: path.resolve(__dirname, './src/index.html'),
        },
      },
      outDir: '../dist',
      cssCodeSplit: false,
      emptyOutDir: true,
    },
    server: {
      host: true,
    },
  };
});
