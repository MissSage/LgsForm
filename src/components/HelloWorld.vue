<template>
  <Button :config="config"></Button>
</template>
<script lang="ts" setup>
import Button from './Button.vue'
const config: IButton = {
  text: '组件',
  perm: true
}

</script>