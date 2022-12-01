<template>
  <div class="range-selector">
    <el-select
      v-if="config.rangeType === 'select'"
      v-model="start"
      filterable
      :style="{
        width: config.width || '100%'
      }"
      :class="{ 'no-border': config.noBorder }"
      :clearable="config.clearable !== false"
      :placeholder="config.placeholder || config.startPlaceHolder || '请选择'"
      :disabled="
        typeof config.readonly === 'function'
          ? config.readonly(start, row, config)
          : config.readonly
      "
      @change="handleChange"
    >
      <el-option
        v-for="(obj, i) in config.options"
        :key="i"
        :label="obj.label"
        :value="obj.value"
        :disabled="
          (config.startOptionDisabled &&
            config.startOptionDisabled(obj, end)) ||
            false
        "
      />
    </el-select>
    <el-date-picker
      v-else-if="config.rangeType === 'year'"
      v-model="start"
      type="year"
      format="YYYY"
      :size="config.size || 'default'"
      :clearable="config.clearable !== false"
      :placeholder="config.placeholder || config.startPlaceHolder || '请选择'"
      value-format="YYYY"
      :disabled-date="disableStartDate"
      :disabled="
        typeof config.readonly === 'function'
          ? config.readonly(start, row, config)
          : config.readonly
      "
      @change="handleChange"
    >
    </el-date-picker>
    <el-input
      v-else
      v-model="start"
      :size="config.size || 'default'"
      :placeholder="config.placeholder || config.startPlaceHolder || '请输入'"
      :disabled="
        typeof config.readonly === 'function'
          ? config.readonly(start, row, config)
          : config.readonly
      "
      @change="handleChange"
    >
      <template
        v-if="config.suffix || config.unit"
        #suffix
      >
        <span v-if="config.unit">{{ config.unit }}</span>
        <span v-else>{{ config.suffix }}</span>
      </template>
      <template
        v-if="config.prefix"
        #prefix
      >
        <span>{{ config.prefix }}</span>
      </template>
      <template
        v-if="config.prepend"
        #prepend
      >
        <span v-if="typeof config.prepend === 'string'">
          {{ config.prepend }}
        </span>
      </template>
      <template
        v-if="config.append"
        #append
      >
        <span v-if="typeof config.append === 'string'">
          {{ config.append }}
        </span>
      </template>
    </el-input>
    <span class="separator">{{ config.separator || '~' }}</span>
    <el-select
      v-if="config.rangeType === 'select'"
      v-model="end"
      filterable
      :style="{
        width: config.width || '100%'
      }"
      :class="{ 'no-border': config.noBorder }"
      :clearable="config.clearable !== false"
      :placeholder="config.placeholder || config.endPlaceHolder || '请选择'"
      :disabled="
        typeof config.readonly === 'function'
          ? config.readonly(start, row, config)
          : config.readonly
      "
      @change="handleChange"
    >
      <el-option
        v-for="(obj, i) in config.options"
        :key="i"
        :label="obj.label"
        :value="obj.value"
        :disabled="
          (config.endOptionDisabled && config.endOptionDisabled(obj, start)) ||
            false
        "
      />
    </el-select>
    <el-date-picker
      v-else-if="config.rangeType === 'year'"
      v-model="end"
      type="year"
      format="YYYY"
      :size="config.size || 'default'"
      :clearable="config.clearable !== false"
      :placeholder="config.placeholder || config.endPlaceHolder || '请选择'"
      value-format="YYYY"
      :disabled-date="disableEndDate"
      :disabled="
        typeof config.readonly === 'function'
          ? config.readonly(start, row, config)
          : config.readonly
      "
      @change="handleChange"
    >
    </el-date-picker>
    <el-input
      v-else
      v-model="end"
      :size="config.size || 'default'"
      :placeholder="config.placeholder || config.endPlaceHolder || '请输入'"
      :disabled="
        typeof config.readonly === 'function'
          ? config.readonly(start, row, config)
          : config.readonly
      "
      @change="handleChange"
    >
      <template
        v-if="config.suffix || config.unit"
        #suffix
      >
        <span v-if="config.unit">{{ config.unit }}</span>
        <span v-else>{{ config.suffix }}</span>
      </template>
      <template
        v-if="config.prefix"
        #prefix
      >
        <span>{{ config.prefix }}</span>
      </template>
      <template
        v-if="config.prepend"
        #prepend
      >
        <span v-if="typeof config.prepend === 'string'">
          {{ config.prepend }}
        </span>
      </template>
      <template
        v-if="config.append"
        #append
      >
        <span v-if="typeof config.append === 'string'">
          {{ config.append }}
        </span>
      </template>
    </el-input>
  </div>
</template>
<script lang="ts" setup>
import { ElSelect, ElOption, ElDatePicker, ElInput } from 'element-plus'
import { ref } from 'vue'

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps<{
  row?: any
  config: __lgsform.IRangeInput
  modelValue?: number[]
}>()
const start = ref<string | number | undefined>(
  (props.modelValue?.length && props.modelValue[0]) || undefined
)
const end = ref<string | number | undefined>(
  (props.modelValue?.length && props.modelValue[1]) || undefined
)
const handleChange = () => {
  emit('update:modelValue', [start.value, end.value])
  emit('change', [start.value, end.value], props.row, props.config)
}
const disableStartDate = (date: Date) => {
  if (end.value) {
    const year = date.getFullYear()
    return year > Number(end.value)
  }
  return false
}
const disableEndDate = date => {
  if (start.value) return date.getFullYear() < Number(start.value)
  return false
}
</script>
<style lang="scss" scoped>
.range-selector {
  width: 100%;
  display: flex;
  .separator {
    padding: 0 12px;
  }
}
</style>
