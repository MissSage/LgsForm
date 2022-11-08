<template>
  <table class="attr-table">
    <tbody>
      <template v-if="attributes?.length">
        <tr
          v-for="(attr, i) in attributes"
          :key="i"
          @click="() => handleRowClick && handleRowClick(attr)"
        >
          <td class="name">
            <div class="cell">
              <span>{{ attr.label }}</span>
            </div>
          </td>
          <td
            class="value width100"
            :class="theme"
          >
            <div class="cell">
              <span>{{ attr.value }}</span>
            </div>
          </td>
        </tr>
      </template>
      <template v-if="rows?.length">
        <tr
          v-for="(row, i) in rows"
          :key="i"
          @click="() => handleRowClick && handleRowClick(row)"
        >
          <template
            v-for="(td, j) in row"
            :key="j"
          >
            <td class="name">
              <div class="cell">
                <span>{{ td.label }}</span>
              </div>
            </td>
            <td
              class="value"
              :class="theme"
              :colspan="td.cols"
            >
              <div class="cell">
                <span>{{ td.value }}</span>
              </div>
            </td>
          </template>
        </tr>
      </template>
      <template v-if="columns?.length">
        <tr
          v-for="(row, i) in columns"
          :key="i"
          @click="() => handleRowClick && handleRowClick(row)"
        >
          <template
            v-for="(td, j) in row"
            :key="j"
          >
            <td class="name namewidth">
              <div class="cell">
                <span>{{ td.label }}</span>
              </div>
            </td>
            <td
              class="value"
              :class="theme"
              :colspan="td.cols"
            >
              <div class="cell">
                <AttrTableCellContent
                  :config="td"
                  :row="data"
                ></AttrTableCellContent>
              </div>
            </td>
          </template>
        </tr>
      </template>
      <template v-if="!attributes?.length && !rows?.length && !columns?.length">
        <div class="empty">
          暂无内容
        </div>
      </template>
    </tbody>
  </table>
</template>
<script lang="ts" setup>import { IAttrTableRow } from '../../..';


const emit = defineEmits<{(e: 'row-click', row: any, data?: any) }>()
const props = defineProps<{
  attributes?: {
    label: string
    value: any
    data?: any
  }[]
  rows?: IAttrTableRow[][]
  data?: any
  columns?: IAttrTableRow[][]
  theme?: 'darkblue' | 'dark'
}>()
const handleRowClick = row => {
  emit('row-click', row, props.data)
}
</script>
<style lang="scss" scoped>
.attr-table {
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
  tr {
    td {
      padding: 8px 12px;
      border: 1px solid var(--el-border-color-lighter);

      position: relative;
      min-width: 0;
      .cell {
        min-width: 50px;
        white-space: nowrap;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        line-height: 23px;
      }
      &.value {
        &.width100 {
          width: 100%;
        }
        // background-color: #1a1d2d;
        &.dark {
          background-color: #1a1d2d;
        }
        &.darkblue {
          background-color: #132849;
        }
      }
      &.name {
        color: #9097c0;
      }
    }
  }
}
.namewidth {
  width: 120px;
}
.empty {
  font-size: 14px;
  text-align: center;
}
</style>
