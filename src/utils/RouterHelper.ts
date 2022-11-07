import { shallowRef } from 'vue'
import Layout from '@/views/layout/frame/Layout.vue' // Layout
import LayoutParentView from '@/views/layout/frame/components/LayoutParentView.vue'
import LayoutFull from '@/views/layout/frame/components/LayoutFull.vue'
import NotFoundPage from '@/views/404.vue'
import store from '@/store'
import router from '@/router'
import { removeSlash } from './removeIdSlash'
import { getapplications } from '@/api/portal'
import { IFrameComponentPath } from '@/views/sysManage/menuManage/data'
import FramePage from '@/views/layout/frame/components/FramePage.vue'
import { getUrlPramByName } from './GlobalHelper'

/**
 * 动态引入vue文件
 * @param file views目录下的路径，省略后缀，比如Layout/frame/Layout
 * @returns
 */
// export const _import = file => {
//   return async () => {
//     // console.log(file)
//     if (typeof file === 'string') {
//       try {
//         const res = await import('@/views/' + file + '.vue')

//         return res
//       } catch (error) {
//         console.log(error)
//         return NotFoundPage
//       }
//     } else {
//       if (typeof file === 'function') return file()
//       return file || NotFoundPage
//     }

// }
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
export const hasPermission = (permissionRoles?: any) => {
  const roles = store.user.user?.authority?.split(',') || []
  if (roles?.indexOf('SYS_ADMIN') !== -1 || !permissionRoles?.length) {
    return true
  }
  const res = roles?.some(role => permissionRoles.indexOf(role) !== -1)
  return res
}

export const filterAsyncRouter = (
  extendRouterMap: any[] | undefined,
  parentRoute?: any
) => {
  if (extendRouterMap instanceof Array) {
    // 遍历后台传来的路由字符串，转换为组件对象
    const extendRouters = extendRouterMap
      ?.filter(route => hasPermission(route.meta?.roles))
      .map(route => {
        // if (!hasPermission(route.meta?.roles)) return false
        if (!route.component || route.component === null) {
          route.component = shallowRef(NotFoundPage)
        } else if (route.component === 'Layout') {
          // Layout组件特殊处理
          route.component = shallowRef(Layout)
        } else if (route.component === 'LayoutFull') {
          route.component = shallowRef(LayoutFull)
        } else if (route.component === 'LayoutParentView') {
          route.component = shallowRef(LayoutParentView)
        } else {
          const comp = route.component
          const isString = typeof comp === 'string'
          if (isString) {
            if (comp.startsWith(IFrameComponentPath)) {
              const tokenField = getUrlPramByName(
                route.component,
                'tokenField'
              )?.value?.toString()
              const url = getUrlPramByName(route.component, 'url')?.value
              route.component = shallowRef(FramePage)
              route.query = {
                url: decodeURIComponent(url || ''),
                tokenField
              }
            } else {
              const modules = import.meta.glob('../views/**/*.vue')
              route.component = modules[/* @vite-ignore */ `../views/${route.component}.vue`]
              // 没有对应的页面时则跳转到404
              if (route.component === undefined) {
                route.component = shallowRef(NotFoundPage)
              }
            }
          }
        }
        const query = getUrlParamsToObj(route.path)

        route.query = {
          ...(route.query || {}),
          ...query
        }
        route.path = resolveRoutePath(route.path, parentRoute?.path, true)

        // route.label = route.meta.title
        if (route.children?.length && route.children.length > 1) {
          route.alwaysShow = true
        }
        route.children = filterAsyncRouter(route.children, route)

        // if (!route.label) {
        //   route.alwaysShow = false
        // }
        return route
      }) || []

    return extendRouters
  }
  return undefined
}
/**
 * 处理路径
 * @param path 路径
 * @param pPath 父路径
 * @param withPrefix 以'/'开头的字符串返回
 * @returns 处理过后的路径,不带参数
 */
export const resolveRoutePath = (
  path: string,
  pPath?: string,
  withPrefix?: boolean
) => {
  path = path.split('?')[0]
  const pPaths = pPath?.split('/') || []
  const cPaths = path?.split('/') || []
  const temp = pPaths
    .concat(cPaths)
    .filter(item => !!item)
    .join('/')
  return withPrefix ? `/${temp}` : temp
}
// export const GenerateRoutes = async () => {
//   await store.permission.GenerateRoutes()
//   store.business.SET_shouldRefreshSideBar(false)
// }

/**
 * 刷新所有路由
 */
export const refreshAllRoutes = async () => {
  await store.permission.GenerateRoutes()
  const routers = store.permission.routers || []
  routers.forEach(item => {
    router.addRoute(item)
  })
}
/**
 * 处理横向菜单和侧边菜单
 * @returns
 */
export const handleAppChange = async () => {
  const { isFrameApp } = store.app
  if (isFrameApp) {
    store.business.SET_shouldRefreshSideBar(false)
    return
  }
  const { shouldRefreshSideBar } = store.business
  if (shouldRefreshSideBar) {
    await refreshAllRoutes()
  }
}
/**
 * 获取路由的最子级的路径
 * @param route
 * @param withHidden 不排除hidden选项？
 * @returns
 */
export const GetDeepestRoutePath = (route: any, withHidden?: boolean) => GetDeepestRoute(route, withHidden)?.path || '/'
/**
 * 获取路由的最子级的路由
 * @param route
 * @param withHidden 不排除hidden选项？
 * @returns
 */
export const GetDeepestRoute = (route: any, withHidden?: boolean) => {
  if (!route?.path) return undefined
  const children = route.children?.filter(
    item => withHidden || (item.hidden !== true && item?.meta?.hidden !== true)
  )
  if (children?.length) {
    return GetDeepestRoute(children[0])
  }
  return route
}
export const Set_navApps = async () => {
  try {
    await store.business.INIT_navAppsName()

    const tenantId = removeSlash(store.user.user?.tenantId?.id || '')
    const res = await getapplications(tenantId)
    store.business.SET_navApps(res.data || [])
    store.business.SET_curNavs()
    const curNav = store.business.curNavs.find(item => item.id === store.app.appid)
      || store.business.curNavs[0]
    store.app.SET_appid(curNav?.id || '')
    store.app.SET_appname(curNav?.name || '')
    store.app.SET_isFrameApp(curNav?.type === '2')
    store.app.SET_frameAppUrl(curNav?.applicationUrl || '')
  } catch (error) {
    console.log(error)
  }
}
export const handleRangeChange = async (item?: NormalOption) => {
  store.business.SET_BUSINESS_NAVSELECTEDRANGE(
    item
    // || { label: '', value: '', data: { type: '1' } }
  )
  await Set_navApps()
  // store.business.SET_shouldRefreshSideBar(true)
  // await GenerateRoutes()
  // const addRoute = store.permission.addRouters
  // if (addRoute?.length) {
  //   const first = GetDeepestRoutePath(addRoute[0])
  //   router.push(first || '/')
  // }
}
export const getUrlParams = (url?: string): { key: string; value?: any }[] => {
  if (!url) return []
  const paramsStr = url.split('?')[1]
  const params = paramsStr?.split('&') || []
  return (
    params.map(item => {
      if (item.indexOf('=') !== -1) {
        const strArr = item.split('=')
        return {
          key: strArr[0],
          value: strArr[1]
        }
      }
      return {
        key: item,
        value: undefined
      }
    }) || []
  )
}
export const getUrlParamsToObj = (url?: string): Record<string, any> => {
  const params: Record<string, any> = {}
  getUrlParams(url).map(item => {
    params[item.key] = item.value
  })
  return params
}
