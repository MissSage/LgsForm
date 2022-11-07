<template>
  <Draggable
    v-if="group"
    class="dragArea"
    ghost-class="ghost"
    :force-fallback="true"
    chosen-class="chosenClass"
    animation="340"
    :list="group.fields"
    :group="state.fieldGroup"
    :sort="true"
    :item-key="'id'"
    @choose="evt => emit('ChooseField', evt.oldIndex)"
  >
    <template #item="{ element, index }">
      <el-col
        :style="element.colStyles"
        :xs="element.xs"
        :sm="element.sm"
        :md="element.md"
        :lg="element.lg"
        :xl="element.xl"
        class="form-item-col"
        :class="activeId === element.id ? 'active' : ''"
      >
        <div class="field-btns">
          <el-tooltip :content="'复制'">
            <el-icon
              class="copy"
              @click="() => emit('CopyField', index)"
            >
              <SvgIcon :name="'copy'"></SvgIcon>
            </el-icon>
          </el-tooltip>
          <el-tooltip :content="'删除'">
            <el-icon
              class="delete"
              @click="() => emit('DeleteField', index)"
            >
              <SvgIcon :name="'delete'"></SvgIcon>
            </el-icon>
          </el-tooltip>
        </div>
        <el-card v-if="element.type === 'card-table'">
          <template
            v-if="element.title || element.titleRight?.length"
            #header
          >
            <div
              v-if="element.titleRight?.length"
              class="right-wrapper"
              :style="
                typeof element.style === 'function'
                  ? element.style(
                    element.field ? state.dataForm[element.field] : undefined,
                    state.dataForm,
                    element
                  )
                  : element.style
              "
            >
              <template
                v-for="(rightitem, k) in element.titleRight"
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
                      :size="size"
                      @change="(val: any) => element.handleQuery &&element.handleQuery(val,element,element)"
                    />
                    <FormItem
                      v-else
                      :config="obj"
                      :size="size"
                      @change="(val: any) => element.handleQuery &&element.handleQuery(val,element,element)"
                    />
                  </template>
                </div>
              </template>
            </div>
          </template>
          <FormTable
            v-if="element.field"
            v-model="state.dataForm[element.field]"
            :config="element.config"
            :size="element.size || size"
            :style="
              typeof element.style === 'function'
                ? element.style(
                  state.dataForm[element.field],
                  state.dataForm,
                  element
                )
                : element.style
            "
            :class="element.className"
            @change="(val: any) => handleFormItemChange(val, element, element)"
          />
          <FormTable
            v-else
            :config="element.config"
            :size="element.size || size"
            :style="
              typeof element.style === 'function'
                ? element.style(undefined, state.dataForm, element)
                : element.style
            "
            :class="element.className"
          />
        </el-card>
        <template v-else-if="element.type === 'table'">
          <label
            v-if="element.label"
            class="el-form-item__label"
          >{{
            element.label
          }}</label>
          <FormTable
            v-if="element.field"
            v-model="state.dataForm[element.field]"
            :config="element.config"
            :size="element.size || size"
            :style="
              typeof element.style === 'function'
                ? element.style(
                  state.dataForm[element.field],
                  state.dataForm,
                  element
                )
                : element.style
            "
            :class="element.className"
            @change="(val: any) => handleFormItemChange(val, element, element)"
          />
          <FormTable
            v-else
            :config="element.config"
            :size="element.size || size"
            :style="
              typeof element.style === 'function'
                ? element.style(undefined, state.dataForm, element)
                : element.style
            "
            :class="element.className"
          />
        </template>
        <template v-else-if="element.type === 'attr-table'">
          <AttrTable
            :data="element.config.data"
            :attributes="element.config.attributes"
            :rows="element.config.rows"
            :columns="element.config.columns"
            :style="
              typeof element.style === 'function'
                ? element.style(element.config.data, state.dataForm, element)
                : element.style
            "
            :class="element.className"
          />
        </template>

        <el-divider
          v-else-if="element.type === 'divider'"
          :size="element.size || size"
          :content-position="element?.contentPosition || 'left'"
          :direction="element?.direction || 'horizontal'"
          :border-style="element?.borderStyle || 'solid'"
        >
          {{ element?.label || '分割线' }}
        </el-divider>
        <el-form-item
          v-else
          :label="element.label"
          :size="element.size || size"
          :prop="element.field"
          :rules="element.type !== 'text' ? element.rules : []"
          :style="element.itemContainerStyle"
        >
          <FormItem
            v-if="element.field"
            v-model="state.dataForm[element.field]"
            :config="element"
            :row="state.dataForm"
            :size="element.size || size"
            @change="(val: any) => handleFormItemChange(val, element, element)"
          />
          <FormItem
            v-else
            :config="element"
            :row="state.dataForm"
            :size="element.size || size"
          />
          <template v-if="element.extraFormItem?.length">
            <template
              v-for="(extraItem, k) in element.extraFormItem"
              :key="k"
            >
              <FormItem
                v-if="extraItem.field"
                v-model="state.dataForm[extraItem.field]"
                :config="extraItem"
                :row="state.dataForm"
                :size="element.size || size"
                @change="(val:any)=>handleFormItemChange(val,extraItem,element)"
              ></FormItem>
              <FormItem
                v-else
                :config="element"
                :row="state.dataForm"
                :size="element.size || size"
              />
            </template>
          </template>
        </el-form-item>
      </el-col>
    </template>
  </Draggable>
  <Draggable
    v-else-if="config"
    class="dragArea"
    :list="config.group"
    :group="state.groupGroup"
    :sort="true"
    item-key="id"
    ghost-class="ghost"
    :force-fallback="true"
    chosen-class="chosenClass"
    animation="340"
    @choose="evt => emit('ChooseGroup', evt.oldIndex)"
  >
    <template #item="{ element, index }">
      <el-row
        :gutter="computedGutter(element, config)"
        :style="element.styles"
        class="form-item-row"
        :class="activeId === element.id ? 'active' : ''"
      >
        <el-col v-if="element.fieldset">
          <FieldSet
            :type="element.fieldset?.type"
            :style="element.fieldset.style"
          >
            <span class="title">{{ element.fieldset?.desc }}</span>
            <template v-if="element.fieldset.right?.length">
              <template
                v-for="(rightitem, j) in element.fieldset.right"
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
                        @change="(val: any) => element.fieldset?.handleQuery && element.fieldset.handleQuery(val,state.queryParams, item, element)"
                      />
                      <FormItem
                        v-else
                        :config="item"
                        @change="(val: any) => element.fieldset?.handleQuery && element.fieldset.handleQuery(val,state.queryParams, item, element)"
                      />
                    </template>
                  </template>
                </div>
              </template>
            </template>
          </FieldSet>
        </el-col>

        <NestedDraggableFormGroup
          :row="row"
          :group="element"
          :size="config.size"
          @copy-field="j => emit('CopyField', j, element)"
          @delete-field="j => emit('DeleteField', j, element)"
          @choose-field="j => emit('ChooseField', j, element)"
        ></NestedDraggableFormGroup>
        <el-col
          v-if="element.groupBtns?.btns.length"
          :xs="element.groupBtns.xs"
          :sm="element.groupBtns.sm"
          :md="element.groupBtns.md"
          :lg="element.groupBtns.lg"
          :xl="element.groupBtns.xl"
        >
          <div
            :style="element.groupBtns.styles"
            :class="element.groupBtns.className"
          >
            <Button
              v-for="(btn, j) in element.groupBtns?.btns"
              :key="j"
              :row="row"
              :size="config.size"
              :config="btn"
            />
          </div>
        </el-col>
        <div class="group-btns">
          <el-tooltip :content="'复制'">
            <el-icon
              class="copy"
              @click="() => emit('CopyGroup', index)"
            >
              <SvgIcon :name="'copy'"></SvgIcon>
            </el-icon>
          </el-tooltip>
          <el-tooltip :content="'删除'">
            <el-icon
              class="delete"
              @click="() => emit('DeleteGroup', index)"
            >
              <SvgIcon :name="'delete'"></SvgIcon>
            </el-icon>
          </el-tooltip>
        </div>
      </el-row>
    </template>
  </Draggable>
</template>
<script lang="ts" setup>
import Draggable from 'vuedraggable'

const emit = defineEmits<{(e: 'ChooseGroup', oldIndex: number)
  (e: 'CopyGroup', index?: number)
  (e: 'DeleteGroup', index?: number)
  (e: 'ChooseField', index?: number, group?: IFormFieldGroup)
  (e: 'CopyField', index?: number, group?: IFormFieldGroup)
  (e: 'DeleteField', index?: number, group?: IFormFieldGroup)
}>()
const props = defineProps<{
  config?: IFormConfig
  group?: IFormFieldGroup
  row: any
  size?: ISize
  activeId?: string
}>()

const state = reactive<{
  /**
   * 表单状态
   */
  dataForm: any
  /**
   * 供title右侧表单用的查询状态
   */
  queryParams: any
  fieldGroup: any
  groupGroup: any
}>({
  queryParams: {
    ...(props.config?.defaultQuerys || {})
  },
  dataForm: { ...(props.config?.defaultValue || {}) },
  groupGroup: {
    name: 'group',
    put: false,
    pull: false
  },
  fieldGroup: {
    name: 'field',
    pull: evt => {
      const flag = evt?.options?.group?.name === 'field'
      return !!flag
    },
    put: true
  }
})
const computedGutter = (group: IFormFieldGroup, config: IFormConfig) => {
  if (group.gutter !== undefined) {
    return group.gutter
  }
  if (config.gutter !== undefined) {
    return config.gutter
  }
  return 30
}
const handleFormItemChange = (
  val: any,
  item: IFormItem,
  fieldSet?: IFormFieldGroup
) => {
  item.onChange && item.onChange(val, item, fieldSet)
}
</script>
<style lang="scss" scoped>
.dragArea {
  width: 100%;
  min-height: 50px;
  display: inline-block;
  position: relative;
}

.group-btns,
.field-btns {
  display: none;
  position: absolute;
  right: 6px;
  top: 5px;
  padding: 0;
  margin: 0;
  // display: flex;
  justify-content: flex-end;
  align-items: center;
  .el-icon {
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
      &.delete {
        color: red;
      }
    }
  }
  .el-icon + .el-icon {
    margin-left: 8px;
  }
}
.form-item-col {
  position: relative;
  &:hover {
    & > .field-btns {
      display: flex;
    }
  }
}
.form-item-row {
  &:hover {
    & > .group-btns {
      display: flex;
    }
  }
}
.active {
  box-sizing: border-box;
  box-shadow: 0 0 3px var(--el-border-color) inset !important;
}
</style>

<style lang="scss">
.item {
  border: solid 1px var(--el-border-color);
  padding: 6px 10px;
  text-align: left;
}

.item:hover {
  cursor: move;
  border-color: var(--el-border-color--lighter);
}

.ghost {
  border: solid 1px rgb(25, 45, 86) !important;
}

.chosenClass {
  background-color: rgb(25, 45, 86) !important;
  opacity: 1;
  border: solid 1px rgb(0, 238, 255);
}

.fallbackClass {
  background-color: aquamarine;
}
</style>
