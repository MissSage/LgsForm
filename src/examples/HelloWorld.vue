<template>
  <Button :config="config"></Button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { IButton } from '../../lgsform';
import Button from '../packages/Button.vue'
const a = ref<InstanceType<typeof Button>>()
const config: IButton = {
  text: '组件',
  perm: true
}

</script>