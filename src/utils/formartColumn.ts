let formatColumns:any = []

export const formatColumn = (columns:any) => {
  formatColumns = []
  columns.map((columnItem:any) => {
    if (columnItem.columnName.indexOf('--') > -1) {
      const columnItems = columnItem.columnName.split('--')
      columnItems.forEach((columnName, index) => {
        const column = { prop: columnItem.columnValue, label: columnName, align: 'center', unit: columnItem.unit ? '(' + columnItem.unit + ')' : '' }
        const parent = findColumn(columnItems[0]) as any
        if (parent) {
          if (index === 1) {
            if (!parent.subColumns) {
              parent.subColumns = [column]
            } else {
              const sb = parent.subColumns.find(column => column.label === columnName)
              if (!sb) {
                parent.subColumns.push(column)
              }
            }
          } else if (index === 2) {
            parent.subColumns.map(pColumn => {
              if (!pColumn.subColumns) {
                pColumn.subColumns = [column]
              } else {
                const sb = pColumn.subColumns.find(column => column.label === columnName)
                if (!sb) {
                  pColumn.subColumns.push(column)
                }
              }
            })
          }
        } else {
          const column = { prop: columnItem.columnValue, label: columnName, align: 'center', unit: columnItem.unit ? '(' + columnItem.unit + ')' : '' } as any
          formatColumns.push(column)
        }
      })
    } else {
      const column = { prop: columnItem.columnValue, label: columnItem.columnName, align: 'center', unit: columnItem.unit ? '(' + columnItem.unit + ')' : '' } as any
      formatColumns.push(column)
    }
  })
  return formatColumns
}

const findColumn = (columnName:string) => {
  return formatColumns.find((column:any) => column.label === columnName)
}
