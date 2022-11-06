import { Plugin } from 'vue'
import ButtonVue from './src/packages/Button.vue';
export declare type SFCWithInstall<T> = T & Plugin;
export type IButtonType =
  | 'default'
  | 'success'
  | 'warning'
  | 'info'
  | 'primary'
  | 'danger'
  | 'text'
export type ISize = 'small' | 'large' | 'default' | ''

export type IButton = {
  type?: IButtonType | ((row?: any) => IButtonType)
  text?: string | ((row?: any) => string)
  icon?: string | ((row?: any) => string)
  iconStyles?: Record<string, any> | ((row?: any) => Record<string, any>)
  svgIcon?: any
  color?: string | ((row?: any) => string)
  styles?: Record<string, any> | ((row?: any) => string)
  className?: string | ((row?: any) => string)
  perm?: boolean | ((row?: any) => boolean)
  size?: ISize
  disabled?: boolean | ((row?: any) => boolean)
  // 隐藏 true隐藏/false显示
  hide?: boolean | ((row?: any) => boolean)
  loading?: boolean | ((row?: any) => boolean)
  isTextBtn?: boolean
  /** 是不是正方形的按钮 */
  isBlockBtn?: boolean
  click?: (row?: any, ...args) => void
  /**
   * 没有封装到Button组件中，自行在外层业务中添加逻辑,
   * 提交按钮配置和row数据
   */
  component?: any
  link?: boolean
  // 是否镂空
  plain?: boolean
  // 是否为圆形按钮
  circle?: boolean
  // 只显示图标时设置此项
  title?: string
  // 下拉菜单
  items?: any[]
}
export const Button:ButtonVue
const lgsform = {
  Button: Button
}
export default lgsform