<template>
  <el-form
    ref="refSearchMore"
    :label-width="labelWidth || '80px'"
    :model="state.queryParams"
    class="more-filter"
    :size="size || 'default'"
    :inline="true"
    @keyup.enter="submit"
    @submit.prevent
  >
    <template v-for="filter in filters">
      <el-form-item
        v-if="!filter.hidden"
        :key="filter.field"
        :prop="filter.field"
        :label="filter.label"
        :style="filter.itemContainerStyle"
        :label-width="filter.labelWidth || '80px'"
      >
        <FormItem
          v-if="filter.field"
          v-model="state.queryParams[filter.field]"
          :size="filter.size || size || 'default'"
          :config="filter"
          @change="(val: any) => handleFormItemChange(val, filter)"
        />
        <FormItem
          v-else
          :config="filter"
          :size="filter.size || size || 'default'"
        />
      </el-form-item>
    </template>
    <div class="footer">
      <el-button
        :size="size || 'default'"
        @click="$emit('close')"
      >
        关 闭
      </el-button>
      <el-button
        :size="size || 'default'"
        type="primary"
        @click="submit"
      >
        确 定
      </el-button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import { ElButton, ElForm, ElFormItem } from 'element-plus'
import { reactive, ref } from 'vue'
import FormItem from './FormItem.vue'

const props = defineProps<{
  filters: IFormItem[]
  size?: ISize
  labelWidth?: string | number
  defaultParams: Record<string, any>
}>()
const emit = defineEmits(['submit', 'close'])
const refSearchMore = ref<InstanceType<typeof ElForm>>()
const state = reactive<{
  queryParams: Record<string, any>
}>({
  queryParams: {
    ...(props.defaultParams || {})
  }
})
const submit = () => {
  emit('submit', state.queryParams)
  emit('close')
}
const handleFormItemChange = (val: any, item: IFormItem) => {
  item.onChange && item.onChange(val, item)
}
const resetForm = () => {
  state.queryParams = { ...(props.defaultParams || {}) }
  refSearchMore.value?.resetFields()
  submit()
}
defineExpose({
  resetForm
})
</script>

<style lang="scss" scoped>
.more-filter {
  padding-top: 15px;
  overflow: hidden;
  position: absolute;
  background-color: #222536;
  box-shadow: 0 5px 3px -3px rgb(31, 28, 28);
  z-index: 15;
  //  ;
  width: 100%;
  left: 0;
  top: calc(100% + 1px);
  .footer {
    text-align: right;
    padding: 20px;
  }
}
</style>
