import { removeSlash } from './removeIdSlash'
import store from '../store/index'

const uuid = require('uuid')
const moment = require('moment')

export function ThingsBoardTenantListParser(list) {
  const resultList = list.data.data.map(listItem => {
    const resultItem = {}
    for (const item in listItem) {
      // if (item !== 'id') {
      resultItem[item] = listItem[item]
      // }
    }
    // resultItem.id = listItem.id.id
    // resultItem.name = listItem.name
    // resultItem.title = listItem.title
    return resultItem
  })
  return resultList
}

export function ThingsBoardDeviceListParser(list) {
  const resultList = list.data.data.map(listItem => {
    const resultItem:any = {}
    for (const item in listItem) {
      resultItem[item] = listItem[item]
      // }
    }
    const additionalInfo = JSON.parse(resultItem.additionalInfo || '{}')
    resultItem.color = additionalInfo.isVirtualDevice ? '#66ccff' : undefined
    resultItem.label = listItem.name
    resultItem.allowDelete = true
    resultItem.allowMod = true
    resultItem.allowCopy = true
    resultItem.children = []
    resultItem.children[0] = {}
    resultItem.children[0].label = '开关量'
    resultItem.children[0].children = []
    resultItem.children[1] = {}
    resultItem.children[1].label = '变量'
    resultItem.children[1]['data-key'] = 'variables'
    resultItem.children[1]['data-device-id'] = listItem.id
    resultItem.children[1].allowAdd = true
    resultItem.children[1].children = []
    resultItem.children[2] = {}
    resultItem.children[2].label = '控制量'
    resultItem.children[2].children = []
    // resultItem.id = listItem.id.id
    // resultItem.name = listItem.name
    // resultItem.additionalInfo = {}
    // resultItem.additionalInfo.type = listItem.type
    return resultItem
  })
  return resultList
}

export function ThingsBoardTenantManagerListParser(list) {
  const resultList = list.data.data.map(listItem => {
    const resultItem = {}
    // const rules = [
    //   'id',
    //   'createdTime',
    //   'authority'
    // ]
    for (const item in listItem) {
      resultItem[item] = listItem[item]
    }
    // resultItem.id = listItem.id.id
    // resultItem.name = listItem.name
    // resultItem.email = listItem.email
    return resultItem
  })
  return resultList
}

export function ThingsBoardTenantUserListParser(list) {
  const resultList = list.data.data.map(listItem => {
    const resultItem = {}
    // const rules = [
    //   'id',
    //   'createdTime',
    //   'authority'
    // ]
    for (const item in listItem) {
      if (item === 'additionalInfo') {
        const append = JSON.parse(listItem[item])
        resultItem[item] = append
        for (const val in append) {
          resultItem[val] = append[val]
          if (val === 'alarmFromEmail') {
            append[val] ? resultItem[val] = '是' : resultItem[val] = '否'
          }
          if (val === 'alarmFromSms') {
            append[val] ? resultItem[val] = '是' : resultItem[val] = '否'
          }
        }
      } else {
        resultItem[item] = listItem[item]
      }
    }
    // resultItem.id = listItem.id.id
    // resultItem.name = listItem.name
    // resultItem.email = listItem.email
    return resultItem
  })
  return resultList
}

// 虚拟表解析
export function ThingsBoardVirtualTableParser(list) {
  const resultList = list.data.map(listItem => {
    const resultItem:any = {}
    // const rules = [
    //   'id',
    //   'createdTime',
    //   'authority'
    // ]
    for (const item in listItem) {
      // if (!rules.includes(item)) {
      resultItem[item] = listItem[item]
      resultItem.typeInZh = listItem.type === 'inputValue' ? '输入值' : '计算值'
      if (listItem.virtualGroup) {
        resultItem.group = listItem.virtualGroup
        if (!resultItem.group) {
          resultItem.group = ''
        }
        resultItem.virtualGroup = listItem.virtualGroup.split(',')
        if (!resultItem.virtualGroup) {
          resultItem.virtualGroup = []
        }
      }
      // }
    }
    // resultItem.id = listItem.id.id
    // resultItem.name = listItem.name
    // resultItem.email = listItem.email
    return resultItem
  })
  resultList.reverse()
  return resultList
}

export function timeSharingParser(val) {
  let timeSharing:any[] = []
  for (const item of val.data) {
    if (item.key === 'timeSharing') {
      timeSharing = JSON.parse(item.value) || []
      timeSharing = timeSharing.filter(v => v.name)
      // let resultTree = []
      for (const item of timeSharing) {
        item.label = item.name
        item.children = item.data
        item.allowDelete = true
        item.id = uuid()
        item.allowAdd = true
        for (const timeList of item.children) {
          timeList.timeSharingType = item.type
          timeList.label = timeList.key
          timeList.allowDelete = true
          timeList.id = uuid()

          if (item.type === 'time') {
            const tempTimeValue:any[] = []
            for (const timeItem of timeList.value) {
              const tempTimeItem:any[] = []
              tempTimeItem[0] = timeItem.substring(0, 5)
              tempTimeItem[1] = timeItem.substring(6, 11)
              tempTimeValue.push(tempTimeItem)
            }
            timeList.value = tempTimeValue
          }
        }
      }
      return timeSharing || []
    }
  }
}

export function gatewayParser(list) {
  const origData = list.data
  const result = origData.map(gateway => {
    gateway.label = gateway.name
    gateway.loading = false
    gateway.children = []
    gateway.allowAdd = true
    gateway.allowDelete = true
    gateway.shortId = removeSlash(gateway.id.id)
    gateway.isLeaf = false
    gateway.lazy = true
    gateway.createdTimeParsed = moment(gateway.createdTime).format('YYYY-MM-DD HH:mm')
    return gateway
  })
  return result
}

export function devicePropsRegister(reg) {
  const preProcessData = (reg[0] || { value: '' }).value
  // const result = []
  return JSON.parse(preProcessData)
}

export function getSelectTreeId(assetData, searchArea) {
  const queryAssetIds:any[] = []
  filterTreeId(assetData)

  function filterTreeId(assetData, matching?:any) {
    for (const item of assetData) {
      if (matching) {
        queryAssetIds.push(removeSlash(item.assetId))
        if (item.children && item.children.length > 0) {
          filterTreeId(item.children, true)
        }
      } else if (item.assetId === searchArea) {
        queryAssetIds.push(removeSlash(item.assetId))
        if (item.children && item.children.length > 0) {
          filterTreeId(item.children, true)
        }
      } else if (item.children && item.children.length > 0) {
        filterTreeId(item.children, false)
      }
    }
  }
  return queryAssetIds
}

export function projectTreeHandle(treeData, treeMap) {
  const data = {
    treeData,
    treeMap
  }
  filterTree(data.treeData)

  function filterTree(tree) {
    for (const item of tree) {
      if (item.additionalInfo) {
        const aInfo = JSON.parse(item.additionalInfo)
        for (const i in aInfo) {
          item[i] = aInfo[i]
        }
        item.keyId = item.id
        item.showLocation = '(' + item.location[0] + ', ' + item.location[1] + ')'
        data.treeMap.set(item.id, item)
        if (item.children && item.children.length > 0) {
          filterTree(item.children)
        }
      }
    }
  }
  return data
}

export function projectOrDeviceTreeHandle(treeData) {
  const data = {
    treeData,
    treeMap: new Map()
  }
  filterTree(data.treeData)

  function filterTree(tree) {
    for (const item of tree) {
      if (item.additionalInfo) {
        const aInfo = JSON.parse(item.additionalInfo)
        for (const i in aInfo) {
          item[i] = aInfo[i]
        }
        if (item.id.entityType) {
          item.ids = item.id
          item.keyId = removeSlash(item.id.id)
          item.id = item.keyId
          item.iconClass = 'icon-wangguan'
        } else {
          item.keyId = item.id
          item.iconClass = 'icon-xiangmu1'
        }
        if (item.location) {
          item.showLocation = '(' + item.location[0] + ', ' + item.location[1] + ')'
        }
        data.treeMap.set(item.keyId, item)
        if (item.children && item.children.length > 0) {
          filterTree(item.children)
        }
      }
    }
  }
  return data
}

export function projectHostHandle(hostData) {
  const data = {
    hostData,
    hostMap: new Map()
  }

  for (const item of data.hostData) {
    if (item.additionalInfo) {
      const aInfo = JSON.parse(item.additionalInfo)
      for (const i in aInfo) {
        item[i] = aInfo[i]
      }
    }
    item.keyId = item.id.id
    data.hostMap.set(item.id.id, item)
  }

  return data
}

const userProject = store.app.userProject

// 农业项目权限控制 显示隐藏
export function projectDisabled(data) {
  let tempData:any[] = []
  const newData:any[] = []
  const resultId:any = {}
  let result:any[] = []
  const showLeaf:any[] = []
  if (userProject) {
    filterTree(data)
    if (data.length > 1) {
      for (const item of data) {
        if (userProject.includes(item.id) || item.children || item.children.length > 0) {
          tempData.push(item)
        }
      }

      filterTree(tempData)
    } else {
      filterTree(data)
      tempData = data
    }

    for (const item of newData) {
      if (item.parentId !== '0') {
        const info:any = {
          id: item.parentId,
          leaf: item,
          rItem: {},
          children: []
        }
        getParent(info)
        if (!resultId[info.rItem.id]) {
          if (info.children.length > 0) {
            info.rItem.children = info.children
          }
          resultId[info.rItem.id] = info.rItem
        }
      } else {
        resultId[item.id] = item
      }
    }
    for (const item in resultId) {
      result.push(resultId[item])
    }
  } else {
    result = data
  }

  function getParent(info) {
    getTreeItem(tempData, info)
    if (info.rItem.parentId && info.rItem.parentId !== '0') {
      const newLeaf = info.rItem.children.filter(v => showLeaf.includes(v.id) || !v.disabled)
      info.rItem.children = newLeaf
      info.id = info.rItem.parentId
      info.children = info.rItem
      info.rItem = {}
      getParent(info)
    }
  }

  function getTreeItem(data, info) {
    for (const item of data) {
      if (item.id === info.id) {
        info.rItem = item
        showLeaf.push(item.id)
      } else if (item.children && item.children.length > 0) {
        getTreeItem(item.children, info)
      }
    }
  }

  function filterTree(data) {
    for (const item of data) {
      if (!userProject.includes(item.id)) { // && item.nodeType === 'Project'
        // item.disabled = true
      } else {
        newData.push(item)
      }
      if (item.children && item.children.length > 0) {
        filterTree(item.children)
      }
    }
  }
  return result
}
