import moment from 'moment'

/**
 * 描述时间，转换成带单位的时间
 * @param val
 * @returns xx秒、xx小时、xx分、xx天
 */
export const DescribeDate = (val: any) => {
  const timeLast: number = moment(val).valueOf() / 1000
  if (timeLast < 60) return `${timeLast.toFixed(0)}秒`
  if (timeLast < 3600) return `${(timeLast / 60).toFixed(0)}分`
  if (timeLast < 3600 * 24) return `${(timeLast / 3600).toFixed(0)}小时`
  return `${(timeLast / 3600 / 24).toFixed(0)}天`
}

/**
 * 格式化时间
 * @param val
 * @param format 'Y-M-D h:m:s
 * @returns
 */
export const DateFormatter = (val: string | Date, format?: string) => {
  if (!val) return '-'
  if (!format) return moment(val).format('YYYY-MM-DD HH:mm:ss')
  format = format.replace('Y', 'YYYY')
  format = format.replace('M', 'MM')
  format = format.replace('D', 'DD')
  format = format.replace('H', 'HH')
  format = format.replace('m', 'mm')
  format = format.replace('s', 'ss')
  return moment(val).format(format)
}
/**
 * 格式化时间
 * @param val 要格式化的时间 string|number|Date
 * @param format 'YYYY-MM-DD
 * @returns 格式化后的时间
 */
export const formatDate = (val?: string | number | Date, format?: string) => {
  if (!val) return val
  if (!format) format = 'YYYY-MM-DD HH:mm:ss'
  return moment(val).format(format.replace('h', 'H'))
}
