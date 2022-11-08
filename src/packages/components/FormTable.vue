<template>
  <div
    v-if="config"
    class="table-wrapper"
    :class="config.height === 'none' ? 'table-height-auto' : ''"
  >
    <div
      v-if="!inCard"
      class="title-wrapper"
    >
      <span
        v-if="config.title"
        class="title"
      >{{ config.title }}</span>
      <div
        v-if="config.titleRight?.length"
        class="right-wrapper"
      >
        <template
          v-for="(rightitem, k) in config.titleRight"
          :key="k"
        >
          <div
            class="right_default"
            :class="rightitem.className"
            :style="rightitem.style"
          >
            <template
              v-for="(obj, z) in rightitem.items"
              :key="z"
            >
              <FormItem
                v-if="obj.field"
                v-model="state.titleQueryParams[obj.field]"
                :config="obj"
                :size="size"
                @change="(val: any) => config.handleQuery && config.handleQuery(val, obj)"
              />
              <FormItem
                v-else
                :config="obj"
                :size="size"
                @change="(val: any) => config.handleQuery && config.handleQuery(val, obj)"
              />
            </template>
          </div>
        </template>
      </div>
    </div>

    <div
      class="table-container"
      :class="heightClass"
    >
      <slot name="prefix">
        <div
          v-if="config.tableTitle"
          class="table-title"
        >
          <span class="title">{{ config.tableTitle }}</span>
        </div>
      </slot>
      <el-table
        ref="refElTable"
        v-loading="config.loading"
        style="width: 100%"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        class="table-custom"
        :size="size"
        :border="config.border !== false"
        :row-key="
          config.rowKey ||
            (row => {
              return row.id
            })
        "
        :stripe="config.stripe"
        :data="newValue"
        :height="config.height === 'none' ? undefined : config.height || '100%'"
        :max-height="
          config.maxHeight === 'none' ? undefined : config.maxHeight || '100%'
        "
        :header-row-class-name="'color-header'"
        :span-method="config.spanMethod"
        :show-summary="config.showSummary"
        :default-expand-all="config.defaultExpandAll"
        :summary-method="(params: any) => config.showSummary && getSummaries(params)"
        :highlight-current-row="config.highlightCurrentRow !== false"
        :current-row-key="config.currentRowKey"
        :default-sort="config.defaultSort as any || { prop: 'orderNum', order: 'descending' }"
        @row-dblclick="config.handleRowDbClick"
        @row-click="config.handleRowClick"
        @selection-change="config.handleSelectChange"
        @select="handleSelect"
      >
        <el-table-column
          v-if="config.expandable"
          type="expand"
        >
          <template #default="propsa">
            <component
              :is="config.expandComponent"
              :config="propsa.row"
            ></component>
          </template>
        </el-table-column>
        <!-- checkbox 根据是否配置了 selectChange 选项来控制显隐 -->
        <el-table-column
          v-if="config.handleSelectChange || config.singleSelect"
          :align="'center'"
          type="selection"
          :reserve-selection="true"
          :selectable="config.selectable"
          width="55px"
        >
        </el-table-column>
        <!-- 序号列 根据 indexVisible 判断是否有序号列 -->

        <el-table-column
          v-if="config.indexVisible"
          :label="
            typeof config.indexVisible === 'boolean'
              ? '序号'
              : config.indexVisible?.label || '序号'
          "
          type="index"
          :align="
            typeof config.indexVisible === 'boolean'
              ? 'center'
              : config.indexVisible.align || 'center'
          "
          :width="
            typeof config.indexVisible === 'boolean'
              ? '55px'
              : config.indexVisible.width || '55px'
          "
          :fixed="
            typeof config.indexVisible === 'boolean'
              ? 'left'
              : config.indexVisible.fixed || 'left'
          "
        ></el-table-column>
        <el-table-column
          v-if="config.sort"
          :label="'排行'"
          :width="'80px'"
          :prop="config.sort.prop"
          align="center"
        >
          <template #default="scope">
            <span
              v-if="scope.$index + 1 === 1"
              :class="{ 'sort-1': config.sort?.showBackground }"
            >{{ scope.$index + 1 }}</span>
            <span
              v-else-if="scope.$index + 1 === 2"
              :class="{ 'sort-2': config.sort?.showBackground }"
            >{{ scope.$index + 1 }}</span>
            <span
              v-else-if="scope.$index + 1 === 3"
              :class="{ 'sort-3': config.sort?.showBackground }"
            >{{ scope.$index + 1 }}</span>
            <span v-else>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <template
          v-for="item in config.columns"
          :key="item.prop"
        >
          <template
            v-if="
              !(typeof item.hidden === 'function' ? item.hidden() : item.hidden)
            "
          >
            <FormTableColumn
              v-if="item.headerFormItemConfig?.field"
              v-model="state.titleQueryParams[item.headerFormItemConfig.field]"
              :config="item"
              :row="state.titleQueryParams"
              @change="(val: any) => config.handleQuery && config.handleQuery(val, item.headerFormItemConfig)"
            ></FormTableColumn>
            <FormTableColumn
              v-else
              :config="item"
              :row="state.titleQueryParams"
            ></FormTableColumn>
          </template>
        </template>

        <!-- 操作 -->
        <el-table-column
          v-if="config.operations && operationVisible"
          label="操作"
          :fixed="config.operationFixed || 'right'"
          :header-align="'left'"
          :align="'center'"
          :width="config.operationWidth || '120px'"
        >
          <template
            v-if="config.operationHeader"
            #header
          >
            <template v-if="config.operationHeader">
              <FormItem
                v-if="config.operationHeader?.field"
                v-model="state.titleQueryParams[config.operationHeader.field]"
                :row="state.titleQueryParams"
                :config="config.operationHeader"
                :size="size"
                @change="
                  (val: any) =>
                    config.handleQuery &&
                    config.handleQuery(val, config.operationHeader)
                "
              ></FormItem>
              <FormItem
                v-else
                :size="size"
                :row="state.titleQueryParams"
                :config="config.operationHeader"
              ></FormItem>
            </template>
          </template>
          <template #default="scope">
            <div class="operation-btn-box">
              <template
                v-for="(btn, i) in config.operations"
                :key="i"
              >
                <component
                  :is="btn.component"
                  v-if="btn.perm && btn.component"
                  :row="scope.row"
                  :operation="btn"
                />

                <el-dropdown
                  v-else-if="btn.items"
                  :key="i"
                  trigger="click"
                  @command="row => btn.click && btn.click(row, scope.row)"
                >
                  <Button
                    :text="btn.isTextBtn !== false"
                    :config="btn"
                    :size="btn.size || 'small'"
                    :row="scope.row"
                  ></Button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-for="(key, index) in btn.items"
                        :key="index"
                        :v-show="key.show && true"
                        :command="key.value"
                      >
                        {{ key.label }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
                <Button
                  v-else
                  :text="btn.isTextBtn !== false"
                  :config="btn"
                  :size="btn.size || 'small'"
                  :row="scope.row"
                ></Button>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <slot name="suffix"></slot>
    </div>
    <Pagination
      class="Pagination"
      :config="config.pagination"
      :refresh-data="config.pagination.refreshData"
    />
  </div>
</template>

<script lang="ts" setup>
import { BigNumber } from 'bignumber.js'
import {
  computed,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect
} from 'vue'
import {
  ElTable,
  ElTableColumn,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus'
import FormTableColumn from './FormTableColumn.vue'
import Pagination from './Pagination.vue'
import FormItem from './FormItem.vue'
import { fileStrToArr } from '@/utils/GlobalHelper'
import Button from './Button.vue'
import { ISize, ITable } from '../../..'

const props = defineProps<{
  config: ITable
  size?: ISize
  modelValue?: any
  inCard?: boolean
}>()
const emit = defineEmits(['change', 'update:modelValue'])

const newValue = computed(() => props.config.dataList)
const heightClass = computed(() => {
  if (props.config.height === 'none') return 'table-height-auto'
  let count = 0
  !props.inCard
    && (props.config.title || props.config.titleRight?.length)
    && count++
  !props.config.pagination.hide && count++
  return 'table-full-' + count
})
// el-table组件实例
const refElTable = ref<InstanceType<typeof ElTable>>()

const state = reactive<{
  titleQueryParams: any
}>({
  titleQueryParams: {}
})
// 是否有有效的operation
const operationVisible = computed(() => props.config.operations?.some(item => item.perm))
const pic = (image?: any, preview?: boolean) => {
  if (!image) return preview ? [] : ''
  const images = image instanceof Array ? image : fileStrToArr(image)
  return preview ? images : images[0]
}
// const exportTable = () => {
//   const excel = new TrueExcel()
//   excel.addElTable(refElTable.value)
//   excel.export()
// }
/**
 * 设置选中项
 */
const toggleRowSelection = (flag?: boolean) => {
  props.config.selectList?.forEach((item: any) => {
    refElTable.value?.toggleRowSelection(item, flag !== false)
  })
}

const getSummaries = (param: any) => {
  const { data } = param
  if (props.config.summaryMethod) {
    return props.config.summaryMethod(props.config.columns, data)
  }
  const sums: string[] = []
  props.config.columns.forEach((column, i) => {
    let index = i
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    if (props.config.indexVisible) index++
    if (props.config.sort) index++
    if (props.config.handleSelectChange) index++
    if (column.summary) {
      const values = data.map(item => Number(item[column.prop]))
      if (!values.every(value => Number.isNaN(value))) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!Number.isNaN(value)) {
            return Number(new BigNumber(prev).plus(curr))
          }
          return prev
        }, 0)}`
      } else {
        sums[index] = '-'
      }
    } else {
      sums[index] = '-'
    }
  })

  return sums
}
/**
 * 处理单选情况
 */
const handleSelect = (selection: any[], row: any) => {
  if (props.config.singleSelect) {
    const isChecked = props.config.rowKey
      ? selection.findIndex(item => {
        const rowKey = props.config.rowKey || ''
        return item[rowKey] === row[rowKey]
      }) !== -1
      : undefined
    props.config.selectList?.forEach((item: any) => {
      refElTable.value?.toggleRowSelection(item, false)
    })
    refElTable.value?.toggleRowSelection(row, !!isChecked)
    props.config.select && props.config.select(row, isChecked)
  } else {
    props.config.select && props.config.select(row)
  }
}
watch(
  () => props.config.selectList,
  () => toggleRowSelection()
)
watch(
  () => props.config.dataList,
  (newVal: any) => {
    if (!newVal) newVal = []
    emit('change', newVal)
    emit('update:modelValue', newVal)
    refElTable.value?.setCurrentRow(props.config.currentRow)
  },
  {
    deep: true
  }
)
watchEffect(() => {
  props.config.currentRowKey
    && props.config.highlightCurrentRow
    && refElTable.value?.setCurrentRow(props.config.currentRow)
})
onMounted(() => {
  toggleRowSelection()
})
defineExpose({
  refElTable,
  operationVisible,
  getSummaries,
  pic,
  // exportTable,
  ...toRefs(state)
})
</script>

<style lang="scss" scoped>
.table-wrapper {
  height: 100%;
  width: 100%;
  &.table-height-auto {
    height: auto;
  }
}

.table-container {
  height: calc(100% - 40px);
  // padding-bottom: 5px;
  width: 100%;
  &.table-height-auto {
    height: auto;
  }
  &.table-full-0 {
    height: 100%;
  }
  &.table-full-1 {
    height: calc(100% - 40px);
  }
  &.table-full-2 {
    height: calc(100% - 80px);
  }

  // border: none;
}

.title-wrapper,
.right-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
}
.title-wrapper {
  .title {
    white-space: nowrap;
    word-break: keep-all;
    color: #a0a6c5;
    font-size: 18px;
  }
}
.table-title {
  height: 40px;
  font-size: 16px;
  text-align: center;
  background-color: #2c2e41;
  border: 1px solid var(--el-border-color-lighter);
  border-bottom: none;

  .title {
    line-height: 40px;
    color: #8388a4;
  }
}

.operation-btn-box {
  width: 100%;
  display: flex;
  justify-content: space-around;

  .el-button + .el-button {
    margin-left: 0;
  }
}

.sort-1,
.sort-2,
.sort-3 {
  display: block;
  border-radius: 12px;
}

.sort-1 {
  background: #ff5a5a;
}

.sort-2 {
  background: #ff955a;
}

.sort-3 {
  background: #fed75a;
}

.right_default {
  margin-bottom: 8px;
}

.Pagination {
  margin-top: 5px;
}
</style>
