import { defineConfig } from "vitepress"

export default defineConfig({
  base: '/docs/',
  title: 'lgsform',
  description: 'demo 一个',
  markdown: {
    config: (md) =>{

    }
  },
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'lgsform111',
    nav: [
      {text: '文档',link: '/guide/'},
      {text: 'Github',link: 'https://github.com/ligoushi/LgsForm'}
    ]
  }
})