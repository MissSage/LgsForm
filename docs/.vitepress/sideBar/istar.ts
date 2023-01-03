import { DefaultTheme } from "vitepress"

const menus: DefaultTheme.SidebarGroup[] = [
  {
    text: "指南",
    items: [
      {
        text: "快速开始",
        link: "/istar/quickstart"
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
export default menus
