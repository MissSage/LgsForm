<template>
  <div
    class="fieldset"
    :class="type"
  >
    <div class="fieldset-title">
      <slot>
        <span class="title">{{ title }}</span>
        <div
          v-if="titleRight?.length"
          class="right-wrapper"
        >
          <template
            v-for="(rightitem, k) in titleRight"
            :key="k"
          >
            <div :class="rightitem.className">
              <template
                v-for="(obj, z) in rightitem.items"
                :key="z"
              >
                <FormItem
                  v-if="obj.field"
                  v-model="state.titleQueryParams[obj.field]"
                  :config="obj"
                  @change="(val: any) => obj.onChange && obj.onChange(val,obj)"
                />
                <FormItem
                  v-else
                  :config="obj"
                />
              </template>
            </div>
          </template>
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { IFormItem } from '@/types';
import { reactive } from 'vue'
import FormItem from './FormItem.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    titleRight?: {
      className?: string
      items: IFormItem[]
    }[]
    titleQueryParams?: Record<string, any>
    type?: 'simple' | 'default' | 'underline'
  }>(),
  {
    title: '',
    type: 'default',
    titleRight: undefined,
    titleQueryParams: () => {
      return {}
    }
  }
)
const state = reactive<{
  titleQueryParams: Record<string, any>
}>({
  titleQueryParams: { ...(props.titleQueryParams || {}) }
})
</script>
<style lang="scss" scoped>
.fieldset {
  margin: 15px 0;
  height: 32px;
  border-bottom: 1px solid var(--el-border-color);
  .fieldset-title {
    height: 25px;
    line-height: 25px;
    position: relative;
    padding-left: 15px;
    color: #95c3f1;
    font-size: 14px;
    display: flex;
    align-items: center;
    &::before {
      content: ' ';
      position: absolute;
      height: 100%;
      width: 6px;
      background-color: #3d95ec;
      top: 0;
      left: 0;
    }
  }
  .title {
    margin-right: auto;
  }
  &.simple {
    display: flex;
    align-items: center;
    border-bottom: none;

    .fieldset-title {
      height: 1em;
      line-height: 1em;
      padding-left: 10px;
      &::before {
        width: 3px;
      }
    }
  }
  &.underline {
    .fieldset-title {
      padding-left: 0;
      &::before {
        display: none;
      }
    }
  }
}
</style>
