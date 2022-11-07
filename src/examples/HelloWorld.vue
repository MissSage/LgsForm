<template>
  <Button :config="config"></Button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Button from '../packages/Button/Button.vue'
const a = ref<InstanceType<typeof Button>>()
const config: IButton = {
  text: '组件',
  perm: true
}

</script>