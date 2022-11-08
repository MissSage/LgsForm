<template>
  <Form ref="refForm" :config="FormConfig" />
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
// import Form from '../packages/es/Form'
import {Form } from '../../dist/lgsform.js'
import { IFormConfig } from '@/types';
const a = ref<InstanceType<typeof Form>>()
const FormConfig = reactive<IFormConfig>({
  group: [
    {
      fields: [
        {type: 'input',field: 'aaa',label: 'bbb',}
      ]
    }
  ]
})

</script>