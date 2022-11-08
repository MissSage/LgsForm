<template>
  <div
    v-if="config?.options?.length"
    class="tag-group"
  >
    <div
      v-for="(item, i) in config.options"
      :key="i"
      class="tag"
      :class="[config.className, 'tag__' + (config.size || size)]"
      :style="{
        width: item.width || config.width || '',
        backgroundColor:
          item.value === modelValue
            ? config.activeColor || '#3e8ef7'
            : config.color || state.defaultBgColor,
        border: config.border || '1px solid ' + state.defaultBorderColor
      }"
      @click="() => handleClick(item)"
    >
      <span
        v-if="item.data?.prefix"
        class="tag-before"
        :style="item.data?.prefixStyle"
      >
        {{ item.data?.prefix }}
      </span>
      <span
        class="tag-text"
        :style="
          item.value === modelValue ? 'color:' + config.activeTextColor : ''
        "
      >
        {{ item.label }}
      </span>
      <span
        v-if="item.data?.suffix"
        class="tag-after"
        :style="item.data?.suffixStyle"
      >
        {{ item.data?.suffix }}
      </span>
    </div>
    <div
      v-for="(btn, i) in config.btns"
      :key="i"
      class="tag-btn"
    >
      <Button
        class="tag-add-btn"
        :config="btn"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISize, ITagGroup, NormalOption } from '@/types';
import { reactive, watch } from 'vue'
import Button from './Button.vue'

const props = withDefaults(
  defineProps<{
    config: ITagGroup
    modelValue?: string | number
    size: ISize
    theme: 'dark' | 'darkblue'
  }>(),
  {
    modelValue: '',
    cancelable: false,
    size: '',
    theme: undefined
  }
)
watch(
  () => props.theme,
  (newVal?: string) => {
    state.defaultBgColor = newVal === 'dark' || newVal === 'darkblue' ? '#222536' : '#fff'
    state.defaultBorderColor = newVal === 'dark' || newVal === 'darkblue' ? '#373858' : '#dcdfe6'
  }
)
const state = reactive<{
  defaultBgColor: string
  defaultBorderColor: string
}>({
  defaultBgColor:
    props.theme === 'dark' || props.theme === 'darkblue' ? '#222536' : '#fff',
  defaultBorderColor:
    props.theme === 'dark' || props.theme === 'darkblue' ? '#373858' : '#dcdfe6'
})
const emit = defineEmits(['change', 'update:model-value'])
const handleClick = (item: NormalOption) => {
  const isCancel = props.config?.cancelable && item.value === props.modelValue

  emit('update:model-value', isCancel ? undefined : item.value)
  emit('change', isCancel ? undefined : item.value)
}
</script>

<style lang="scss" scoped>
.tag-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width: 100%;
  .tag {
    text-align: center;
    border-radius: 0;
    padding: 0 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
    &-text {
      font-size: 14px;
      word-break: keep-all;
    }
    &__small {
      height: 24px;
      line-height: 24px;
      padding: 0 8px;
    }
    &__default {
      height: 32px;
      line-height: 32px;
    }
    &__large {
      height: 40px;
      line-height: 40px;
    }
  }
  .tag-btn {
    margin-left: 12px;
  }
}
.tag-before,
.tag-after {
  font-size: 12px;
  line-height: 14px;
  text-align: center;
}
</style>
