<template>
  <el-button
    v-if="typeof config?.perm === 'function' ? config.perm(row) : config?.perm"
    v-show="
      !(typeof config.hide === 'function' ? config.hide(row) : config.hide)
    "
    :loading="
      typeof config.loading === 'function'
        ? config.loading(row)
        : config.loading
    "
    :size="config.size || size || 'default'"
    :text="config.isTextBtn"
    :link="config?.link || false"
    :icon="config.svgIcon"
    :style="
      typeof config.styles === 'function'
        ? config.styles && config.styles(row)
        : config.styles
    "
    :type="type"
    :disabled="
      typeof config.disabled === 'function'
        ? config.disabled(row)
        : config.disabled
    "
    :plain="config.plain || false"
    :class="{
      'button-block': config.isBlockBtn,
      'button-notext': noContent
    }"
    @click="() => config.click && !config.items && config.click(row)"
  >
    <el-icon
      v-if="config.icon"
      :style="
        typeof config.iconStyles === 'function'
          ? config.iconStyles(row)
          : config.iconStyles
      "
      :class="{
        'button-notext': noContent
      }"
    >
      <i
        v-if="config.icon"
        :class="
          typeof config.icon === 'function' ? config.icon(row) : config.icon
        "
      ></i>
      <component
        :is="config.svgIcon"
        v-else
      ></component>
    </el-icon>
    <span v-if="!noContent">{{
      typeof config.text === 'function' ? config.text(row) : config.text
    }}</span>
  </el-button>
</template>
<script lang="ts" setup>
import { IButton, ISize } from '@/types/interfaces';
import { ElButton, ElIcon } from 'element-plus'
import { computed } from 'vue'

const props = defineProps<{
  row?: any
  config: IButton
  size?: ISize
}>()
const type = computed(() => {
  return resolveType()
})
const noContent = computed(() => {
  return !(typeof props.config.text === 'function'
    ? props.config.text(props.row)
    : props.config.text)
})
const resolveType = () => {
  const val = typeof props.config.type === 'function'
    ? props.config.type(props.row)
    : props.config.type || 'primary'
  return val === 'text' ? '' : val
}
</script>
<style scoped lang="scss">
.el-icon {
  // margin-right: 5px;
  &.button-notext {
    margin-right: 0;
  }
}

.button-block {
  padding: 8px;
  &.el-button--large {
    padding: 12px;
  }
  &.el-button--small {
    padding: 6px;
  }
}
</style>
<style lang="scss">
.el-button,
.el-button--large,
.el-button--small {
  &.button-notext {
    [class*='el-icon'] + span {
      display: none;
    }
  }
}
</style>
