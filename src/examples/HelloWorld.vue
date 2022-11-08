<template>
  <Form ref="refForm" :config="FormConfig" />
  <FormTable :config="TableConfig"></FormTable>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
// import Form from '../packages/es/Form'
import FormTable from "../packages/components/FormTable.vue";
import Form from "../packages/components/Form.vue";
import { IFormConfig, ITable } from "../../global";
const FormConfig = reactive<IFormConfig>({
  group: [
    {
      fields: [{ type: "input", field: "aaa", label: "bbb" }],
    },
  ],
});
const TableConfig = reactive<ITable>({
  dataList: [{ index: "111" }],
  pagination: {
    hide: true,
  },
  columns: [{ label: "序号", prop: "index" }],
});
</script>
