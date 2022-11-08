<template>
  <el-upload
    class="deviceImportBtn"
    action="action"
    :show-file-list="false"
    :http-request="UploadFile"
  >
    <el-button>{{ config?.text || '导 入' }}</el-button>
  </el-upload>
</template>

<script lang="ts" setup>
import { IButton } from '../../../global';
import { ElUpload, ElButton } from 'element-plus'

const props = defineProps<{
  config: IButton
}>()

const UploadFile = async (res: any) => {
  console.log(res, 'UploadFileUploadFile')
  const file = res.file
  const formData = new window.FormData()
  formData.append('file', file)
  props.config.click && props.config.click(formData)
}
</script>
<style lang="scss" scoped>
.deviceImportBtn {
  margin: 0 12px;
  font-size: 16px !important;
  display: inline-block;
}
</style>
