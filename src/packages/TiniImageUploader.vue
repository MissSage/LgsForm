<template>
  <div
    class="tiny-image-uploader"
    :class="'tiny-image-uploader-' + (config.size || size || 'default')"
  >
    <el-image
      :src="modelValue || ''"
      :fit="'contain'"
      class="timy-image-file"
      :preview-src-list="[modelValue || '']"
    >
      <template #error>
        <div class="image-slot">
          <el-icon>
            <Picture />
          </el-icon>
        </div>
      </template>
    </el-image>
    <el-upload
      :size="config.size || size"
      :action="state.imgActionUrl"
      :show-file-list="false"
      :disabled="typeof config.readonly === 'function' ? config.readonly(modelValue, undefined, config) : config.readonly"
      :auto-upload="true"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :headers="{ 'X-Authorization': 'Bearer ' + store.user.token }"
    >
      <el-button type="primary">
        {{ config.btnText || '点击选择文件' }}
      </el-button>
    </el-upload>
    <Button
      v-for="(item, i) in config.extraBtns"
      :key="i"
      :config="item"
      :row="{ value: modelValue, config: config }"
      :size="config.size || size"
      class="tiny-image-uploader-button-extra"
    ></Button>
  </div>
</template>

<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'
import { Picture } from '@element-plus/icons'
import { reactive } from 'vue'
import store from '@/store'
import { SLMessage } from '@/utils/Message'
import Button from './Button.vue'

const props = defineProps<{
  modelValue?: string
  config: ITinyImageUploader
  size?: ISize
}>()
const emit = defineEmits(['change', 'update:model-value', 'handleSuccess', 'handleDelete'])
const state = reactive<{
  fileList: UploadUserFile[]
  imgActionUrl: string
}>({
  fileList: [],
  imgActionUrl: props.config.url
    ? props.config.url
    : store.app.actionUrl + 'file/api/upload/image'
})
const handleSuccess = response => {
  emitValue(response || response?.url)
  emit('handleSuccess', response || response?.url)
}
const emitValue = (response: any) => {
  emit('update:model-value', response)
}
const beforeUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'

  if (!isJPG) {
    SLMessage.error('只能上传jpeg或png格式的图片！')
  }
  return isJPG
}
</script>

<style lang="scss" scoped>
.tiny-image-uploader {
  display: flex;
  align-items: center;

  &-small {
    line-height: 24px;

    .timy-image-file {
      width: 24px;
      height: 24px;
      font-size: 24px;
    }
  }

  &-large {
    line-height: 40px;

    .timy-image-file {
      width: 40px;
      height: 40px;
      font-size: 40px;
    }
  }

  &-button-extra {
    margin-left: 8px;
  }
}

.timy-image-file {
  width: 32px;
  height: 32px;
  font-size: 32px;
  margin-right: 12px;
}
</style>
