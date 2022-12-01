import { defineConfig } from "vitepress"
export default defineConfig({
  title: "ligoushi",
  description: "Just Playing Around",
  base: "/",
  markdown: {
    toc: {
      listTag: "ul"
    },
    lineNumbers: false
  },
  themeConfig: {
    siteTitle: "lee",
    // logo: '/',
    nav: [
      { text: "istar组件库", link: "/istar/" },
      {
        text: "相关链接",
        items: [
          {
            items: [
              {
                text: "Animation",
                link: "https://MissSage.github.io"
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
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>'
        },
        link: "https://cn.vitejs.dev/"
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
