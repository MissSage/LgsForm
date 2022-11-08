<template>
  <el-form
    ref="refForm"
    :inline="true"
    class="inline-form"
    :model="state.dataForm"
    :size="config.size || 'default'"
    :label-position="config.labelPosition || 'left'"
    :label-width="config.labelWidth || '100px'"
    :validate-on-rule-change="false"
    @submit.prevent
  >
    <template
      v-for="(group, i) in config.group"
      :key="i"
    >
      <div
        v-if="!group.hidden"
        :style="group.styles"
        class="inline-group"
      >
        <FieldSet
          v-if="group.fieldset"
          :type="group.fieldset?.type"
          :style="'width:' + (group.fieldset.width || '100%')"
        >
          <span class="title">{{ group.fieldset?.desc }}</span>
          <template v-if="group.fieldset.right?.length">
            <template
              v-for="(rightitem, j) in group.fieldset.right"
              :key="j"
            >
              <div :class="rightitem.className">
                <template
                  v-for="(item, k) in rightitem.items"
                  :key="k"
                >
                  <template v-if="!item.hidden">
                    <FormItem
                      v-if="item.field"
                      v-model="state.queryParams[item.field]"
                      :config="item"
                      @change="(val: any) => group.fieldset?.handleQuery && group.fieldset.handleQuery(val, state.queryParams, item, group)"
                    />
                    <FormItem
                      v-else
                      :config="item"
                      @change="(val: any) => group.fieldset?.handleQuery && group.fieldset.handleQuery(val, state.queryParams, item, group)"
                    />
                  </template>
                </template>
              </div>
            </template>
          </template>
        </FieldSet>
        <template
          v-for="(item, j) in group.fields"
          :key="j"
        >
          <template v-if="!item.hidden">
            <el-card
              v-if="item.type === 'card-table'"
              :style="item.itemContainerStyle || 'width:100%;'"
            >
              <template
                v-if="item.title || item.titleRight?.length"
                #header
              >
                <div
                  v-if="item.titleRight?.length"
                  class="right-wrapper"
                >
                  <template
                    v-for="(rightitem, k) in item.titleRight"
                    :key="k"
                  >
                    <div :class="rightitem.className">
                      <template
                        v-for="(obj, z) in rightitem.items"
                        :key="z"
                      >
                        <template v-if="!obj.hidden">
                          <FormItem
                            v-if="obj.field"
                            v-model="state.queryParams[obj.field]"
                            :config="obj"
                            @change="(val: any) => item.handleQuery && item.handleQuery(val, item, group)"
                          />
                          <FormItem
                            v-else
                            :config="item"
                            @change="(val: any) => item.handleQuery && item.handleQuery(val, item, group)"
                          />
                        </template>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
              <FormTable
                v-if="item.field"
                v-model="state.dataForm[item.field]"
                :config="item.config"
                @change="(val: any) => handleFormItemChange(val, item, group)"
              />
            </el-card>
            <FormTable
              v-else-if="item.type === 'table' && item.field"
              v-model="state.dataForm[item.field]"
              :style="item.itemContainerStyle || 'width:100%;'"
              :config="item.config"
              @change="(val: any) => handleFormItemChange(val, item, group)"
            />
            <el-form-item
              v-else
              :style="item.itemContainerStyle"
              :class="item.className"
              :label="item.label"
              :prop="item.field"
              :label-width="item.labelWidth || config.labelWidth"
              :rules="item.type !== 'text' ? item.rules : []"
            >
              <FormItem
                v-model="state.dataForm[item.field!]"
                :config="item"
                :row="state.dataForm"
                :size="config.size"
                @change="(val: any) => handleFormItemChange(val, item, group)"
              />
            </el-form-item>
          </template>
        </template>
        <template v-if="group.groupBtns?.btns.length">
          <div
            :style="group.groupBtns.styles"
            :class="group.groupBtns.className"
          >
            <Button
              v-for="(btn, j) in group.groupBtns?.btns"
              :key="j"
              :config="btn"
            />
          </div>
        </template>
      </div>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { ElForm, ElCard, ElFormItem } from 'element-plus'
import { ref, reactive, watch, toRefs } from 'vue'
import Button from './Button.vue'
import FieldSet from './FieldSet.vue'
import FormItem from './FormItem.vue'
import FormTable from './FormTable.vue'
import { IFormConfig, IFormFieldGroup, IFormItem } from '../../..'

const props = defineProps<{
  config: IFormConfig
}>()
const refForm = ref<InstanceType<typeof ElForm>>()
const state = reactive<{
  /**
   * 表单状态
   */
  dataForm: any
  /**
   * 供title右侧表单用的查询状态
   */
  queryParams: any
}>({
  queryParams: {
    ...(props.config.defaultQuerys || {})
  },
  dataForm: { ...(props.config.defaultValue || {}) }
})
const handleFormItemChange = (
  val: any,
  item: IFormItem,
  fieldSet?: IFormFieldGroup
) => {
  item.onChange && item.onChange(val, item, fieldSet)
}
const handleHidden = () => {
  props.config.group.map(fieldSet => {
    fieldSet.handleHidden
      && fieldSet.handleHidden(state.dataForm, state.queryParams, fieldSet)
    fieldSet.fields.map(field => {
      field.handleHidden
        && field.handleHidden(state.dataForm, state.queryParams, field)
    })
    fieldSet.fieldset?.right?.map(right => {
      right.items.map(item => {
        item.handleHidden
          && item.handleHidden(state.dataForm, state.queryParams, item)
      })
    })
  })
}

watch(
  () => state.dataForm,
  () => {
    if (props.config.static) return
    /** 处理当数据变动时表单结构跟随改变的情况 */
    handleHidden()
  },
  {
    deep: true,
    immediate: true
  }
)
watch(
  () => state.queryParams,
  () => {
    if (props.config.static) return
    handleHidden()
  }
)
// 保存 save
const Submit = async () => {
  try {
    const valid = await refForm.value?.validate()
    if (!valid) {
      return false
    }
    // additionalInfo JSON对象字符串初始化
    const aInfo: any = {}

    // 提取提交参数对象 （深克隆 不影响表单正常显示）
    const queryParams = cloneDeep({ ...state.dataForm })
    props.config.group.map(group => {
      group.fields.map(item => {
        if (item.aInfo && item.field) {
          // 处理aInfo
          aInfo[item.field] = queryParams[item.field]
          delete queryParams[item.field]
        }
        return item
      })
      return group
    })
    // 如果aInfo中有任意值 设置additionalInfo
    if (Object.values(aInfo).length > 0) {
      queryParams.additionalInfo = JSON.stringify(aInfo)
    }
    const res = props.config.submit && (await props.config.submit(queryParams))
    return res
  } catch (error) {
    return false
  }
}
/**
 * 重置表单
 */
const resetForm = () => {
  refForm.value?.resetFields()
  state.dataForm = {
    ...(props.config.defaultValue || {})
  }
}
defineExpose({
  resetForm,
  Submit,
  ...toRefs(state)
})
</script>
<style lang="scss">
.title {
  margin-right: 8px;
}

.inline-form {
  width: 100%;
}

.el-form--inline .el-form-item {
  margin-right: 12px;
}

.inline-group {
  width: 100%;
  flex-basis: 100%;
  display: inline-flex;
  flex-wrap: wrap;
}
</style>
