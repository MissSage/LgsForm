<template>
  <div class="audio-wrapper">
    <el-icon
      v-if="state.paused"
      class="voice-icon"
    >
      <VideoPlay @click="togglePlay" />
    </el-icon>
    <el-icon
      v-else
      class="voice-icon"
    >
      <VideoPause @click="togglePlay" />
    </el-icon>
    <span
      v-if="showUrl"
      class="voice-url"
      @click="() => download && downloadUrl(url)"
    >{{ url }}</span>
    <audio
      ref="refAudio"
      :class="size || 'default'"
      :src="url"
    ></audio>
  </div>
</template>
<script lang="ts" setup>
import { VideoPlay, VideoPause } from '@element-plus/icons'
import { ElIcon } from 'element-plus'
import { ref, reactive } from 'vue'
import { downloadUrl } from '@/utils/fileHelper'

const refAudio = ref<HTMLAudioElement>()
defineProps<{
  url?: string
  size?: ISize
  showUrl?: boolean
  download?: boolean
}>()
const state = reactive<{
  paused: boolean
}>({
  paused: true
})
const togglePlay = () => {
  state.paused ? refAudio.value?.play() : refAudio.value?.pause()
  state.paused = !state.paused
}
</script>
<style lang="scss" scoped>
.audio-wrapper {
  display: flex;
  align-items: center;
}
.voice-icon {
  cursor: pointer;
  margin-right: 8px;
}
.voice-url {
  text-decoration: underline;
  color: cadetblue;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
