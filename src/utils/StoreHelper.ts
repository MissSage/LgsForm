// 设置自定义iframe大屏是否显示
export const bigScreenVisibleSet = (bigScreen, Routers) => {
  if (bigScreen.length > 0) {
    for (const item of Routers) {
      if (item.name === 'sysExtendPage') {
        item.hidden = false
        item.children = bigScreen
      }
    }
  } else {
    for (const item of Routers) {
      if (item.name === 'sysExtendPage') {
        item.hidden = true
        item.children = bigScreen
      }
    }
  }
}
