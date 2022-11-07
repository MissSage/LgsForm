<template>
  <div class="demo-image__preview">
    <el-image
      v-for="(img, i) in imgUrls"
      :key="i"
      style="width: 100px; height: 100px"
      :src="img"
      class="image"
      :preview-src-list="imgUrls"
      :initial-index="i"
      fit="cover"
    />
  </div>
</template>
<script lang="ts" setup>
import { ElImage } from 'element-plus'
import { computed } from 'vue'
import { fileStrToArr } from '@/utils/GlobalHelper'

const props = defineProps<{
  /**
   * 多个图片可以用逗号分隔或数组字符串序列化后的字符串
   * 'url1,url2'或JSON.stringify([url1,url2])
   */
  url: string
  initialIndex?: number
}>()
const imgUrls = computed(() => {
  return fileStrToArr(props.url)
})
</script>
<style lang="scss" scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.image {
  margin: 0;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
