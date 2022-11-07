/**
 * treeData格式化
 * @param tree
 * @param keys // 指定转换的字段适配，默认{ label: 'name', value: 'id', id: 'id', children: 'children' }
 * @returns
 */
export const formatTree = (
  tree: any[],
  keys?: {
    label: string
    value: string
    id: string
    children?: string
    isLeaf?: string
  },
  pPath?: any[],
  type?: string,
  dealItem?: (item: NormalOption) => NormalOption
): any[] => {
  const format = keys || {
    label: 'name',
    value: 'id',
    id: 'id',
    children: 'children'
  }
  tree = tree?.map((node: any) => {
    const path = [...(pPath || []), node[format.id]]
    if (node.children && node.children.length) {
      node.children = formatTree(node.children, format, path, type, dealItem)
    } else {
      delete node.children
    }
    const obj: any = {
      label: resolveKeyValue(node, format?.label, '.'),
      value: resolveKeyValue(node, format?.value, '.'),
      id: resolveKeyValue(node, format?.id, '.'),
      children: resolveKeyValue(node, format?.children, '.'),
      data: node,
      isLeaf: resolveKeyValue(node, format?.isLeaf, '.'),
      parent: pPath && pPath[pPath.length - 1],
      path,
      type
    }
    if (dealItem) return dealItem(obj)

    return obj
  })

  return tree
}
export const getFormatTreeNodeDeepestChild = (
  nodes?: NormalOption[]
): NormalOption | undefined => {
  if (!nodes?.length) return
  const firstHasChild = nodes.find(item => item.children?.length)
  if (firstHasChild) return getFormatTreeNodeDeepestChild(firstHasChild.children)
  return nodes[0]
}
export const getFormatTreeNode = (
  tree?: NormalOption[],
  key = 'value',
  value?: any
): NormalOption | undefined => {
  if (tree === undefined || value === undefined) return
  let item: NormalOption | undefined
  for (let i = 0; i < tree.length; i++) {
    item = tree[i]
    if (item === undefined) return item
    if (item[key] === value) {
      return item
    }
    item = getFormatTreeNode(item.children, key, value)
  }
  return item
}
/**
 * 按指定分割符来获取多层级对象属性
 * @param obj 对象
 * @param key 键，比如：meta.title
 * @param spliter 分割符，比如','或者'.'
 * @returns
 */
export const resolveKeyValue = (
  obj: any,
  key?: string,
  spliter?: string
): string | undefined => {
  if (!key) return
  if (spliter) {
    const keys = key.split(spliter)
    if (keys.length > 1) {
      const lastKeys = keys.slice(1).join(spliter)
      return resolveKeyValue(obj[keys[0]], lastKeys, spliter)
    }
    return obj[keys[0]]
  }
  return obj[key]
}

/**
 * 全屏切换
 * @param el 要全屏的元素
 * @returns
 */
export const toggleFullscreen = (el: HTMLElement | null): boolean => {
  if (document.fullscreenEnabled && el) {
    // 退出全屏,三目运算符
    if (document.fullscreenElement !== null) {
      document.exitFullscreen && document.exitFullscreen()
      return false
    }
    el.requestFullscreen && el.requestFullscreen()
    return true
  }
  console.log('全屏功能不受支持')
  return false
}

export const formateFiles = (fileStrings: string | any[]): any[] => {
  if (!fileStrings) {
    return []
  }

  if (fileStrings instanceof Array) {
    return fileStrings.map(item => {
      if (item.url) {
        return {
          url: item.url,
          name: item.name || item.split('/').pop() || ''
        }
      }
      return {
        url: item,
        name: item.split('/').pop() || ''
      }
    })
  }
  // 如果不是数组则整理成数组
  try {
    const fileitems: any[] = JSON.parse(fileStrings)
    return fileitems instanceof Array ? fileitems : []
  } catch (error: any) {
    const files = fileStrings.split(',')
    return files.map(item => ({
      url: item,
      name: item.split('/').pop() || ''
    }))
  }
}
/**
 * 处理el-image的绑定数据
 * @param image 图片数据
 * @param preview 处理结果是用于图片的预览
 * @returns
 */
export const resolveElImageData = (image?: any, preview?: boolean) => {
  if (!image) return preview ? [] : ''
  const images = image instanceof Array ? image : fileStrToArr(image)
  return preview ? images : images[0]
}
export const fileStrToArr = (fileStr?: string): string[] => {
  try {
    let result: string[] = []
    const imgs = fileStr ? JSON.parse(fileStr.toString()) : ''
    if (imgs instanceof Array) {
      result = imgs.map(obj => obj.url || obj)
    } else {
      result = fileStr ? [fileStr] : []
    }
    return result
  } catch (error) {
    return fileStr?.split(',') || []
    // if (fileStr?.indexOf(',')) {
    // }
    // return fileStr ? [fileStr] : []
  }
}
/**
 * 获取路径中指定参数
 * @param url
 * @param key
 * @returns
 */
export const getUrlPramByName = (
  url: string,
  key: string
): NormalOption | null => {
  if (url && url.indexOf('?') !== -1) {
    const params = url.split('?')[1].split('&')
    const result: NormalOption = {
      label: '',
      value: ''
    }
    const filterdres = params.filter(
      item => item.indexOf('=') !== -1 && item.indexOf(key) !== -1
    )
    if (filterdres.length > 0) {
      result.label = key
      result.value = decodeURI(filterdres[0].split('=')[1])
      return result
    }
    return null
  }
  return null
}
export const removeUrlPramByName = (url: string, parameter: string) => {
  const urlparts = url.split('?')
  if (urlparts.length >= 2) {
    // 参数名前缀
    const prefix = `${encodeURIComponent(parameter)}=`
    const pars = urlparts[1].split(/[&;]/g)

    // 循环查找匹配参数
    for (let i = pars.length; i-- > 0;) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        // 存在则删除
        pars.splice(i, 1)
      }
    }

    return urlparts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '')
  }
  return url
}
/**
 * 根据配置计算当前屏幕下占的列数
 *
 * 没有设置的值取更小屏幕的值，都没有则取24
 * @param group 配置，不传则默认24
 * @param type
 * @returns number 列数
 */
export const getCol = (
  group?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  },
  type?: string
) => {
  let col = 24
  if (!group) return col
  switch (type) {
    case 'xs':
      col = group.xs || 24
      break
    case 'sm':
      col = group.sm || 24
      break
    case 'md':
      col = group.md || 24
      break
    case 'lg':
      col = group.lg || 24
      break
    case 'xl':
      col = group.xl || 24
      break
    default:
      break
  }
  return col
}

/**
 * 根据配置计算当前屏幕下占的列数
 *
 * @param group 配置，不传则根据当前屏幕取适当的值:6\8\10\12\12\24
 * @param type 要获取的对应配置项
 * @returns number 列数
 */
export const getMinimalCol = (
  group?: {
    /**
     * default 24
     */
    xs?: number
    /**
     * default 12
     */
    sm?: number
    /**
     * default 12
     */
    md?: number
    /**
     * default 8
     */
    lg?: number
    /**
     * default 6
     */
    xl?: number
  },
  type?: string
) => {
  let col = 8
  if (!group) return col
  switch (type) {
    case 'xs':
      col = group.xs || 24
      break
    case 'sm':
      col = group.sm || 12
      break
    case 'md':
      col = group.md || 12
      break
    case 'lg':
      col = group.lg || 8
      break
    case 'xl':
      col = group.xl || 6
      break
    default:
      break
  }
  return col
}

/**
 * 获取指定元素的clientWidth/clientHeight
 * @param type
 * @param dom 指定元素，default = body
 * @param percent 指定百分比值：0-100
 * @returns
 */
export const client = (
  type: 'width' | 'height',
  dom?: HTMLElement | string,
  percent?: number
) => {
  let value = 0
  if (dom) {
    dom = typeof dom === 'string'
      ? (document.querySelector(dom) as HTMLElement)
      : dom
  } else {
    dom = document.body
  }

  switch (type) {
    case 'width':
      value = dom ? dom.clientWidth : 0
      break
    case 'height':
      value = dom ? dom.clientHeight : 0
      break
    default:
      break
  }
  return percent ? (value * percent) / 100 : value
}

/**
 * 获取指定元素的offsetWidth/offsetHeight
 * @param type 指定要获取的是宽或高,default = body
 * @param dom 指定元素
 * @returns
 */
export const offset = (
  type: 'width' | 'height' | 'left' | 'top',
  dom?: HTMLElement | string
) => {
  let value = 0
  if (dom) {
    dom = typeof dom === 'string'
      ? (document.querySelector(dom) as HTMLElement)
      : dom
  } else {
    dom = document.body
  }

  switch (type) {
    case 'width':
      value = dom ? dom.offsetWidth : 0
      break
    case 'height':
      value = dom ? dom.offsetHeight : 0
      break
    case 'left':
      value = dom ? dom.offsetLeft : 0
      break
    case 'top':
      value = dom ? dom.offsetTop : 0
      break
    default:
      break
  }
  return value
}

/**
 * 获取指定元素的scroll信息
 * @param type
 * @param dom 指定的元素，default = body
 * @returns
 */
export const scroll = (
  type: 'left' | 'top' | 'width' | 'height',
  dom?: HTMLElement | string
) => {
  if (dom) {
    dom = typeof dom === 'string'
      ? (document.querySelector(dom) as HTMLElement)
      : dom
  } else {
    dom = document.body
  }
  switch (type) {
    case 'left':
      return dom.scrollLeft
    case 'top':
      return dom.scrollTop
    case 'width':
      return dom.scrollWidth
    case 'height':
      return dom.scrollHeight
    default:
      return 0
  }
}
/**
 * 获取数组最后一个
 * @param arr
 * @returns
 */
export const LastOfArr = (arr?: any[]) => (arr?.length ? arr.slice(-1)[0] : undefined)
/**
 * hex样式转换成带通明度的颜色
 * @param hex #xxxxxx
 * @param opacity 通明度
 * @returns
 */
export const hexToRgba = (hex: string, opacity: number) => {
  let rgbaColor = ''
  const reg = /^#[\da-f]{6}$/i
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt(`0x${hex.slice(1, 3)}`)},${parseInt(
      `0x${hex.slice(3, 5)}`
    )},${parseInt(`0x${hex.slice(5, 7)}`)},${opacity})`
  }
  return rgbaColor
}
/**
 * 引入指定路径的图片
 * @param name 相对于assets/images/所在文件路径， assets/images/${name}
 * @param base 默认
 * @returns
 */
export const getImageUrl = (name: string | URL) => {
  const href = new URL(`../assets/images/${name}`, import.meta.url)?.href
  return href
}

/** 格式化电话号码 */
export const formatTelNum = (num?: string) => {
  if (num?.length) {
    const numArr = num.split('')
    numArr.splice(3, 4, '****')
    return numArr.join('')
  }
  return num
}
export const formatterDateTime = 'YYYY-MM-DD HH:mm:ss'
export const formatterDate = 'YYYY-MM-DD'
export const formatterMonth = 'YYYY-MM'
export const formatterYear = 'YYYY'

// 遍历对象，进行替换
// val为对象或数组,children为深度，keys为替换对象
export function traverse(
  val: any[],
  children: 'children' | string = 'children',
  keys: { label: 'name'; value: 'id' } | any = { label: 'name', value: 'id' }
) {
  val.map(obj => {
    if (obj) {
      for (const i in keys) {
        obj[i] = obj[keys[i]]
      }
      if (obj[children] && obj[children].length) {
        traverse(obj[children], children, keys)
      }
    }
    return obj
  })
  return val
}
// 对象扁平化
export function objectFlattening(
  val: any,
  children: 'children' | string = 'children',
  type: 'original' | any = 'original',
  list: any[] = []
) {
  val.map((obj: any) => {
    if (obj) {
      if (type === 'original') {
        list.push(obj)
      } else {
        list.push(obj[type])
      }
      if (obj[children] && obj[children].length) {
        objectFlattening(obj[children], children, type, list)
      }
    }
  })
  return list
}

/**
 * 转换数字单位，以万为基础进行每升一万倍修改单位，最大单位兆，最大值9999兆
 * @param val
 * @returns {value: 转换后的值,unit:转换后的单位}
 */
export const transNumberUnit = (val: number) => {
  if (val === undefined || val < 10000) {
    return {
      value: val,
      unit: ''
    }
  }
  const unitList = ['万', '亿', '兆']
  const length = Math.floor(val).toString().length
  if (length > 16) {
    return {
      value: 9999,
      unit: unitList[2]
    }
  }
  const index = Math.floor((length - 5) / 4)
  return {
    value: Number(val / 10 ** ((index + 1) * 4)),
    unit: unitList[index]
  }
}
