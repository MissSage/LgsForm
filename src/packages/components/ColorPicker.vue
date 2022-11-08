<!-- 颜色选择器 -->
<template>
  <div class="color-selector">
    <el-popover
      trigger="click"
      :effect="theme"
      :width="state.width"
      class="color-picker-popver"
      popper-class="el-color-picker__popper"
      @show="getInputWidth"
    >
      <template #reference>
        <div class="color-pick-trigger">
          <div
            class="color-fill"
            :style="{
              backgroundColor: modelValue || 'rgba(0,0,0,0)'
            }"
          >
            {{ modelValue || 'rgba(0,0,0,0)' }}
          </div>
        </div>
      </template>
      <Chrome
        ref="refPicker"
        v-model="state.color"
      ></Chrome>
    </el-popover>
  </div>
</template>

<script lang="ts" setup name="ColorPicker">
import { ColorAttrType, ISize } from '../../..';
import { Chrome } from '@ckpack/vue-color'
import { ElPopover } from 'element-plus'
import { ref, reactive, watch } from 'vue'

const refPicker = ref<InstanceType<typeof Chrome>>()
const props = defineProps<{
  modelValue?: string
  size?: ISize
  disabled?: boolean
  colorType?: ColorAttrType
  theme?: 'dark'|'darkblue'
}>()
const emit = defineEmits(['update:modelValue', 'change'])
const state = reactive<{
  width?: number
  color: string
}>({
  color: props.modelValue || 'rgba(0,0,0,0)'
})
watch(
  () => state.color,
  (color: any) => {
    console.log(color)

    let computedColor: any = ''
    if (typeof color === 'string') {
      computedColor = color
    }
    switch (props.colorType) {
      case 'hsl':
        computedColor = `hsl(${color.hsl.h},${color.hsl.s},${color.hsl.l},${color.hsl.a})`
        break
      case 'hsv':
        computedColor = `hsv(${color.hsv.h},${color.hsv.s},${color.hsv.v},${color.hsv.a})`
        break

      case 'hex8':
      case 'hex':
        computedColor = color[props.colorType]
        break

      default:
        computedColor = `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})`
        break
    }
    emit('update:modelValue', computedColor)
    emit('change', computedColor)
  }
)
const getInputWidth = () => {
  state.width = refPicker.value?.$el.offsetWidth
}
</script>
<style lang="scss">
.color-pick-trigger {
  background-color: #ffffff;
}
.color-fill {
  cursor: pointer;
  width: 140px;
  height: 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  line-height: 24px;
  color: var(--el-text-color-regular);
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
}
</style>
<style>
.el-color-picker__popper {
  padding: 0 !important;
}
.vc-chrome-fields .vc-input__input {
  color: #999;
}
</style>
