<template>
  <el-table-column
    :key="config.prop"
    :prop="config.prop"
    :label="
      (config.preUnit || '') +
        config.label +
        ((config.unit && ' ' + config.unit) || '')
    "
    :width="config.width"
    :align="config.align || 'left'"
    :min-width="config.minWidth"
    :fixed="config.fixed"
    :show-overflow-tooltip="!config.formItemConfig"
    :sortable="config.sortable || false"
  >
    <template
      v-if="config.headerFormItemConfig"
      #header
    >
      <template v-if="config.headerFormItemConfig">
        <FormItem
          v-if="config.headerFormItemConfig?.field"
          v-model="value"
          :row="row"
          :config="config.headerFormItemConfig"
          @change="
            () => {
              config.headerFormItemConfig?.onChange &&
                config.headerFormItemConfig.onChange(value, row)
              $emit('change', value)
            }
          "
        ></FormItem>
        <FormItem
          v-else
          :row="row"
          :config="config.headerFormItemConfig"
        ></FormItem>
      </template>
    </template>
    <template #default="scope">
      <template v-if="config.subColumns?.length">
        <template
          v-for="(subColumn, i) in config.subColumns"
          :key="i"
        >
          <form-table-column :config="subColumn"></form-table-column>
        </template>
      </template>
      <template v-else>
        <template v-if="config.prop">
          <FormItem
            v-if="config.formItemConfig"
            v-model="scope.row[config.prop]"
            :config="config.formItemConfig"
            :row="scope.row"
            @change="
              val =>
                config.formItemConfig?.onChange &&
                config.formItemConfig?.onChange(
                  val,
                  scope.row,
                  config.formItemConfig
                )
            "
          ></FormItem>
          <template v-else-if="config.image">
            <el-image
              v-if="config.image"
              style="width: 100px; height: 100px; margin-top: 5px"
              :style="config.cellStyle"
              :src="resolveElImageData(scope.row[config.prop], false)"
              :preview-src-list="
                resolveElImageData(scope.row[config.prop], true)
              "
            />
          </template>
          <Tag
            v-else-if="config.tag"
            :row="scope.row"
            :color="config.tagColor"
            :value="scope.row[config.prop]"
            class="tag-flexable"
          >
            <!-- 表格项 图标 -->
            <el-icon
              v-if="config.icon || config.svgIcon || config.symbolIcon"
              :style="
                typeof config.iconStyle === 'function'
                  ? config.iconStyle(scope.row, scope.row[config.prop], config)
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
                  ? config.formatter(
                    scope.row,
                    scope.row[config.prop],
                    config.prop
                  )
                  : scope.row[config.prop]
              }}
            </span>
          </Tag>
          <Voicer
            v-else-if="config.isVoice"
            :download="config.download"
            :show-url="config.showUrl"
            :url="scope.row[config.prop]"
          ></Voicer>
          <template v-else>
            <!-- 表格项 图标 -->

            <span
              class="table-cell"
              :style="
                typeof config.cellStyle === 'function'
                  ? config.cellStyle(
                    scope.row,
                    scope.row[config.prop],
                    config.prop
                  )
                  : config.cellStyle
              "
              :class="[
                config.className,
                config.icon || config.svgIcon || config.symbolIcon
                  ? 'has-icon'
                  : ''
              ]"
              @click="config.handleClick && config.handleClick(scope.row)"
            >
              <el-icon
                v-if="config.icon || config.svgIcon || config.symbolIcon"
                :style="
                  typeof config.iconStyle === 'function'
                    ? config.iconStyle(
                      scope.row,
                      scope.row[config.prop],
                      config
                    )
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
                  (config.formatter &&
                    config.formatter(
                      scope.row,
                      scope.row[config.prop],
                      config.prop
                    )) ||
                    scope.row[config.prop]
                }}
              </span>
            </span>
          </template>
        </template>
      </template>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import { ElTableColumn, ElImage, ElIcon } from 'element-plus'
import { computed } from 'vue'
import { resolveElImageData } from '@/utils/GlobalHelper'
import Voicer from './Voicer.vue'
import Tag from './Tag.vue'
import { IFormTableColumn } from '@/types/interfaces'

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps<{
  config: IFormTableColumn
  /** 表头绑定的数据对象 */
  row?: Record<string, any>
  modelValue?: any
}>()
const value = computed({
  get: () => props.modelValue,
  set: nv => {
    emit('update:modelValue', nv)
  }
})
</script>
<style lang="scss" scoped>
.tag-flexable {
  :deep(.el-tag__content) {
    display: flex;
    align-items: center;
  }
}
.table-cell {
  &.has-icon {
    display: flex;
    align-items: center;
  }
}
.el-icon + span {
  margin-left: 4px;
}
</style>
