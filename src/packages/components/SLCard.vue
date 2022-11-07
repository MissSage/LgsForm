<template>
  <div
    class="sl-card"
    :class="{ hastitle: !!title, theme }"
    :style="height ? 'height:' + height + 'px' : ''"
  >
    <div
      v-if="title"
      class="sl-card-title"
    >
      <slot name="title">
        <span class="title">{{ typeof title === 'string' ? title : '' }}</span>
      </slot>
      <slot name="query"></slot>

      <slot name="right"></slot>
    </div>
    <div
      class="sl-card-content"
      :class="{ 'overlay-y': overlay }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup name="SLCard">

defineProps<{
  overlay?: boolean
  title?: any
  height?: number
  /**
   * default light
   */
  theme?: 'dark'|'darkblue'
}>()
</script>

<style lang="scss" scoped>
.sl-card {
  width: 100%;
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
  &.dark {
    background-color: #222536;
    box-shadow: var(--el-box-shadow-light);
  }
  .sl-card-content {
    height: 100%;
  }
  // 有标题的块
  &.hastitle {
    padding: 50px 8px 8px 8px;

    .sl-card-title {
      color: #a0a6c5;
      font-size: 18px;
      height: 50px;
      margin-top: -50px;
      display: flex;
      align-content: center;
      align-items: center;
      .title {
        margin-right: auto;
      }
    }
  }
}
.overlay-y {
  padding-right: 0;
}
</style>
