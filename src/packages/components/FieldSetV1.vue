<template>
  <div
    class="el-descriptions"
    :class="type"
  >
    <div class="el-descriptions__header">
      <div class="el-descriptions__title">
        <div class="el-descriptions__title_box">
          <h4 class="el-descriptions__title_h4">
            <slot>
              <span>{{ title }}</span>
            </slot>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FieldSet',
  props: {
    type: {
      type: String as PropType<'default' | 'simple' | 'underline'>,
      default: 'default'
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    // codes here
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-descriptions),
.el-descriptions {
  margin: 32px 0 15px 0;
  &.simple {
    .el-descriptions__title_box {
      border-bottom: none;
    }
    .el-descriptions__title_h4 {
      height: 1em;
      line-height: 1em;
      &::before {
        width: 3px;
        left: -10px;
      }
    }
  }
  &.underline {
    .el-descriptions__title_box {
    }
    .el-descriptions__title_h4 {
      margin: 0;
      height: 1em;
      line-height: 1em;
      &::before {
        display: none;
      }
    }
  }
}
.el-descriptions__header {
  margin-bottom: 0;
  margin-top: 15px;
  height: 32px;
  margin-bottom: 15px;
}
.el-descriptions__title {
  width: 100%;
  height: 100%;
}

.el-descriptions__title_box {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--el-border-color);
}

.el-descriptions__title_h4 {
  line-height: 25px;
  height: 25px;
  position: relative;
  margin: 0 0 0 15px;
  color: #95c3f1;
  font-size: 14px;
  &::before {
    content: ' ';
    position: absolute;
    height: 100%;
    width: 6px;
    background-color: #3d95ec;
    top: 0;
    left: -15px;
  }
}
.el-descriptions__title_right {
  position: absolute;
  right: 0;
  top: 0;
  height: 25px;
}
</style>
