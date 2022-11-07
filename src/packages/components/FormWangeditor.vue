<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="height: 400px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { computed, onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { SlateElement, IEditorConfig } from '@wangeditor/editor'

type ImageElement = SlateElement & {
  src: string
  alt: string
  url: string
  href: string
}

type InsertFnType = (url: string, alt: string, href: string) => void

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  postImg:  (formdata?: any):any=>Promise<any>,
  // 菜单模式
  mode: {
    type: String,
    default: 'simple'
  }
})

const emits = defineEmits(['update:modelValue'])

// 内容 HTML
const valueHtml = computed({
  get: () => props.modelValue,
  set: nv => {
    console.log(nv)
    emits('update:modelValue', nv)
  }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig = {}

// 提示信息

const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {},
  placeholder: '请输入内容...'
}

if (editorConfig.MENU_CONF) {
  editorConfig.MENU_CONF['uploadImage'] = {
    async customUpload(file: File, insertFn: InsertFnType) {
      console.log(file)
      const data = new FormData()
      data.append('file', file) // file 即选中的文件
      props.postImg(data).then(res => {
        insertFn(res.data, res.data, res.data)
      })
    }
  }
}

// 自定义校验图片
function customCheckImageFn(
  src: string,
  alt: string,
  url: string
): boolean | undefined | string {
  if (!src) {
    return
  }
  if (src.indexOf('http') !== 0) {
    return '图片网址必须以 http/https 开头'
  }
  console.log(alt, url)
  return true
}

// 转换图片链接
function customParseImageSrc(src: string): string {
  if (src.indexOf('http') !== 0) {
    return `http://${src}`
  }
  return src
}

// 插入图片
if (editorConfig.MENU_CONF) {
  editorConfig.MENU_CONF['insertImage'] = {
    onInsertedImage(imageNode: ImageElement | null) {
      if (imageNode == null) return
      const { src, alt, url, href } = imageNode
      console.log('inserted image', src, alt, url, href)
    },
    checkImage: customCheckImageFn, // 也支持 async 函数
    parseImageSrc: customParseImageSrc // 也支持 async 函数
  }
}
// 编辑图片
if (editorConfig.MENU_CONF) {
  editorConfig.MENU_CONF['editImage'] = {
    onUpdatedImage(imageNode: ImageElement | null) {
      if (imageNode == null) return
      const { src, alt, url } = imageNode
      console.log('updated image', src, alt, url)
    },
    checkImage: customCheckImageFn, // 也支持 async 函数
    parseImageSrc: customParseImageSrc // 也支持 async 函数
  }
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = editor => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>
