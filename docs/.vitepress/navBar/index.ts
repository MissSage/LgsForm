import { DefaultTheme } from "vitepress"

const navs: DefaultTheme.NavItem[] = [
  {
    text: "娱乐中心",
    items: [
      {
        text: "看电影",
        items: [{ text: "istar", link: "/istar/" }]
      },
      {
        text: "听歌",
        items: [{ text: "网易云音乐（第三方）", link: "https://music.qier222.com/" }]
      },
      {
        text: "游戏厅",
        items: [
          {
            text: "2048",
            link: "https://play2048.co/"
          },
          {
            text: '笨拙的鸟',
            link: 'http://ellisonleao.github.io/clumsy-bird/'
          },
          {
            text: '六角形',
            link: 'https://hextris.io/'
          }
        ]
      }
    ]
  },
  {
    text: "办公室",
    items: [
      {
        text: "组件库",
        items: [{ text: "istar", link: "/istar/" }]
      },
      {
        text: "工具",
        items: [{ text: "mysql", link: "/utils/mysql" }]
      }
    ]
  },
  {
    text: "厨房",
    items: [
      {
        items: [
          { text: "菜单", link: "/cookDishes/" },
          { text: "下厨技巧", link: "/cookSkills/" },
          { text: "安全提示", link: "/cookSafety/" }
        ]
      }
    ]
  },
  {
    text: "图书馆",
    items: [
      {
        text: "个人作品",
        items: [
          {
            text: "Animation",
            link: "https://MissSage.github.io/animations"
          },
          {
            text: "重生之我居然有老婆（扯淡小说）",
            link: "/novel/"
          }
        ]
      },
      {
        text: "文档手册",
        items: [
          {
            text: "vite",
            link: "https://cn.vitejs.dev/"
          },
          {
            text: "vue3",
            link: "https://cn.vuejs.org/"
          }
        ]
      }
    ]
  }
]
export default navs
