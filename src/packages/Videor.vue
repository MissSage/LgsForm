<template>
  <video
    :width="width||320"
    :height="height||180"
    controls
    :src="url"
  >
  </video>
</template>
<script lang="ts" setup>
defineProps<{
  url:string
  width?: number
  height?: number
}>()
</script>
<style lang="scss" scoped></style>
