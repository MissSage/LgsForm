import { DefaultTheme } from "vitepress"
import { cookSkills, cookSafety, cookDishes } from "./cook"
import istar from "./istar"

const sidebar: DefaultTheme.Sidebar = {
  "/istar/": istar,
  "/cookSkills/": cookSkills,
  "/cookSafety/": cookSafety,
  "/cookDishes/": cookDishes
}
export default sidebar
