<template>
  <el-form
    ref="refForm"
    class="form-flex"
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
      <el-row
        v-if="!group.hidden"
        :gutter="computedGutter(group, config)"
        :style="group.styles"
      >
        <el-col v-if="group.fieldset">
          <FieldSet
            :type="group.fieldset?.type"
            :style="group.fieldset.style"
          >
            <span class="title">{{ group.fieldset?.desc }}</span>
            <template v-if="group.fieldset.right?.length">
              <template
                v-for="(rightitem, j) in group.fieldset.right"
                :key="j"
              >
                <div
                  :class="rightitem.className"
                  :style="rightitem.style"
                >
                  <template
                    v-for="(item, k) in rightitem.items"
                    :key="k"
                  >
                    <template v-if="!item.hidden">
                      <label
                        v-if="item.label"
                        class="form-label"
                      >{{
                        item.label
                      }}</label>
                      <FormItem
                        v-if="item.field"
                        v-model="state.queryParams[item.field]"
                        :config="item"
                        @change="(val: any) => group.fieldset?.handleQuery && group.fieldset.handleQuery(val,state.queryParams, item, group)"
                      />
                      <FormItem
                        v-else
                        :config="item"
                        @change="(val: any) => group.fieldset?.handleQuery && group.fieldset.handleQuery(val,state.queryParams, item, group)"
                      />
                    </template>
                  </template>
                </div>
              </template>
            </template>
          </FieldSet>
        </el-col>
        <template
          v-for="(item, j) in group.fields"
          :key="j"
        >
          <el-col
            v-if="!item.hidden"
            :style="item.colStyles"
            :xs="getCol(item, 'xs')"
            :sm="getCol(item, 'sm')"
            :md="getCol(item, 'md')"
            :lg="getCol(item, 'lg')"
            :xl="getCol(item, 'xl')"
          >
            <!-- 分割线 -->
            <el-divider
              v-if="item.type === 'divider'"
              :size="item.size || config.size"
              :content-position="item?.contentPosition || 'left'"
              :direction="item?.direction || 'horizontal'"
              :border-style="item?.borderStyle || 'solid'"
            >
              {{ item?.text || '分割线' }}
            </el-divider>
            <el-card v-if="item.type === 'card-table'">
              <template
                v-if="item.title || item.titleRight?.length"
                #header
              >
                <div
                  v-if="item.titleRight?.length"
                  class="right-wrapper"
                  :style="
                    typeof item.style === 'function'
                      ? item.style(
                        item.field ? state.dataForm[item.field] : undefined,
                        state.dataForm,
                        item
                      )
                      : item.style
                  "
                >
                  <template
                    v-for="(rightitem, k) in item.titleRight"
                    :key="k"
                  >
                    <div
                      :class="rightitem.className"
                      :style="rightitem.style"
                    >
                      <template
                        v-for="(obj, z) in rightitem.items"
                        :key="z"
                      >
                        <FormItem
                          v-if="obj.field"
                          v-model="state.queryParams[obj.field]"
                          :config="obj"
                          :size="obj.size || config.size"
                          @change="(val: any) => item.handleQuery &&item.handleQuery(val,item,group)"
                        />
                        <FormItem
                          v-else
                          :config="obj"
                          :size="obj.size || config.size"
                          @change="(val: any) => item.handleQuery &&item.handleQuery(val,item,group)"
                        />
                      </template>
                    </div>
                  </template>
                </div>
              </template>
              <FormTable
                v-if="item.field"
                v-model="state.dataForm[item.field]"
                :config="item.config"
                :size="item.size || config.size"
                :style="
                  typeof item.style === 'function'
                    ? item.style(
                      state.dataForm[item.field],
                      state.dataForm,
                      item
                    )
                    : item.style
                "
                :class="item.className"
                @change="(val: any) => handleFormItemChange(val, item, group)"
              />
              <FormTable
                v-else
                :config="item.config"
                :size="item.size || config.size"
                :style="
                  typeof item.style === 'function'
                    ? item.style(undefined, state.dataForm, item)
                    : item.style
                "
                :class="item.className"
              />
            </el-card>
            <template v-else-if="item.type === 'table'">
              <label
                v-if="item.label"
                class="el-form-item__label"
              >{{
                item.label
              }}</label>
              <FormTable
                v-if="item.field"
                v-model="state.dataForm[item.field]"
                :size="item.size || config.size"
                :config="item.config"
                :style="
                  typeof item.style === 'function'
                    ? item.style(
                      state.dataForm[item.field],
                      state.dataForm,
                      item
                    )
                    : item.style
                "
                :class="item.className"
                @change="(val: any) => handleFormItemChange(val, item, group)"
              />
              <FormTable
                v-else
                :config="item.config"
                :size="item.size || config.size"
                :style="
                  typeof item.style === 'function'
                    ? item.style(undefined, state.dataForm, item)
                    : item.style
                "
                :class="item.className"
              />
            </template>
            <template v-else-if="item.type === 'attr-table'">
              <AttrTable
                :data="item.config.data"
                :attributes="item.config.attributes"
                :rows="item.config.rows"
                :columns="item.config.columns"
                :style="
                  typeof item.style === 'function'
                    ? item.style(item.config.data, state.dataForm, item)
                    : item.style
                "
                :class="item.className"
              />
            </template>
            <el-form-item
              v-else
              :label="item.label"
              :size="item.size || config.size"
              :prop="item.field"
              :rules="item.type !== 'text' ? item.rules : []"
              :style="item.itemContainerStyle"
            >
              <FormItem
                v-if="item.field"
                v-model="state.dataForm[item.field]"
                :config="item"
                :row="state.dataForm"
                :size="item.size || config.size"
                @change="(val: any) => handleFormItemChange(val, item, group)"
              />
              <FormItem
                v-else
                :config="item"
                :row="state.dataForm"
                :size="item.size || config.size"
              />
              <template v-if="item.extraFormItem?.length">
                <template
                  v-for="(extraItem, k) in item.extraFormItem"
                  :key="k"
                >
                  <FormItem
                    v-if="extraItem.field"
                    v-model="state.dataForm[extraItem.field]"
                    :config="extraItem"
                    :row="state.dataForm"
                    :size="item.size || config.size"
                    @change="(val:any)=>handleFormItemChange(val,extraItem,group)"
                  ></FormItem>
                  <FormItem
                    v-else
                    :config="item"
                    :row="state.dataForm"
                    :size="item.size || config.size"
                  />
                </template>
              </template>
            </el-form-item>
          </el-col>
        </template>

        <el-col
          v-if="group.groupBtns?.btns.length"
          :xs="getCol(group.groupBtns, 'xs')"
          :sm="getCol(group.groupBtns, 'sm')"
          :md="getCol(group.groupBtns, 'md')"
          :lg="getCol(group.groupBtns, 'lg')"
          :xl="getCol(group.groupBtns, 'xl')"
        >
          <div
            :style="group.groupBtns.styles"
            :class="group.groupBtns.className"
          >
            <Button
              v-for="(btn, j) in group.groupBtns?.btns"
              :key="j"
              :size="btn.size || config.size"
              :row="state.dataForm"
              :config="btn"
            />
          </div>
        </el-col>
      </el-row>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import {
  ElCard,
  ElCol,
  ElDivider,
  ElForm,
  ElFormItem,
  ElRow
} from 'element-plus'
import AttrTable from './AttrTable.vue'
import { getCol } from '@/utils/GlobalHelper'
import FieldSet from './FieldSet.vue'
import FormItem from './FormItem.vue'
import FormTable from './FormTable.vue'
import Button from './Button.vue'

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
const computedGutter = (group: IFormFieldGroup, config: IFormConfig) => {
  if (group.gutter !== undefined) {
    return group.gutter
  }
  if (config.gutter !== undefined) {
    return config.gutter
  }
  return 30
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
const Submit = async (status?: boolean) => {
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
      })
    })
    // 如果aInfo中有任意值 设置additionalInfo
    if (Object.values(aInfo).length > 0) {
      queryParams.additionalInfo = JSON.stringify(aInfo)
    }
    const res = props.config.submit && (await props.config.submit(queryParams, status))
    return res
  } catch (error) {
    return false
  }
}
/**
 * 重置表单
 */
const resetForm = () => {
  state.dataForm = {
    ...(props.config.defaultValue || {})
  }
  refForm.value?.resetFields()
}
const resetQuery = () => {
  state.queryParams = {
    ...(props.config.defaultQuerys || {})
  }
}
defineExpose({
  resetForm,
  resetQuery,
  refForm,
  Submit,
  ...toRefs(state)
})
</script>
<style lang="scss">
@import url('@/styles/element-plus/index.scss');
.form-flex {
  padding: 0;
}
.title {
  margin-right: 8px;
}
.extra-item {
  margin-left: 10px;
}
.form-label {
  margin-left: 12px;
}
.right-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
