<template>
  <el-tag
    :hit="false"
    :round="props.round"
    :style="styles"
  >
    <slot></slot>
  </el-tag>
</template>
<script lang="ts" setup>
import { ElTag } from 'element-plus'
import { computed } from 'vue'
import { hexToRgba } from '@/utils/GlobalHelper'

const props = defineProps<{
  color?: string |((row?: any, val?: any) => string)
  round?: boolean
  row?: any
  value?: any
}>()
// const state = reactive<{
//   styles: Record<string, any>
// }>({
//   styles: {}
// })
const styles = computed(() => {
  const tColor = typeof props.color === 'function'
    ? props.color(props.row, props.value)
    : props.color || ''
  return {
    '--el-tag-bg-color': hexToRgba(tColor, 0.2),
    '--el-tag-border-color': hexToRgba(tColor, 0.2),
    '--el-tag-hover-color': tColor,
    '--el-tag-text-color': tColor
  }
})
</script>
<style lang="scss" scoped></style>
