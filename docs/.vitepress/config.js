import { demoBlockPlugin } from "vitepress-theme-demoblock"
export default {
  // 网站标题
  title: "Hello VitePress",
  // 网站描述
  description: "Just playing around.",
  themeConfig: {
    // 顶部右上角导航
    nav: [
      {
        text: "文档",
        link: "/guide/"
      }
    ],
    // 左侧导航
    sidebar: {
      "/guide/": [
        {
          text: "文档",
          children: [
            {
              text: "Button",
              link: "/guide/Button"
            },
            {
              text: "Form",
              link: "/guide/Form"
            }
          ]
        }
      ]
    },
    //丝滑滚动
    smoothScroll: true,
    // 启用时间线
    editLinks: true,
    //在git上编辑提示文字
    editLinkText: "在 GitHub 上编辑此页",
    // 获取每个文件最后一次 git 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
    lastUpdated: "上次更新"
  },
  // markdown: {
  //   config: md => {
  //     // md.use(demoBlockPlugin, {
  //     //   // cssPreprocessor: 'scss',
  //     //   // scriptImports: ["import * as ElementPlus from 'element-plus'"],
  //     //   // scriptReplaces: [
  //     //   //   { searchValue: /const ({ defineComponent as _defineComponent }) = Vue/g, replaceValue: "const { defineComponent: _defineComponent } = Vue" },
  //     //   //   { searchValue: /import ({.*}) from 'element-plus'/g, replaceValue: (s, s1) => `const ${s1} = ElementPlus` }
  //     //   // ]
  //     // })
  //   }
  // }
}
