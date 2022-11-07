export const severityColor = {
  提示: 'rgb(85,204,244)',
  次要: 'rgb(255,216,0)',
  重要: '#f58717',
  紧急: 'rgb(245,75,23)',
  严重: '#FF0000'
}
export const alarmTypes = { offline: '掉线报警', scope: '范围报警', change: '变动报警' }
export const formateStatus = (item: string) => {
  let confirm = ''
  switch (item) {
    case 'CONFIRM_UNACK':
    case 'ACTIVE_ACK':
      confirm = '未恢复 | 未确认'
      break
    case 'CONFIRM_ACK':
      confirm = '未恢复 | 已确认'
      break
    case 'RESTORE_ACK':
      confirm = '已恢复 | 未确认'
      break
    case 'CLEAR_FORCED':
      confirm = '强制解除'
      break
    default:
      break
  }
  return confirm || ''
}
export const formateColor = (item: string) => { return (item === 'CONFIRM_UNACK' || item === 'ACTIVE_ACK' ? '#ff0000' : '#36a624') }
