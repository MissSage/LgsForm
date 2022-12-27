import { defineConfig } from "vitepress"
export default defineConfig({
  title: "MissSage",
  description: "Just Playing Around",
  base: "/",
  markdown: {
    toc: {
      listTag: "ul"
    },
    lineNumbers: false
  },
  themeConfig: {
    siteTitle: "MissSage",
    logo: '/Cat.svg',
    nav: [
      {
        text: "组件库", items: [
          {
            items: [
              { text: 'istar', link: '/istar/' }
            ]
          }
        ]
      },
      {
        text: "工具列表",
        items: [
          {
            items: [
              { text: 'mysql', link: '/utils/mysql' }
            ]
          }
        ]
      },
      {
        text: "相关链接",
        items: [
          {
            items: [
              {
                text: "Animation",
                link: "https://MissSage.github.io/animations"
              },
              {
                text: 'vite',
                link: 'https://cn.vitejs.dev/'
              },
              {
                text: 'vue3',
                link: 'https://cn.vuejs.org/'
              }
            ]
          }
        ]
      }
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/MissSage"
      }
    ],
    sidebar: {
      "/istar/": [
        {
          text: '指南',
          items: [
            {
              text: '快速开始',
              link: '/istar/quickstart'
            }
          ]
        },
        {
          text: "istar组件库",
          collapsible: true,
          items: [
            {
              text: "Form",
              link: "/istar/Form"
            },
            {
              text: "Search",
              link: "/istar/Search"
            }
          ]
        }
      ]
    }
  }
})
