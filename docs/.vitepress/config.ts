import { defineConfig } from "vitepress"
import navBar from "./navBar/index"
import sidebar from "./sideBar"
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
    logo: "/Cat.svg",
    nav: navBar,
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/MissSage"
      }
    ],
    sidebar: sidebar
  }
})
