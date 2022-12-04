export const resolveValue = (config: __lgsform.IFormItem, val?: any) => {
  switch (config.type) {
    case 'checkbox':
    case 'cascader':
    case 'daterange':
    case 'datetimerange':
      return val ? (val instanceof Array ? val : [val]) : []
    case 'select':
      return config.multiple ? resolveSelectMultiple(config, val) : val
    case 'number':
      return val ? (typeof val === 'number' ? val : parseFloat(val)) : undefined

    default:
      return val
  }
}
export const deresolveValue = (config: __lgsform.IFormItem, val?: any) => {
  switch (config.type) {
    case 'user':
      return deresolveUser(config, val)
    case 'select':
      return config.multiple ? deresolveMultiple(config, val) : val
    default:
      return val
  }
}

const resolveSelectMultiple = (config: __lgsform.IFormSelect, val?: any) => {
  if (!val) return []

  if (val instanceof Array) return val
  return val.split(',')
}
const deresolveMultiple = (config: __lgsform.IFormSelect, val?: any) => {
  if (!val) return config.returnType === 'arr' ? [] : val

  if (val instanceof Array) {
    return config.returnType === 'str' ? val.join(',') : val
  }
  return config.returnType === 'str' ? val : val.split(',')
}
export const deresolveUser = (config:__lgsform.IFormUser, val?:any) => {
  if (!val) return val

  if (val instanceof Array) {
    return val.map(item => item.id).join(',')
  }
  return val
}
