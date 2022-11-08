<template>
  <el-input
    :ref="config.refId"
    v-model="state.value"
    style="width: 100%"
    :class="{ 'no-border': config.noBorder }"
    :type="
      config.inputType || config.type
    "
    :max-length="config.maxlength"
    :min-length="config.minlength"
    :show-word-limit="config.showWordLimit"
    :show-password="config.showPassword"
    :prefix-icon="config.prefixIcon"
    :suffix-icon="config.suffixIcon"
    :rows="config.rows"
    :autosize="computedAutoSize"
    :autocomplete="config.autocomplete"
    :disabled="
      typeof config.disabled === 'function'
        ? config.disabled(state.value, row, config)
        : config.disabled
    "
    :max="config.max"
    :min="config.min"
    :step="config.type"
    :resize="config.resize"
    :autofocus="config.autofocus"
    :tabindex="config.tabindex"
    :validate-event="config.validateEvent"
    :input-style="config.inputStyle"
    :placeholder="config.placeholder || '请输入'"
    :size="config.size || size"
    :readonly="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :clearable="config.clearable !== false"
    @blur="e => $emit('blur', state.value, e)"
    @change="val => $emit('change', val)"
    @focus="e => $emit('focus', state.value, e)"
    @clear="() => $emit('clear', state.value)"
  >
    <template
      v-if="$slots.prefix"
      #prefix
    >
      <slot name="prefix"></slot>
    </template>
    <template
      v-if="$slots.suffix"
      #suffix
    >
      <slot name="suffix"></slot>
    </template>
    <template
      v-if="$slots.prepend"
      #prepend
    >
      <slot name="prepend"></slot>
    </template>
    <template
      v-if="$slots.append"
      #append
    >
      <slot name="append"></slot>
    </template>
  </el-input>
</template>
<script lang="ts" setup>import { IFormInput, ISize } from '../../../global';
import { ElInput } from 'element-plus';
import { reactive, computed, watch } from 'vue';

defineEmits(['change', 'blur', 'focus', 'clear'])
const props = defineProps<{
  modelValue?: any
  config: IFormInput
  size?: ISize
  row?: any
}>()
const state = reactive<{
  value: any
}>({
  value: props.modelValue
})
const computedAutoSize = computed(() => {
  if (props.config.type === 'textarea') {
    if (props.config.autosize === undefined) {
      return {
        minRows: props.config.minRow || 2,
        maxRows: props.config.maxRow || 20
      }
    }
    return props.config.autosize
  }
  return false
})
watch(
  () => props.modelValue,
  val => (state.value = val),
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped></style>
