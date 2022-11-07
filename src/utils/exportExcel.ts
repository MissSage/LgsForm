import Excel from 'exceljs'
import fileDownload from 'js-file-download'
import $ from 'jquery'

export class TrueExcel {
  workbook: any

  sheet: any

  head: any

  imageCol: number

  constructor() {
    this.workbook = new Excel.Workbook()
    this.workbook.created = new Date()
    this.sheet = this.workbook.addWorksheet('My Sheet')
    this.head = null
    this.imageCol = 0
  }

  addElTable(table) {
    if (!table) {
      console.log('table实例未找到')
      return
    }
    this.workbook = new Excel.Workbook()
    this.workbook.created = new Date()
    this.sheet = this.workbook.addWorksheet('My Sheet')
    this.head = null
    this.addTableHeader(table)
    this.addTableBody(table)
  }

  /**
   * 根据配置向excel添加表格信息
   * @param config ITable
   */
  // addConfigTable (config: ICardTable) {
  //   if (!config) return
  //   this.workbook = new Excel.Workbook()
  //   this.workbook.created = new Date()
  //   this.sheet = this.workbook.addWorksheet(config.title || '工作簿')
  //   this.head = null
  //   this.addConfigTableHeader(config)
  //   this.addConfigTableBody(config)
  // }

  // resolveTableHeader (config: ICardTable) {
  //   let deep = 0
  //   let cols = 0
  //   const sheetColumns: any[] = []
  //   const headerRows: string[][] = []
  //   // 获取表头的列数和行数
  //   const resoleColumns = (columns: IFormTableColumn[]) => {
  //     columns.map((item, i) => {
  //       if (i === 0) deep++
  //       if (item.subColumns?.length) {
  //         resoleColumns(item.subColumns)
  //       } else {
  //         cols++
  //         // sheetColumns.push({key:item.prop,width: parseInt((item.width||item.minWidth||'100').toString())})
  //       }
  //     })
  //   }
  //   const getChildCols = (columns: IFormTableColumn[]) => {
  //     let cols:number = 0
  //     let colValues:string[] = []
  //     const resolve = (columns: IFormTableColumn[],isChild:boolean) => {
  //       columns.map(item=>{
  //         if(item.subColumns?.length){
  //           resolve(item.subColumns,true)
  //         }else{
  //           cols++
  //           colValues.push(item.label)
  //         }
  //       })
  //     }
  //   }
  //   const resolve = (columns: IFormTableColumn[]) => {

  //     columns.map(item=>{
  //       const
  //       if(item.subColumns){

  //       }else{

  //       }
  //     })
  //     this.sheet.getRow(1).eachCell((cell, cellNum) => {
  //       if (!cell) console.log(cellNum)
  //       cell.fill = {
  //         type: 'pattern',
  //         pattern: 'solid',
  //         fgColor: { argb: 'eeeeee' }
  //       }
  //     })
  //     columns.map((item, i) => {
  //       if (i === 0) deep++
  //       if (item.subColumns?.length) {
  //         resolve(item.subColumns)
  //       }
  //     })
  //   }
  //   resoleColumns(config.columns)
  //   resolve(config.columns)
  //   return {
  //     headerRows: deep,
  //     headerCols: 'a'
  //   }
  // }

  // addConfigTableHeader (config) {
  //   headerItems.map((i, item) => {
  //     const head: any = {}

  //     head.header = item.innerText
  //     head.key = item.innerText
  //     head.width = 30
  //     if (item.classList.contains('is-hidden')) {
  //       if (fixedHeaderItems && fixedHeaderItems.length >= headerItems.length) {
  //         head.header = fixedHeaderItems[i].innerText
  //         head.key = fixedHeaderItems[i].innerText
  //       }
  //     }
  //     headerArray.push(head)
  //   })
  //   if (headerArray.length > 0) {
  //     this.sheet.columns = headerArray
  //     this.sheet.getRow(1).eachCell((cell, cellNum) => {
  //       if (!cell) console.log(cellNum)
  //       cell.fill = {
  //         type: 'pattern',
  //         pattern: 'solid',
  //         fgColor: { argb: 'eeeeee' }
  //       }
  //     })
  //   }
  // }

  // addConfigTableBody (config) {}
  /**
   * 添加表头
   * 20220207 lichao 修复因el-table存在固定列而导致的导出的列数据对应不正确的问题
   * @param {*} table
   */
  addTableHeader(table) {
    const headerArray: any[] = []
    const headerItems = $(table.$el).find(
      '.el-table__header-wrapper .el-table__header th'
    )
    const fixedHeaderItems = $(table.$el).find(
      '.el-table__fixed .el-table__header th'
    )
    headerItems.map((i, item) => {
      const head: any = {}

      head.header = item.innerText
      head.key = item.innerText
      head.width = 30
      if (item.classList.contains('is-hidden')) {
        if (fixedHeaderItems && fixedHeaderItems.length >= headerItems.length) {
          head.header = fixedHeaderItems[i].innerText
          head.key = fixedHeaderItems[i].innerText
        }
      }
      headerArray.push(head)
    })
    if (headerArray.length > 0) {
      this.sheet.columns = headerArray
      this.sheet.getRow(1).eachCell((cell, cellNum) => {
        if (!cell) console.log(cellNum)
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'eeeeee' }
        }
      })
    }
  }

  /**
   * 添加表数据
   * 20220207 lichao 修复因el-table存在固定列而导致的导出的列数据对应不正确的问题
   * @param {*} table
   */
  addTableBody(table) {
    const bodyRows = $(table.$el).find(
      '.el-table__body-wrapper .el-table__body tr'
    )
    const fixedBodyRows = $(table.$el).find(
      '.el-table__fixed .el-table__body tr'
    )
    bodyRows.map((i, row) => {
      const rowArray: any[] = []
      const rowItems = $(row).find('td')
      rowItems.map((j, item) => {
        // 如果单元格有is-hidden表示可能固定列,需要从固定列中取对应行列的单元格值
        if (item.classList.contains('is-hidden')) {
          if (fixedBodyRows.length >= rowArray.length) {
            const fiexedCells = $(fixedBodyRows[i]).find('td')
            if (fiexedCells.length >= rowItems.length) {
              rowArray.push(fiexedCells[j].innerText)
            }
          }
        } else if (item.innerText === '') {
          rowArray.push(item.innerText)
        } else {
          rowArray.push(
            Number(item.innerText) || Number(item.innerText) === 0
              ? Number(item.innerText)
              : item.innerText
          )
        }
      })
      this.sheet.addRow(rowArray)
    })
  }

  removeOperateRow() {
    const operateRow = this.sheet.getColumn('操作')
    this.sheet.spliceColumns(operateRow.number, 1)
  }

  removeSelectRow() {
    // const operateRow = this.sheet.getColumn('操作')
    this.sheet.spliceColumns(1, 1)
  }

  addImage(img) {
    const lastCol = this.sheet.columns.length
    const imgId = this.workbook.addImage({
      base64: img.src,
      extension: 'png'
    })
    this.sheet.addImage(imgId, {
      tl: {
        col: lastCol,
        row: this.imageCol
      },
      br: {
        col: img.width / 5 / 19.2 + lastCol,
        row: img.height / 5 / 5 + this.imageCol
      },
      editAs: 'oneCell'
    })
    this.imageCol += img.height / 5 / 5 + 5
  }

  export() {
    this.workbook.xlsx
      .writeBuffer({
        base64: true
      })
      .then(xls64 => {
        fileDownload(xls64, 'export.xlsx')
      })
      .catch(err => {
        console.log(err)
      })
  }
}

// export class DownloadExcel {
//   trueExcel() {
//     this.workbook = new Excel.Workbook()
//     this.sheet = this.workbook.addWorksheet('Sheet one')

//     this.workbook.creator = '能源管理系统'
//     this.workbook.created = new Date()
//     this.workbook.modified = new Date()
//   }
//   tabelExportToExcel(data) {
//     this.sheet.properties.defaultRowHeight = 25
//     this.sheet.columns = []
//     const col = Object.keys(data[0])

//     if (data[0].label) {
//       col.forEach(v => {
//         const columnsInfo = {}
//         data.forEach(v => {
//           columnsInfo.header = v.label
//         })
//         columnsInfo.key = v
//         columnsInfo.width = 20
//         this.sheet.columns.push(columnsInfo)
//       })
//     } else {
//       col.forEach(v => {
//         const columnsInfo = {}
//         columnsInfo.header = v
//         columnsInfo.key = v
//         columnsInfo.width = 20
//         this.sheet.columns.push(columnsInfo)
//       })
//     }

//     data.forEach(item => {
//       this.sheet.addRow(item)

//     })
//   }
//   imageExportToExcel() {}

//   downloadExcel() {

//     this.workbook.xlsx.writeBuffer({
//       base64: true
//     }).then((xls64) => {
//       // 构建锚标记和附加文件（在chrome中工作）
//       var a = document.createElement('a')
//       var data = new Blob([xls64], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

//       var url = URL.createObjectURL(data)
//       a.href = url
//       a.download = Date.now() + 'export.xlsx'
//       document.body.appendChild(a)
//       a.click()
//       setTimeout(() => {
//         document.body.removeChild(a)
//         window.URL.revokeObjectURL(url)
//       }, 0)
//     }).catch((error) => {

//     })
//   }
// }

// // -----------------------------------------------------------------------
// export class Download {
//   tabelExportToExcel(data) {
//     const workbook = new Excel.Workbook()
//     workbook.creator = '能源管理系统'
//     workbook.created = new Date()
//     workbook.modified = new Date()

//     const sheet = workbook.addWorksheet('My Sheet')
//     sheet.properties.defaultRowHeight = 25

//     sheet.columns = [
//       { header: '时间', key: 'date', width: 20 },
//       { header: '姓名', key: 'name', width: 10 },
//       { header: '地址', key: 'address', width: 40 }
//     ]
//     data.forEach(item => {
//       sheet.addRow(item)

//     })

//     workbook.xlsx.writeBuffer({
//       base64: true
//     }).then(xls64 => {
//       // build anchor tag and attach file (works in chrome)
//       // 构建锚标记和附加文件（在chrome中工作）
//       var a = document.createElement('a')
//       var data = new Blob([xls64], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

//       var url = URL.createObjectURL(data)
//       a.href = url
//       a.download = 'export.xlsx'
//       document.body.appendChild(a)
//       a.click()
//       setTimeout(() => {
//         document.body.removeChild(a)
//         window.URL.revokeObjectURL(url)
//       }, 0)
//     }).catch(error => {

//     })
//   }
// }
