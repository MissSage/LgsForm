import { SLMessage } from './Message'
/**
 * 全屏切换
 * @param el 要全屏的元素
 * @returns
 */
export const toggleFullscreen = (el:HTMLElement|null):boolean => {
  if (document.fullscreenEnabled && el) {
    // 退出全屏,三目运算符
    if (document.fullscreenElement !== null) {
      document.exitFullscreen && document.exitFullscreen()
      return false
    }
    el.requestFullscreen && el.requestFullscreen()
    return true
  }
  SLMessage.error('全屏功能不受支持')
  return false
}
