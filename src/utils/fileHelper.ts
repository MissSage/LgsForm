export const downloadFile = (url?: string, name?: string, type?:string) => {
  if (!url) return
  if (type === 'img') return window.open(url)
  const a = document.createElement('a')
  a.setAttribute('href', url) // a.href='文件链接'
  a.setAttribute('target', '_blank')
  a.setAttribute('download', (name || '下载文件')) // a.download='文件名'
  a.click()
}
/**
 * 下载指定路径
 * @param url
 * @param name
 */
export const downloadUrl = (url?: string, name?: string) => {
  if (!url) return
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('target', '_blank')
  // link.href = 'http://124.112.49.66:9950/user_template.xlsx'
  // link.href = 'http://139.155.92.140:8999/group1/M00/00/00/rBsADGDxGLOAH0F1AAAnsQ1RlwA63.xlsx'
  // link.href = 'http://139.155.92.140:29999/group1/M00/00/00/rBsADGDxGLOAH0F1AAAnsQ1RlwA63.xlsx'
  link.setAttribute('download', name || '下载')
  document.body.appendChild(link)
  link.click()
}
