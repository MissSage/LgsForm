<!-- eslint-disable vue/no-mutating-props -->
<template>
  <FormItem
    v-if="config.formItemConfig"
    v-model="row[config.prop!]"
    :config="config.formItemConfig"
    :row="row"
    @change="
      val =>
        config.formItemConfig?.onChange &&
        config.formItemConfig?.onChange(val, row, config.formItemConfig)
    "
  ></FormItem>
  <template
    v-for="(item,key) in resolveElImageData(row[config.prop!], true)"
    v-else-if="config.image"
    :key="key"
  >
    <el-image
      style="width: 100px; height: 100px; margin-top: 5px; margin-right: 5px"
      :style="config.cellStyle"
      :src="item"
      :preview-src-list="
        resolveElImageData(row[config.prop!], true)
      "
    />
  </template>
  <template
    v-for="(item,key1) in resolveElImageData(row[config.prop!], true)"
    v-else-if="config.audio"
    :key="key1"
  >
    <audio
      :src="item"
      controls="true"
      style="margin-right: 5px"
    >
      您的浏览器不支持 audio 标签,无法播放
    </audio>
  </template>
  <template
    v-for="(item,key2) in resolveElImageData(row[config.prop!], true)"
    v-else-if="config.video"
    :key="key2"
  >
    <video
      width="200"
      height="160"
      controls
      style="margin-right: 5px"
    >
      <source
        :src="item"
        type="video/mp4"
      />
      您的浏览器不支持 video 标签。
    </video>
  </template>
  <Tag
    v-else-if="config.tag"
    :color="config.tagColor"
    :row="row"
    :value="(config.prop && row && row[config.prop])"
    class="tag-flexable"
  >
    <!-- 表格项 图标 -->
    <el-icon
      v-if="config.icon || config.svgIcon || config.symbolIcon"
      :style="
        typeof config.iconStyle === 'function'
          ? config.iconStyle(row, row[config.prop!])
          : config.iconStyle
      "
    >
      <i
        v-if="config.icon"
        :class="config.icon"
      ></i>
      <svg
        v-else-if="config.symbolIcon"
        class="symbolIcon"
        aria-hidden="true"
      >
        <use :xlink:href="config.symbolIcon"></use>
      </svg>
      <component
        :is="config.svgIcon"
        v-else
      ></component>
    </el-icon>
    <span>
      {{
        config.formatter
          ? config.formatter(row, row[config.prop!], config.prop!)
          : row[config.prop!]
      }}
    </span>
  </Tag>
  <Voicer
    v-else-if="config.isVoice"
    :download="config.download"
    :show-url="config.showUrl"
    :url="row[config.prop!]"
  ></Voicer>
  <template v-else>
    <!-- 表格项 图标 -->
    <el-icon
      v-if="config.icon || config.svgIcon || config.symbolIcon"
      :style="
        typeof config.iconStyle === 'function'
          ? config.iconStyle(row, row[config.prop!])
          : config.iconStyle
      "
    >
      <i
        v-if="config.icon"
        :class="config.icon"
      ></i>
      <svg
        v-else-if="config.symbolIcon"
        class="symbolIcon"
        aria-hidden="true"
      >
        <use :xlink:href="config.symbolIcon"></use>
      </svg>
      <component
        :is="config.svgIcon"
        v-else
      ></component>
    </el-icon>
    <span
      class="table-cell"
      :style="
        typeof config.cellStyle === 'function'
          ? config.cellStyle(
            row,
            row[config.prop!],
            config.prop
          )
          : config.cellStyle
      "
      :class="config.className"
      @click="config.handleClick && config.handleClick(row)"
    >
      {{
        (config.formatter &&
          config.formatter(row, row[config.prop!], config.prop!)) ||
          row[config.prop!]
      }}
    </span>
  </template>
</template>
<script lang="ts" setup>
import { resolveElImageData } from '@/utils/GlobalHelper'

defineProps<{
  config: __lgsform.IAttrTableRow
  row: any
}>()

</script>

<style lang="scss" scoped></style>
