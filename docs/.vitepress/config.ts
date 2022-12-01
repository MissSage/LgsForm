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
      { text: "istar组件库", link: "/istar/" },
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
