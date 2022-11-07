<template>
  <div
    v-loading="typeof config.loading==='function'?config.loading(row,modelValue):config.loading"
    class="list-wrapper"
    :style="config.wrapperStyle||config.style"
    :class="config.className"
  >
    <div
      v-if="config.filters?.length"
      class="list-header"
      :style="config.filterWrapperStyle"
    >
      <template
        v-for="(filter,i) in config.filters"
        :key="i"
      >
        <FormItem
          v-if="filter.field"
          v-model="state.queryParams[filter.field]"
          :row="state.queryParams"
          :size="'default'"
          :config="filter"
          @change="filter.onChange"
        ></FormItem>
        <FormItem
          v-else
          :row="state.queryParams"
          :config="filter"
        ></FormItem>
      </template>
    </div>
    <div
      class="list-content overlay"
      :class="{'filterable': !config.filters?.length}"
    >
      <ul
        class="form-list"
        :style="config.listStyle"
      >
        <el-checkbox-group
          v-if="config.showCheckbox"
          v-model="state.checkList"
          @change="handleCheck"
        >
          <li
            v-for="(item, i) in config.data || []"
            :key="i"
            class="list-item"
            :class="[config.itemClass, config.highlightCurrentRow&&(config.valueField ? (state.checkList && item[config.valueField] === state.checkList[config.valueField] ? 'active' : '') : item === state.checkList ? 'active' : '')]"
            :style="typeof config.itemStyle==='function'?config.itemStyle(row):config.itemStyle"
            @click="()=>handleNodeClick(item)"
            @dblclick="()=>props.config.nodeDBClick&&props.config.nodeDBClick(item,row)"
          >
            <el-checkbox :label="config.valueField?item[config.valueField]:config.displayField?item[config.displayField]:item">
              {{ resolveLabel(item) }}
            </el-checkbox>
          </li>
        </el-checkbox-group>
        <template v-else>
          <li
            v-for="(item, i) in config.data || []"
            :key="i"
            class="list-item"
            :class="[item.className, config.highlightCurrentRow&&(config.valueField ? (state.checkList && item[config.valueField] === state.checkList[config.valueField] ? 'active' : '') : item === state.checkList ? 'active' : '')]"
            :style="typeof config.itemStyle==='function'?config.itemStyle(item,row):config.itemStyle"
            @click="()=>handleNodeClick(item)"
            @dblclick="()=>props.config.nodeDBClick&&props.config.nodeDBClick(item,row)"
          >
            <span>{{ resolveLabel(item) }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['change', 'update:modelValue', 'click'])
const props = defineProps<{
  config: IFormList
  row?: any
  modelValue?: any
}>()
const resolveCheckList = () => {
  return props.config.showCheckbox ? (props.modelValue instanceof Array ? props.modelValue : [props.modelValue] || []) : props.modelValue
}
const state = reactive<{
  checkList:any[]
  queryParams:any
}>({
  checkList: resolveCheckList(),
  queryParams: { ...(props.config.filterDefaultValue || {}) }
})
const resolveLabel = (item:any) => {
  const val = props.config.displayField ? item[props.config.displayField] : item
  return props.config.formatter && props.config.formatter(val, item, props.config) || val
}
const handleNodeClick = (item:any) => {
  handleCheck(item)
  props.config.nodeClick && props.config.nodeClick(item, props.row)
}
watch(() => props.modelValue, () => {
  state.checkList = resolveCheckList()
})
const setDataBy = computed(() => {
  return props.config.setDataBy && props.row && props.row[props.config.setDataBy] || undefined
})
watch(
  () => setDataBy.value,
  async () => {
    props.config.setData && props.config.setData(props.config, props.row)
  },
  { immediate: true }
)
const handleCheck = (value:any) => {
  console.log(value)

  emit('update:modelValue', value)
  emit('change', value)
}
</script>
<style lang="scss" scoped>
.list-wrapper{
  width: 100%;

  height: 140px;
  overflow: auto;
}
.list-content{
  height: calc(100% - 40px);
  &.filterable{
    height: 100%;
  }
}
.form-list {
  width: 100%;
  list-style-type: none;
  margin-left: 0;
  padding: 0;

}

li {
  padding: 0;
  margin: 0;
}

.list-item {
  color: #fff;
  padding: 0 12px;
  cursor: pointer;

  &:hover,
  &.active {
    background-color: var(--el-color-info);
  }
}
.list-header{
  display: flex;
  height: 32px;
  align-items: center;
}
</style>
