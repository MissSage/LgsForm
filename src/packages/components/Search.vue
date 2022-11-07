<template>
  <div class="filter-wrapper">
    <el-form
      v-if="config.filters?.length || config.moreFilters?.length"
      ref="refForm"
      class="filter-form"
      :label-width="config.labelWidth || '80px'"
      :inline="true"
      :size="config.size"
      :model="state.queryParams"
      @keyup.enter="config.handleSearch"
      @submit.prevent
    >
      <template v-for="filter in config.filters">
        <el-form-item
          v-if="!filter.hidden"
          :key="filter.field"
          :style="filter.itemContainerStyle"
          :prop="filter.field"
          :label="filter.label"
          :label-width="filter.labelWidth || config.labelWidth"
        >
          <FormItem
            v-if="filter.field"
            v-model="state.queryParams[filter.field]"
            :config="filter"
            :size="config.size"
            @change="(val: any) => handleFormItemChange(val, filter)"
          />
          <FormItem
            v-else
            :config="filter"
            :size="config.size"
          />
        </el-form-item>
      </template>
    </el-form>
    <div
      v-if="config.moreFilters?.length"
      class="more-info"
    >
      <span class="more-info__item describe">更多筛选项：</span>
      <span
        v-for="(item, i) in moreFilterConditions"
        :key="i"
        class="more-info__item"
      >
        <span class="more-info__label">
          {{ item.label }}
        </span>
        <span class="more-info__content">
          {{
            (item.formatter
              ? item.formatter(item.value, state.queryParams, item.filter)
              : item.value) || '-'
          }}
        </span>
      </span>
    </div>
    <transition name="slide-fade">
      <SearchMore
        v-if="state.moreFilterVisiable"
        ref="refSearchMore"
        :label-width="config.labelWidth"
        :size="config.size"
        :filters="config.moreFilters || []"
        :default-params="state.queryParams"
        @submit="addtionalSubmit"
        @close="state.moreFilterVisiable = false"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, watch, ref } from 'vue'
import { ElForm } from 'element-plus'
import SearchMore from './SearchMore.vue'
import FormItem from './FormItem.vue'

const refForm = ref<InstanceType<typeof ElForm>>()
const refSearchMore = ref<InstanceType<typeof SearchMore>>()
const props = defineProps<{
  config: ISearch
}>()

// 初始化参数
const state = reactive<{
  moreFilterVisiable: boolean
  // moreFilterConditions: MoreFilterConditions[]
  // {
  //   label?: string
  //   value?: any
  //   filter?: IFormItem
  //   formatter?:(val: any, row?: any, filter?: IFormItem) => any
  //     }[]
  queryParams: any
}>({
  moreFilterVisiable: false,
  // moreFilterConditions: [],
  queryParams: {
    ...(props.config.defaultParams || {})
  }
})
const moreFilterConditions = ref<MoreFilterConditions[]>([])
// 接收AddtionalFilters附加参数
const addtionalSubmit = (params: Record<string, any>) => {
  Object.assign(state.queryParams, params)
  formateQueryParamsToString(params)
  props.config.handleSearch && props.config.handleSearch(state.queryParams)
}
const handleFormItemChange = (val: any, item: IFormItem) => {
  item.onChange && item.onChange(val, item)
}
watch(
  () => state.queryParams,
  () => {
    if (props.config.static) return
    props.config.filters?.map(item => {
      item.handleHidden && item.handleHidden(state.queryParams, undefined, item)
    })
  },
  {
    deep: true,
    immediate: true
  }
)
/**
 * 处理更多选项的提示信息
 * @param params
 */
const formateQueryParamsToString = (params?: Record<string, any>) => {
  moreFilterConditions.value = []
  props.config.moreFilters?.map(item => {
    if (!item.field || item.type === 'text') return
    let value = (params && params[item.field]) || '-'
    if (item.type.indexOf('range') !== -1) {
      value = value.join && value.join('~')
    }

    moreFilterConditions.value.push({
      label: item.label,
      filter: item,
      value,
      formatter: item.formatter
    })
  })
}
const toggleMore = () => {
  state.moreFilterVisiable = !state.moreFilterVisiable
}
const resetForm = () => {
  state.queryParams = { ...(props.config.defaultParams || {}) }
  refForm.value?.resetFields()
  refSearchMore.value?.resetForm()
}
// 监听参数，更新更多筛选提示文本的内容
watch(
  () => state.queryParams,
  () => {
    moreFilterConditions.value = props.config.moreFilters?.map(item => {
      return {
        label: item.label,
        value: item.field ? state.queryParams[item.field] || '-' : '-'
      }
    }) || []
  }
)
onMounted(() => formateQueryParamsToString())

defineExpose({
  ...toRefs(state),
  toggleMore,
  resetForm
})
</script>
<style lang="scss" scoped>
.filter-wrapper {
  padding: 23px 8px 12px 8px;
  overflow: visible;
  position: relative;
}
.filter-form {
  display: flex;
  width: 100%;
}
.el-form-item {
  margin: 0;
  margin-bottom: 12px;
  padding: 0 12px 0 0;
}

/*****更多选项的过渡动画***** */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-fade-enter-from {
  opacity: 0;
}
.slide-fade-leave-to {
  opacity: 0;
}

.more-info {
  margin-top: -2px;
  margin-bottom: -12px;
  font-size: 12px;
  padding-left: 21px;
  line-height: 20px;
  text-align: right;
  .more-info__item,
  .describe {
    margin-right: 15px;
    color: #9097c0;
  }
  .more-info__label {
    margin-left: 8px;
    margin-right: 4px;
  }
  .more-info__content {
    color: #a0b9cf;
  }
  .describe {
    color: #9097c0;
  }
}
</style>
