<template>
  <el-upload
    class="avatar-uploader"
    :size="props.size"
    :action="props.url"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :headers="props.headers"
  >
    <img
      v-if="imageUrl"
      :src="imageUrl"
      class="avatar"
    />
    <el-icon
      v-else
      class="avatar-uploader-icon"
    >
      <Plus />
    </el-icon>
    <template
      v-if="tips"
      #tip
    >
      <div class="el-upload__tip">
        {{ tips }}
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { ElIcon, ElUpload, UploadProps } from 'element-plus'
import { ref, watch } from 'vue'
import { SLMessage } from '@/utils/Message'
import { ISize } from '@/types/interfaces';

const props = defineProps<{
  modelValue?: string
  disabled?: boolean
  url?: string
  size?: ISize
  tips?: string
  headers?: any
}>()
const emit = defineEmits(['update:modelValue', 'change'])
const imageUrl = ref(props.modelValue)
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  console.log(response, uploadFile)
  if (response) {
    imageUrl.value = response
    // uploadFile.raw && (imageUrl.value = URL.createObjectURL(uploadFile.raw))
    emit('update:modelValue', imageUrl.value)
    emit('change', imageUrl.value)
  }
}
const fileTypes = ['image/jpeg', 'image/png']
const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
  if (fileTypes.indexOf(rawFile.type) === -1) {
    SLMessage.error('请使用符合JPEG/PNG格式的图片')
    return false
  }
  if (rawFile.size / 1024 / 1024 > 2) {
    SLMessage.error('照片大小不能超过2M')
    return false
  }
  return true
}
watch(
  () => props.modelValue,
  (newVal: any) => {
    imageUrl.value = newVal
  }
)
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 136px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 136px;
  text-align: center;
}
</style>
