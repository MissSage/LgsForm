<template>
  <div
    :style="typeof config.style==='function'?config.style(modelValue,row,config) :config.style"
    class="list-wrapper overlay"
    :class="config.className"
  >
    <el-tree
      ref="refTree"
      style="width: 100%"
      :size="config.size || size || 'default'"
      :data="config.options"
      :show-checkbox="config.showCheckbox"
      :check-strictly="config.checkStrictly"
      :check-on-click-node="true"
      :node-key="config.nodeKey||'id'"
      default-expand-all
      :props="config.props || state.defaultProps"
      @check="handleCheck"
      @node-click="config.nodeClick"
      @check-change="config.handleCheckChange"
    ></el-tree>
  </div>
</template>
<script lang="ts" setup>
import { IFormTree, ISize } from '@/types';
import { ElTree } from 'element-plus'
import { onMounted, reactive, ref, watch } from 'vue'

const emit = defineEmits(['change', 'update:model-value'])
const props = defineProps<{
  modelValue?: string[]
  config: IFormTree
  row?: any
  size?: ISize
}>()
const refTree = ref<InstanceType<typeof ElTree>>()
const state = reactive<{
  defaultProps: any
}>({
  defaultProps: {
    children: 'children',
    label: 'label'
  }
})
watch(
  () => props.modelValue,
  (newVal: any) => {
    setCheckedKeys(newVal)
  }
)
const handleCheck = (
  node: any,
  keys: any
  // halfCheckedNodes: any,
  // halfCheckedKeys: any
) => {
  emit('change', keys?.checkedKeys || [])
  emit('update:model-value', keys?.checkedKeys || [])
  // props.config.onChange && props.config.onChange(keys.checkedKeys || [])
}
const setCheckedKeys = (keys: any) => {
  props.config.showCheckbox && refTree.value?.setCheckedKeys(keys || [])
}

onMounted(() => {
  setCheckedKeys(props.modelValue)
})
</script>
<style lang="scss" scoped>

  .list-wrapper{
    width: 100%;
  }
</style>
