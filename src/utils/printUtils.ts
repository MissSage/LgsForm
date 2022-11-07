import printJS from 'print-js'

export const printHTML = (params:{
  printId:string,
  title?:string,
  type?:any,
  showSummary?:boolean}) => {
  const style = `@page {margin:0 10mm;margin-top:100px; margin-left:5px; margin-right: 15px;}
            thead th {
              border-top: 1px solid #000;
              border-right: 1px solid #000;
              border-left: 1px solid #000;
              font-size: 18px;
              padding:5px;
            }
            tbody td {
              border: 1px solid #000;
              padding:5px;
            }
            tbody {
              text-align: center;
              width: 100%;
            }
            table {
              border-collapse: collapse;
               width: 100%;
            } `
  printJS({
    printable: params.printId, // 要打印内容的id
    type: params.type || 'html',
    headerStyle: 'text-align:center;font-size:24px;font-weight:bold;width:100%;margin-bottom:50px',
    header: params.title,
    ignoreElements: ['title'],
    style,
    css: 'https://unpkg.com/element-plus/lib/theme-chalk/index.css',
    targetStyle: params.showSummary !== false ? ['text-align', 'border-collapse', 'width', 'text', 'padding-top', 'margin-bottom', 'margin'] : [],
    scanStyles: true
  })
}

// 传入url路径以及文件名即可
export const downLoadFile = (url, fileName) => {
  getBlob(url).then(blob => {
    saveAs(blob, fileName)
  })
}

export const getBlob = url => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}

export const saveAs = (blob, filename) => {
  const link = document.createElement('a')
  const body = document.querySelector('body') as any

  link.href = window.URL.createObjectURL(blob)
  link.download = filename

  // fix Firefox
  link.style.display = 'none'
  body.appendChild(link)

  link.click()
  body.removeChild(link)

  window.URL.revokeObjectURL(link.href)
}
