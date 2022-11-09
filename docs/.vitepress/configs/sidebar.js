import { getPath } from "./utils"

export default {
  [getPath("/guide/")]: [
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
}
