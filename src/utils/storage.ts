// export const getLocalStorage = <T>(key: string): T | undefined => {
//   const item = localStorage.getItem(key)
//   return item === null || !item ? undefined : JSON.parse(item)
// }

// export const setLocalStorage = (key: string, value: any) => {
//   localStorage.setItem(key, JSON.stringify(value))
// }
// export const getSessionStorage = <T>(key: string): T | undefined => {
//   const item = sessionStorage.getItem(key)
//   return item === null || !item ? undefined : JSON.parse(item)
// }
// export const setSessionStorage = (key: string, value: any) => {
//   localStorage.setItem(key, JSON.stringify(value))
// }
export default {
  get: <T>(key: string): T | undefined => {
    const item = localStorage.getItem(key)
    if (item === null || !item) return
    try {
      return JSON.parse(item)
    } catch (error: any) {
      console.log(error.message)
    }
  },
  set: (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  // 移除全部永久缓存
  clear() {
    localStorage.clear()
  }
}
