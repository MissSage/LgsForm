import { ElMessage, ElMessageBox } from 'element-plus'

export const SLMessage = {
  success: (message: string) => {
    ElMessage({
      type: 'success',
      duration: 2000,
      showClose: true,
      message
    })
  },
  error: (message: string) => {
    ElMessage({
      type: 'error',
      duration: 2000,
      showClose: true,
      message
    })
  },
  warning: (message: string) => {
    ElMessage({
      type: 'warning',
      duration: 2000,
      showClose: true,
      message
    })
  },
  info: (message: string, duration?: number) => {
    ElMessage({
      type: 'info',
      duration: duration || 2000,
      showClose: true,
      message
    })
  }
}

export const SLConfirm = (message: string, title: string) => ElMessageBox.confirm(message, title, {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
})
