import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// import UnpluginComponents from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import AutoImport from 'unplugin-auto-import/vite'
// import Icons from 'unplugin-icons/vite'
// import IconResolver from 'unplugin-icons/resolver'
// import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    // AutoImport({
    //   include: [
    //     /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    //     /\.vue$/,
    //     /\.vue\?vue/, // .vue
    //     /\.md$/ // .md
    //   ],
    //   eslintrc: {
    //     enabled: true
    //   },
    //   imports: [
    //     'vue',
    //     'pinia',
    //     'vue-router',
    //     {
    //       vue: ['ComputedRef'],
    //       '@vueuse/core': [
    //         // named imports
    //         'useMouse', // import { useMouse } from '@vueuse/core',
    //         'useDark',
    //         'useToggle',
    //         // alias
    //         ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
    //       ],
    //       axios: [
    //         // default imports
    //         ['default', 'axios'] // import { default as axios } from 'axios',
    //       ],
    //       moment: [['default', 'moment']]
    //       // '[package-name]': [
    //       //   '[import-names]',
    //       //   // alias
    //       //   ['[from]', '[alias]']
    //       // ]
    //     }
    //   ]
    // }),
    // UnpluginComponents({
    //   dirs: ['src/components'],
    //   resolvers: [
    //     ElementPlusResolver(),
    //     IconResolver({
    //       prefix: 'icon',
    //       // 注册可以使用集合
    //       enabledCollections: ['ep', 'ic', 'material-symbols', 'mdi', 'gis'], // ep即是element-plus对应的icon集合
    //       // 注册自定义本地图标集合名称
    //       customCollections: ['svgs']
    //     })
    //   ]
    // }),
    // // 使用图标方式：
    // // 1、 如果项目已经使用过Icons插件的图标，则可以找到components.d.ts中路径是~icons/开头的组件，都是可能在页面中直接使用的，支持大驼峰和-写法<IconSvgsSet />或<icon-svgs-set />
    // // 2、 另外如果未找到对应图标，可以在页面中通过配置的前缀+集合名+图标名来使用，形如<IconSvgsSet />或<icon-svgs-set />，这样在编译前会自动下载对应的图标集合并添加对应的图标声明到components.d.ts中
    // // 3、 引入本地svg图标：需要配置customCollections和customCollections，使用方法同上，<icon-svgs-set />

    // // 默认使用Iconify图标库：https://icones.netlify.app/collection/ep?s= ，路径最后ep即是图标的集合名，ep即是element-plus

    // Icons({
    //   compiler: 'vue3',
    //   autoInstall: true,
    //   // 加载自定义图标集合
    //   customCollections: {
    //     // 引入本地svg，并设置填充颜色为currentColor，这样可以通过el-icon来进行包裹，并继承其颜色
    //     svgs: FileSystemIconLoader('./src/assets/icons/svg', svg => svg.replace(/^<svg /, '<svg fill="currentColor" '))
    //   }
    // })
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
        extend: true,
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue',
          'element-plus': 'elementPlus'
        },
        exports: "named"
      }
    },
    lib: {
      entry: './src/packages/index.ts',
      name: 'lgsform'
    }
  }
})
