import { DefaultTheme } from "vitepress"

const navs: DefaultTheme.NavItem[] = [
  {
    text: "大厅",
    items: [
      {
        text: "看电影",
        items: [
          {
            text: "istar",
            link: "/istar/"
          }
        ]
      },
      {
        text: "听歌",
        items: [
          {
            text: "网易云音乐（第三方）",
            link: "https://music.qier222.com/"
          }
        ]
      },
      {
        text: "玩游戏",
        items: [
          {
            text: "2048",
            link: "https://play2048.co/"
          },
          {
            text: "笨拙的鸟",
            link: "http://ellisonleao.github.io/clumsy-bird/"
          },
          {
            text: "六角形",
            link: "https://hextris.io/"
          },
          {
            text: '贪吃蛇（地址栏版',
            link: 'https://demian.ferrei.ro/snake'
          }
        ]
      }
    ]
  },
  {
    text: "仓库",
    items: [
      {
        text: "组件库",
        items: [
          {
            text: "istar",
            link: "/istar/"
          }
        ]
      },
      {
        text: "工具箱",
        items: [
          {
            text: "mysql",
            link: "/utils/mysql"
          }
        ]
      },
      {
        text: "奇怪的工具箱",
        items: [
          {
            text: "表情包生成器",
            link: "https://meme.itswincer.com/dagong/"
          },
          {
            text: "毒鸡汤",
            link: "http://www.nows.fun/"
          },
          {
            text: "狗屁不通文章生成器",
            link: "https://suulnnka.github.io/BullshitGenerator/index.html"
          },
          {
            text: "亲戚关系计算器",
            link: "https://passer-by.com/relationship/"
          },
          {
            text: '程序员的女装空间',
            link: 'https://drsrel.github.io/photos'
          },
          {
            text: '英语肌肉记忆锻炼',
            link: 'https://kaiyiwing.gitee.io/qwerty-learner/'
          }
        ]
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
    text: "书房",
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
