<template>
  <div class="system-add-menu-container">
    <el-dialog
      v-model="state.visible"
      :title="config.title"
      :width="config.dialogWidth || '60%'"
      :fullscreen="config.fullscreen"
      :draggable="config.draggable"
      :top="config.top"
      :modal="config.model"
      :close-on-click-modal="config.closeOnClickModal === true"
      :close-on-press-escape="config.closeOnPressEscape === true"
      :show-close="config.showClose"
      :destroy-on-close="config.desTroyOnClose !== false"
    >
      <slot name="default">
        <Form
          id="print"
          ref="refForm"
          :config="config"
        />
      </slot>

      <template
        v-if="config.cancel !== false || config.submit"
        #footer
      >
        <span class="dialog-footer">
          <template v-if="config.btns">
            <Button
              v-for="(item, i) in config.btns"
              :key="i"
              :config="item"
              :size="item?.size || 'default'"
            ></Button>
          </template>
          <el-button
            v-if="config?.print || false"
            v-print="config?.printConfigure || printConfigure"
            type="primary"
            size="default"
          >
            打 印</el-button>
          <el-button
            v-if="config.cancel !== false"
            size="default"
            @click="closeDialog"
          >关 闭</el-button>
          <el-button
            v-if="config.submit"
            type="primary"
            size="default"
            :loading="config.submitting"
            @click="Submit(false)"
          >
            确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElDialog, ElButton } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import Button from './Button.vue'
import Form from './Form.vue'

const props = defineProps<{
  config: IDialogFormConfig
}>()
const emit = defineEmits(['close'])
const refForm = ref<InstanceType<typeof Form>>()
const state = reactive<{
  visible: boolean
}>({
  visible: false
})

// 打开弹窗
const openDialog = () => {
  state.visible = true
}
// 关闭弹窗
const closeDialog = () => {
  state.visible = false
  emit('close')
}
const resetForm = () => {
  refForm.value?.refForm?.resetFields()
}
// 保存 save
const Submit = (status?: boolean) => {
  // 插槽下处理
  if (refForm.value === undefined && props.config.submit) {
    props.config?.submit(false)
  } else {
    refForm.value?.Submit(status)
  }
}

// 打印配置
const printConfigure = reactive<any>({
  id: 'print',
  popTitle: '配置页眉标题', // 打印配置页上方的标题
  extraHead: '打印', // 最上方的头部文字，附加在head标签上的额外标签，使用逗号分割
  preview: true, // 是否启动预览模式，默认是false
  previewTitle: '预览的标题', // 打印预览的标题
  previewPrintBtnLabel: '预览结束，开始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
  zIndex: 20002, // 预览窗口的z-index，默认是20002，最好比默认值更高
  previewBeforeOpenCallback() {
    console.log('正在加载预览窗口！')
  }, // 预览窗口打开之前的callback
  previewOpenCallback() {
    console.log('已经加载完预览窗口，预览打开了！')
  }, // 预览窗口打开时的callback
  beforeOpenCallback() {
    console.log('开始打印之前！')
  }, // 开始打印之前的callback
  openCallback() {
    console.log('执行打印了！')
  }, // 调用打印时的callback
  closeCallback() {
    console.log('关闭了打印工具！')
  }, // 关闭打印的callback(无法区分确认or取消)
  clickMounted() {
    console.log('点击v-print绑定的按钮了！')
  },
  // url: 'http://localhost:8080/', // 打印指定的URL，确保同源策略相同
  // asyncUrl (reslove) {
  //   setTimeout(() => {
  //     reslove('http://localhost:8080/')
  //   }, 2000)
  // },
  standard: '',
  extarCss: 'http://unpkg.com/element-plus/dist/index.css'
})

watch(
  () => state.visible,
  (newVal: boolean) => {
    if (newVal) refForm.value?.resetForm()
  }
)
defineExpose({
  refForm,
  Submit,
  closeDialog,
  openDialog,
  resetForm
})
</script>
<style lang="scss"></style>
