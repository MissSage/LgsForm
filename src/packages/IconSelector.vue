<template>
  <div class="icon-selector">
    <el-popover
      v-model:visible="fontIconVisible"
      :width="fontIconWidth"
      trigger="click"
      popper-class="el-select__popper"
    >
      <template #reference>
        <el-input
          ref="inputWidthRef"
          v-model="fontIconSearch"
          :placeholder="fontIconPlaceholder"
          :clearable="clearable"
          :disabled="disabled"
          :size="size"
          @clear="onClearFontIcon"
          @click="onIconFocus"
          @focus="onIconFocus"
          @blur="onIconBlur"
        >
          <template #prepend>
            <i :class="fontIconPrefix"></i>
          </template>
        </el-input>
      </template>
      <div
        class="icon-selector-warp"
      >
        <div class="icon-selector-warp-title flex">
          <div class="flex-auto">
            {{ title }}
          </div>
          <div
            v-if="defaultType === 'all'"
            class="icon-selector-warp-title-tab"
          >
            <span
              :class="{ 'span-active': fontIconType === 'ali' }"
              class="ml10 pointer"
              title="iconfont 图标"
              @click="onIconChange('ali')"
            >ali</span>
            <span
              :class="{ 'span-active': fontIconType === 'ele' }"
              class="ml10 pointer"
              title="elementPlus 图标"
              @click="onIconChange('ele')"
            >ele</span>
            <span
              :class="{ 'span-active': fontIconType === 'awe' }"
              class="ml10 pointer"
              title="fontawesome 图标"
              @click="onIconChange('awe')"
            >awe</span>
          </div>
        </div>
        <div class="icon-selector-warp-row">
          <el-scrollbar ref="selectorScrollbarRef">
            <div class="icon-selector-wrap-row__inner">
              <el-row
                v-if="fontIconSheetsFilterList.length > 0"
                :gutter="10"
              >
                <el-col
                  v-for="(v, k) in fontIconSheetsFilterList"
                  :key="k"
                  :xs="6"
                  :sm="4"
                  :md="4"
                  :lg="4"
                  :xl="4"
                  @click="onColClick(v)"
                >
                  <div
                    class="icon-selector-warp-item pointer"
                    :class="{ 'icon-selector-active': fontIconPrefix === v }"
                  >
                    <div class="flex-margin">
                      <div class="icon-selector-warp-item-value">
                        <i :class="v"></i>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-empty
                v-if="fontIconSheetsFilterList.length <= 0"
                :image-size="100"
                :description="placeholder"
              ></el-empty>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import {
  ref,
  toRefs,
  reactive,
  onMounted,
  nextTick,
  computed,
  watch,
  defineComponent,
  PropType,
  onBeforeUnmount
} from 'vue'
import IconFont from '@/assets/icons/iconfont/iconfont.json'

export default defineComponent({
  // FIX ME
  // 1 图标悬浮显示名称
  // 2 图标按中文搜索

  name: 'IconSelector',
  props: {
    // 输入框占位文本
    placeholder: {
      type: String,
      default: '请输入内容搜索图标或者选择图标'
    },
    // 输入框占位文本
    size: {
      type: String as PropType<ISize>,
      default: 'default'
    },
    // 弹窗标题
    title: {
      type: String,
      default: '请选择图标'
    },
    // icon 图标类型
    defaultType: {
      type: String,
      default: 'ali'
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'change', 'clear'],
  setup(props, { emit }) {
    const inputWidthRef = ref()
    const selectorScrollbarRef = ref()
    const state = reactive<{
      fontIconPrefix: string,
      fontIconVisible: boolean,
      fontIconWidth: number,
      fontIconSearch: string,
      fontIconTabsIndex: number,
      fontIconSheetsList: any[],
      fontIconPlaceholder: string,
      fontIconType: string,
      fontIconShow: boolean
    }>({
      fontIconPrefix: '',
      fontIconVisible: false,
      fontIconWidth: 0,
      fontIconSearch: '',
      fontIconTabsIndex: 0,
      fontIconSheetsList: [],
      fontIconPlaceholder: '',
      fontIconType: 'ali',
      fontIconShow: true
    })
    // 处理 input 获取焦点时，modelValue 有值时，改变 input 的 placeholder 值
    const onIconFocus = () => {
      state.fontIconVisible = true
      if (!props.modelValue) return false
      state.fontIconSearch = ''
      state.fontIconPlaceholder = props.modelValue
    }
    // 处理 input 失去焦点时，为空将清空 input 值，为点击选中图标时，将取原先值
    const onIconBlur = () => {
      state.fontIconVisible = false
      const icon = state.fontIconSheetsList.filter(
        (icon: string) => icon === state.fontIconSearch
      )
      if (icon.length <= 0) state.fontIconSearch = ''
    }
    // 处理 icon 双向绑定数值回显
    const initModeValueEcho = () => {
      if (props.modelValue === '') return false
      state.fontIconPlaceholder = props.modelValue || ''
      state.fontIconPrefix = props.modelValue || ''
    }
    // 图标搜索及图标数据显示
    const fontIconSheetsFilterList = computed(() => {
      if (!state.fontIconSearch) return state.fontIconSheetsList
      const search = state.fontIconSearch.trim().toLowerCase()
      return state.fontIconSheetsList.filter((item: any) => {
        if (item.toLowerCase().indexOf(search) !== -1) return item
      })
    })
    // 获取 input 的宽度
    const getInputWidth = () => {
      nextTick(() => {
        state.fontIconWidth = inputWidthRef.value.$el.offsetWidth
      })
    }
    // 初始化数据
    const initFontIconData = async (type: string) => {
      state.fontIconSheetsList = []
      if (type === 'ali') {
        state.fontIconSheetsList = IconFont?.glyphs?.map(i => `iconfont icon-${i.font_class}`) || []
        // await initIconfont.ali().then((res: any) => {
        //   // 阿里字体图标使用 `iconfont xxx`
        //   state.fontIconSheetsList = res.map((i: string) => `iconfont ${i}`)
        // })
      }
      //  else if (type === 'ele') {
      //   await initIconfont.ele().then((res: any) => {
      //     state.fontIconSheetsList = res
      //   })
      // } else if (type === 'awe') {
      //   await initIconfont.awe().then((res: any) => {
      //     // fontawesome字体图标使用 `fa xxx`
      //     state.fontIconSheetsList = res.map((i: string) => `fa ${i}`)
      //   })
      // }
      // 初始化 input 的 placeholder
      // 参考（单项数据流）：https://cn.vuejs.org/v2/guide/components-props.html?#%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81
      state.fontIconPlaceholder = props.placeholder
      // 初始化双向绑定回显
      initModeValueEcho()
      // 切换时，滚动条置顶。感兴趣可以使用 keep-alive <component :is="xxx"/> 进行缓存
      selectorScrollbarRef.value.wrap$.scrollTop = 0
    }
    // 图标点击切换
    const onIconChange = (type: string) => {
      state.fontIconType = type
      initFontIconData(type)
    }
    // 获取当前点击的 icon 图标
    const onColClick = (v: any) => {
      state.fontIconPlaceholder = v
      state.fontIconVisible = false
      state.fontIconPrefix = v
      emit('change', state.fontIconPrefix)
      emit('update:modelValue', state.fontIconPrefix)
    }
    // 清空当前点击的 icon 图标
    const onClearFontIcon = () => {
      state.fontIconPrefix = ''
      emit('clear', state.fontIconPrefix)
      emit('update:modelValue', state.fontIconPrefix)
    }
    // 页面加载时
    onMounted(() => {
      // 判断默认进来是什么类型图标，进行 tab 回显
      if (props.defaultType === 'all') {
        if (props.modelValue?.indexOf('iconfont') !== -1) onIconChange('ali')
        else if (props.modelValue?.indexOf('ele-') !== -1) onIconChange('ele')
        else if (props.modelValue?.indexOf('fa') !== -1) onIconChange('awe')
        else onIconChange('ali')
      } else {
        onIconChange(props.defaultType)
      }
      getInputWidth()
      window.addEventListener('resize', getInputWidth)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', getInputWidth)
    })
    // 监听双向绑定 modelValue 的变化
    watch(
      () => props.modelValue,
      () => {
        initModeValueEcho()
      }
    )
    return {
      inputWidthRef,
      selectorScrollbarRef,
      fontIconSheetsFilterList,
      onColClick,
      onIconChange,
      onClearFontIcon,
      onIconFocus,
      onIconBlur,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss">
.flex {
  display: flex;
}
.ml10 {
  margin-left: 10px;
}
.icon-selector-warp-title {
  justify-content: space-between;
}
.icon-selector-warp-row {
  height: 150px;
}
.icon-selector-wrap-row__inner {
  padding: 5px;
}
.icon-selector-warp-item-value {
  text-align: center;
}
.pointer {
  cursor: pointer;
}
.span-active {
  color: var(--el-color-primary);
}
</style>
