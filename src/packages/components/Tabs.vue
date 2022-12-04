<template>
  <div v-if="config?.tabs?.length" class="tabs-wrapper">
    <el-tabs v-model="state.activeName" :type="config.tabType === 'border-card' ? 'border-card' : 'card'" :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.activeName, row, config)
        : config.readonly
    " :size="config?.size || size || 'default'" :closable="config.closable" :class="[
  config.className,
  config.tabType || 'simple',
  config.btns?.length ? 'hasright' : '',
  config.theme
]" :stretch="config.stretch" @tab-click="config?.handleTabClick" @tab-remove="removeTab">
      <el-tab-pane v-for="item in config.tabs" :key="item.value" :label="item.label" :name="item.value"
        :disabled="item.disabled">
      </el-tab-pane>
    </el-tabs>
    <div v-if="config?.btns?.length" class="top-right-wrapper">
      <Button v-for="(item, i) in config?.btns" :key="i" :config="item"></Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ITabs, ISize } from '@/types/interfaces';
import { ElTabs, ElTabPane } from 'element-plus'
import { reactive, watch } from 'vue'
import Button from './Button.vue'

const props = defineProps<{
  modelValue?: string | number
  config?: ITabs
  size?: ISize
  row?: Record<string, any>
}>()
const emit = defineEmits(['change', 'update:model-value'])

const state = reactive<{
  activeName?: string | number
}>({
  activeName: props.modelValue
})
const removeTab = (targetName: string | number) => {
  if (!targetName) return
  // 当删除的是当前选中的tag时，自动选择下一个或者上一个
  let nextTab: any
  if (props.config?.selectNextAfterRemove !== false) {
    if (state.activeName === targetName) {
      const tabs = props.config?.tabs || []
      const targetIndex = tabs.findIndex(item => item.value === targetName)
      if (targetIndex !== -1) {
        nextTab = tabs[targetIndex + 1] || tabs[targetIndex - 1]
        // state.activeName = nextTab?.name
      }
      // tabs.forEach((tab, index) => {
      //   if (tab.name === targetName) {
      //     nextTab = tabs[index + 1] || tabs[index - 1]
      //     if (nextTab) {
      //       state.activeName = nextTab.name
      //     }
      //   }
      // })
    }
  }
  props.config?.handleTabRemove
    && props.config.handleTabRemove(targetName, nextTab?.name)
}
watch(
  () => state.activeName,
  (newVal: any) => {
    emit('update:model-value', newVal)
    emit('change', newVal)
  }
)
watch(
  () => props.modelValue,
  newVal => (state.activeName = newVal)
)
</script>
<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  position: relative;

  .top-right-wrapper {
    position: absolute;
    right: 0;
    top: 0;
  }
}

:deep(.el-tabs.el-tabs--card) {
  .el-tabs__header {
    margin: 0;
  }

  &.simple {
    .el-tabs__item {
      border: none;

      &.is-active,
      &:hover,
      &:focus {
        border-bottom: 2px solid var(--el-color-primary);
        color: var(--el-color-primary);
      }
    }

    &>.el-tabs__header {
      .el-tabs__nav {
        border: none;
      }
    }
  }

  &.inset {
    .el-tabs__item {
      border: none;

      &.is-active,
      &:hover,
      &:focus {
        background-color: var(--el-bg-color);
        color: var(--el-color-primary);
      }
    }

    // &.el-tabs--top {
    //   .el-tabs__header.is-top {
    //     .el-tabs__nav-wrap.is-scrollable {
    //       margin-right: 120px;
    //     }
    //   }
    // }
    &.dark {
      &>.el-tabs__header {
        background-color: #32364b;

        .el-tabs__nav {
          border: none;
        }
      }
    }

    &>.el-tabs__header {
      background-color: #e2e2e2;

      .el-tabs__nav {
        border: none;
      }
    }
  }
}

.darkblue {
  &.el-tabs {
    background-color: transparent;

    :deep(.el-tabs__header) {
      background-color: transparent;

      .el-tabs__item {
        &.is-active {
          background-color: rgba(21, 45, 68, 1);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-tabs.hasright {
  &.el-tabs--top {
    .el-tabs__header.is-top {
      .el-tabs__nav-wrap.is-scrollable {
        margin-right: 120px;
      }
    }
  }
}
</style>
