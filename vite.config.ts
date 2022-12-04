import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: '~@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  build: {
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        exports: 'named',
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue',
          'element-plus': 'elementPlus'
        }
      }
    },
    lib: {
      entry: path.resolve(__dirname, 'src/export.ts'),
      name: 'lgsform'
    },
  }
})
