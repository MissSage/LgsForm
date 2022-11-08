<template>
  <label v-if="config.type === 'text'" class="readonly-input">
    {{
      (config.formatter ? config.formatter(modelValue, row) : modelValue) || "-"
    }}
    {{ config.unit ? config.unit : "" }}
  </label>
  <Input
    v-else-if="
      config.type === 'input' ||
      config.type === 'password' ||
      config.type === 'textarea'
    "
    v-model="state.value"
    :config="config"
    :size="computedSize"
    @blur="(e) => $emit('blur', state.value, e)"
    @change="handleChange"
    @focus="(e) => $emit('focus', state.value, e)"
    @clear="() => $emit('clear', state.value)"
  >
    <template v-if="config.suffix" #suffix>
      <span v-if="config.unit">{{ config.unit }}</span>
      <span v-else>{{ config.suffix }}</span>
    </template>
    <template v-if="config.prefix" #prefix>
      <span>{{ config.prefix }}</span>
    </template>
    <template v-if="config.prepend" #prepend>
      <span v-if="typeof config.prepend === 'string'">{{
        config.prepend
      }}</span>
      <template v-else>
        <el-select
          v-model="state.prependVal"
          :placeholder="config.prepend?.placeholder || '请选择'"
          :style="
            typeof config.prepend?.style === 'function'
              ? config.prepend.style(state.prependVal, row, config)
              : config.prepend?.style
          "
          @change="(val) => onChange(config.prepend, val, config)"
        >
          <el-option
            v-for="(obj, i) in config.prepend?.options"
            :key="i"
            :label="obj.label"
            :value="obj.value"
          />
        </el-select>
      </template>
    </template>
    <template
      v-if="config.append || config.btn || config.appendBtns?.length"
      #append
    >
      <span v-if="typeof config.append === 'string'">{{ config.append }}</span>
      <Button
        v-else-if="config.btn"
        :config="config.btn"
        :row="row"
        :size="computedSize"
      ></Button>
      <template v-else-if="config.appendBtns?.length">
        <Button
          v-for="(btn, i) in config.appendBtns"
          :key="i"
          :config="btn"
          :row="row"
          :size="computedSize"
        ></Button>
      </template>

      <template v-else>
        <el-select
          v-model="state.appendVal"
          :placeholder="config.append?.placeholder || '请选择'"
          :style="
            typeof config.append?.style === 'function'
              ? config.append.style(state.appendVal, row, config)
              : config.append?.style
          "
          @change="(val) => onChange(config.append, val, config)"
        >
          <el-option
            v-for="(obj, i) in config.append?.options"
            :key="i"
            :label="obj.label"
            :value="obj.value"
          />
        </el-select>
      </template>
    </template>
  </Input>
  <el-input
    v-if="config.type === 'input-number'"
    v-model="state.value"
    :size="computedSize"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    style="width: 100%"
    :class="{ 'no-border': config.noBorder }"
    :placeholder="config.placeholder || '请输入'"
    onkeyup="value=value.replace(/[^\d.]/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')"
    @change="handleChange"
  >
    <template v-if="config.suffix || config.unit" #suffix>
      <span v-if="config.unit">{{ config.unit }}</span>
      <span v-else>{{ config.suffix }}</span>
    </template>
    <template v-if="config.prefix" #prefix>
      <span>{{ config.prefix }}</span>
    </template>
    <template v-if="config.prepend" #prepend>
      <span v-if="typeof config.prepend === 'string'">{{
        config.prepend
      }}</span>
      <template v-else>
        <el-select
          v-model="state.prependVal"
          :placeholder="config.prepend?.placeholder || '请选择'"
          :style="
            typeof config.prepend?.style === 'function'
              ? config.prepend.style(state.prependVal, row, config)
              : config.prepend?.style
          "
          @change="(val) => onChange(config.prepend, val, config)"
        >
          <el-option
            v-for="(obj, i) in config.prepend?.options"
            :key="i"
            :label="obj.label"
            :value="obj.value"
          />
        </el-select>
      </template>
    </template>
    <template v-if="config.append" #append>
      <span v-if="typeof config.append === 'string'">{{ config.append }}</span>
      <template v-else>
        <el-select
          v-model="state.appendVal"
          :placeholder="config.append?.placeholder || '请选择'"
          :style="
            typeof config.append?.style === 'function'
              ? config.append.style(state.appendVal, row, config)
              : config.append?.style
          "
          @change="(val) => onChange(config.append, val, config)"
        >
          <el-option
            v-for="(obj, i) in config.append?.options"
            :key="i"
            :label="obj.label"
            :value="obj.value"
          />
        </el-select>
      </template>
    </template>
  </el-input>
  <el-input-number
    v-else-if="config.type === 'number'"
    v-show="!config.hidden"
    v-model="state.value"
    :size="computedSize"
    style="width: 100%"
    :class="{ 'no-border': config.noBorder }"
    :min="config.min"
    :max="config.max"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :controls-position="config.controlPosition"
    @change="handleChange"
  />
  <el-select
    v-else-if="config.type === 'select'"
    v-show="!config.hidden"
    v-model="state.value"
    :size="computedSize"
    :style="{
      width: config.width || '100%',
    }"
    :class="{ 'no-border': config.noBorder }"
    filterable
    collapse-tags
    :clearable="config.clearable !== false"
    :allow-create="config.allowCreate"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :multiple="config.multiple"
    :placeholder="config.placeholder || '请选择'"
    @change="handleChange"
  >
    <!-- <template v-if="config.setOptionBy">
      <el-option v-for="(obj, i) in state.options" :key="i" :label="obj.label" :value="obj.value" />
    </template>
    <template v-else> -->
    <el-option
      v-for="(obj, i) in config.options"
      :key="i"
      :label="obj.label"
      :value="obj.value"
      :disabled="
        config.disableOption
          ? config.disableOption(obj, state.value, row)
          : typeof obj.disabled === 'function'
          ? obj.disabled(state.value, row, obj)
          : obj.disabled
      "
    />
    <!-- </template> -->
  </el-select>
  <el-cascader
    v-else-if="config.type === 'cascader'"
    v-model="state.value"
    :style="{
      width: config.width || '100%',
    }"
    :clearable="config.clearable !== false"
    :size="computedSize"
    :class="{ 'no-border': config.noBorder }"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :options="(config.options as any)"
    :props="
      config.props || {
        checkStrictly: true,
      }
    "
    @change="handleChange"
  />
  <el-tree-select
    v-else-if="config.type === 'select-tree'"
    v-model="state.value"
    :style="{
      width: config.width || '100%',
    }"
    :size="computedSize"
    :data="config.options"
    :default-expand-all="config.defaultExpandAll"
    :class="{ 'no-border': config.noBorder }"
    :filterable="config.filterable !== false"
    :check-strictly="config.checkStrictly"
    :multiple="config.multiple"
    :lazy="config.lazy"
    :collapse-tags="true"
    :placeholder="config.placeholder"
    :clearable="config.clearable !== false"
    :load="config.lazyLoad"
    :props="
      config.props || {
        label: 'label',
        children: 'children',
        disabled: 'disabled',
        isLeaf: 'isLeaf',
        class: 'class',
      }
    "
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :show-checkbox="config.multiple && config.showCheckbox"
    :filter-node-method="filterNodeMethod"
    @change="() => handleChange(state.value)"
    @node-click="(...args:any[])=>nodeClick(config,...args)"
  />
  <el-switch
    v-else-if="config.type === 'switch'"
    v-show="!config.hidden"
    v-model="state.value"
    :inline-prompt="config.inlinePrompt !== false"
    :width="config.width"
    :size="computedSize"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :active-color="config.activeColor || '#1DCF8E'"
    :inactive-color="config.inActiveColor || '#3A3E56'"
    :active-text="config.activeText || '是'"
    :inactive-text="config.inActiveText || '否'"
    :active-value="config.activeValue || true"
    :inactive-value="config.inActiveValue || false"
    @change="handleChange"
  />
  <el-radio-group
    v-else-if="config.type === 'radio' || config.type === 'radio-button'"
    v-show="!config.hidden"
    v-model="state.value"
    :size="computedSize"
    :style="{
      ...(config.style || {}),
      width: config.width || '100%',
    }"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    @change="handleChange"
  >
    <template v-if="config.type === 'radio'">
      <el-radio
        v-for="(kv, i) in config.options"
        :key="i"
        :border="config.noBorder === undefined ? false : !config.noBorder"
        :label="kv.value"
      >
        {{ kv.label }}
      </el-radio>
    </template>
    <template v-else-if="config.type === 'radio-button'">
      <el-radio-button
        v-for="(kv, i) in config.options"
        :key="i"
        :label="kv.value"
        :style="
          typeof config.itemStyle === 'function'
            ? config.itemStyle(state.value, row, config)
            : config.itemStyle
        "
      >
        <span
          v-if="config.prefix"
          :style="
            typeof config.prefixStyle === 'function'
              ? config.prefixStyle(kv, state.value, row, config)
              : config.prefixStyle
          "
          >{{
            typeof config.prefix === "function"
              ? config.prefix(kv, state.value, row, config)
              : config.prefix
          }}</span
        >
        <span>
          <el-icon v-if="kv.icon || kv.svgIcon">
            <i v-if="kv.icon" :class="kv.icon"></i>
            <component :is="kv.svgIcon" v-else></component>
          </el-icon>
          {{ kv.label }}
        </span>

        <span
          v-if="config.suffix"
          :style="
            typeof config.suffixStyle === 'function'
              ? config.suffixStyle(kv, state.value, row, config)
              : config.suffixStyle
          "
          >{{
            typeof config.suffix === "function"
              ? config.suffix(kv, state.value, row, config)
              : config.suffix
          }}</span
        >
      </el-radio-button>
    </template>
  </el-radio-group>
  <el-checkbox-group
    v-else-if="config.type === 'checkbox'"
    v-show="!config.hidden"
    v-model="state.value"
    :size="computedSize"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    @change="handleChange"
  >
    <el-checkbox
      v-for="(kv, i) in config.options"
      :key="i"
      :border="config.noBorder === undefined ? false : !config.noBorder"
      :label="kv.value"
    >
      {{ kv.label }}
    </el-checkbox>
  </el-checkbox-group>
  <el-date-picker
    v-else-if="config.type === 'month'"
    v-model="state.value"
    :clearable="config.clearable !== false"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :style="{
      width: config.width || '100%',
    }"
    :size="computedSize"
    :type="config.type"
    :placeholder="config.placeholder || '请选择'"
    :disabled-date="(val) => getDateOptions(val)"
    :format="config.textFormat || 'YYYY-MM'"
    :value-format="config.format || 'YYYY-MM'"
    @change="handleChange"
  />
  <el-date-picker
    v-else-if="config.type === 'year'"
    v-model="state.value"
    :clearable="config.clearable !== false"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :style="{
      width: config.width || '100%',
    }"
    :size="computedSize"
    :type="config.type"
    :placeholder="config.placeholder || '请选择'"
    :disabled-date="(val) => getDateOptions(val)"
    :format="config.textFormat || 'YYYY'"
    :value-format="config.format || 'YYYY'"
    @change="handleChange"
  />
  <el-date-picker
    v-else-if="config.type === 'date' || config.type === 'datetime'"
    v-model="state.value"
    :clearable="config.clearable !== false"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :style="{
      width: config.width || '100%',
    }"
    :size="computedSize"
    :type="config.type"
    :placeholder="config.placeholder || '请选择'"
    :disabled-date="(val) => getDateOptions(val)"
    :format="
      config.textFormat ||
      (config.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss')
    "
    :value-format="
      config.format
        ? config.format
        : config.type === 'date'
        ? 'YYYY-MM-DD'
        : 'YYYY-MM-DD HH:mm:ss'
    "
    @change="handleChange"
  />
  <el-date-picker
    v-else-if="
      config.type === 'daterange' ||
      config.type === 'datetimerange' ||
      config.type === 'monthrange'
    "
    v-model="state.value"
    style="padding: 0 10px"
    :style="{
      width: config.width || '100%',
    }"
    :size="computedSize"
    :clearable="config.clearable !== false"
    :type="config.type"
    :range-separator="config.rangeSeparator || '到'"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :placeholder="config.placeholder || '请选择'"
    :disabled-date="(val) => getDateOptions(val)"
    :value-format="
      config.format
        ? config.format
        : config.type === 'daterange'
        ? 'YYYY-MM-DD'
        : 'YYYY-MM-DD HH:mm:ss'
    "
    :format="config.textFormat"
    @change="handleChange"
  />

  <div
    v-else-if="config.type === 'yearrange'"
    style="padding: 0 10px; display: flex"
  >
    <el-date-picker
      v-model="state.value[0]"
      type="year"
      format="YYYY"
      :size="computedSize"
      :clearable="config.clearable !== false"
      :placeholder="config.placeholder || '请选择'"
      :disabled-date="(val) => pickerStartAuditYear(val)"
      value-format="YYYY"
      style="width: 100px"
    >
    </el-date-picker>
    ～
    <el-date-picker
      v-model="state.value[1]"
      type="year"
      format="YYYY"
      :size="computedSize"
      :clearable="config.clearable !== false"
      :placeholder="config.placeholder || '请选择'"
      :disabled-date="(val) => pickerEndAuditYear(val)"
      value-format="YYYY"
      style="width: 100px"
    >
    </el-date-picker>
  </div>

  <el-time-picker
    v-else-if="config.type === 'time'"
    v-model="state.value"
    placeholder="请选择时间"
    :style="{
      width: config.width || '100%',
    }"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :format="config.format"
    :is-range="config.isRange"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :size="computedSize"
    :clearable="config.clearable !== false"
    @change="handleChange"
  />
  <TagGroup
    v-else-if="config.type === 'tags'"
    v-model="state.value"
    :config="config"
    :size="computedSize"
    @change="handleChange"
  ></TagGroup>
  <span
    v-else-if="config.type === 'hint'"
    style="color: #0099ff"
    :style="
      typeof config.style === 'function'
        ? config.style(state.value, row, config)
        : config.style
    "
    >{{ config?.text }}</span
  >
  <AvatarUploader
    v-else-if="config.type === 'avatar'"
    v-model="state.value"
    :url="config.url"
    :size="computedSize"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    :tips="config.tips"
    @change="handleChange"
  ></AvatarUploader>
  <div
    v-else-if="config.type === 'btn-group'"
    class="btn-wrapper"
    :class="config.className"
    :style="
      typeof config.style === 'function'
        ? config.style(state.value, row, config)
        : config.style
    "
  >
    <template v-for="(item, i) in config.btns" :key="i">
      <component
        :is="item.component"
        v-if="item.component"
        :config="item"
        :row="row"
      ></component>
      <el-tooltip v-else-if="item.title" :content="item.title">
        <Button :config="item" :row="row" :size="computedSize"></Button>
      </el-tooltip>
      <Button v-else :config="item" :row="row" :size="computedSize"></Button>
    </template>
  </div>
  <Tabs
    v-else-if="config.type === 'tabs'"
    v-model="state.value"
    :row="row"
    :config="config"
    :size="computedSize"
    @change="handleChange"
  ></Tabs>
  <!-- <IconSelector
    v-else-if="config.type === 'icon-selector'"
    v-model="state.value"
    style="width: 100%"
    :size="computedSize"
    :title="config.title"
    :clearable="config.clearable !== false"
    :default-type="config.defaultType"
    :placeholder="config.placeholder"
  ></IconSelector> -->
  <TiniImageUploader
    v-else-if="config.type === 'image-tiny'"
    v-model="state.value"
    :config="config"
    :size="computedSize"
    :placeholder="config.placeholder"
    @change="handleChange"
  ></TiniImageUploader>
  <FormTree
    v-else-if="config.type === 'tree'"
    v-model="state.value"
    :config="config"
    :row="row"
    :size="computedSize"
    @change="handleChange"
  ></FormTree>
  <FormWangeditor
    v-else-if="config.type === 'wangeditor'"
    v-model="state.value"
    :url="config.url"
    :mode="config.mode"
  />
  <List
    v-else-if="config.type === 'list'"
    v-model="state.value"
    :row="row"
    :config="config"
    @change="handleChange"
  />
  <div v-else-if="config.type === 'range'" style="width: 100%">
    <RangeSelecter
      v-model="state.value"
      :config="config"
      :row="row"
      @change="config.onChange"
    ></RangeSelecter>
  </div>
  <ColorPicker
    v-else-if="config.type === 'color-picker'"
    v-model="state.value"
    :size="computedSize"
    :disabled="
      typeof config.readonly === 'function'
        ? config.readonly(state.value, row, config)
        : config.readonly
    "
    @change="config.onChange"
  />
  <Tag
    v-else-if="config.type === 'tag'"
    :color="config.color"
    :round="config.round"
    :value="state.value"
    :row="row"
  >
    {{
      (config.formatter && config.formatter(state.value, row, config)) ||
      state.value
    }}
  </Tag>
  <div
    v-else-if="config.type === 'component'"
    :style="
      typeof config.style === 'function'
        ? config.style(state.value, row, config)
        : config.style
    "
  >
    <component
      :is="config.component"
      v-model="state.value"
      :row="row"
      :config="config"
      @change="handleChange"
    >
    </component>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from "vue";
import {
  ElInput,
  ElSelect,
  ElOption,
  ElInputNumber,
  ElCascader,
  ElTreeSelect,
  ElSwitch,
  ElRadioGroup,
  ElRadio,
  ElRadioButton,
  ElIcon,
  ElCheckboxGroup,
  ElCheckbox,
  ElDatePicker,
  ElTimePicker,
  ElTooltip,
} from "element-plus";
import TagGroup from "./TagGroup.vue";
import AvatarUploader from "./AvatarUploader.vue";
import { deresolveValue, resolveValue } from "../isValid";
import { onChange, nodeClick } from "@/utils/FormHelper";
import Button from "./Button.vue";
import RangeSelecter from "./RangeSelecter.vue";
import ColorPicker from "./ColorPicker.vue";
import FormWangeditor from "./FormWangeditor.vue";
import List from "./List.vue";
import TiniImageUploader from "./TiniImageUploader.vue";
import FormTree from "./FormTree.vue";
import Tabs from "./Tabs.vue";
import Tag from "./Tag.vue";
import { IFormDate, IFormDateRange, IFormItem, ISize } from "../../../global";
import Input from "./Input.vue";
// import IconSelector from './IconSelector.vue'
const props = defineProps<{
  modelValue?: string | number | Array<any> | Record<string, any> | boolean;
  row?: Record<string, any>;
  size?: ISize;
  config: IFormItem;
  width?: string;
}>();
const emit = defineEmits(["update:model-value", "change"]);
const computedSize = computed(() => {
  return props.config.size || props.size || "default";
});
const state = reactive<{
  value: any;
  prependVal?: any;
  appendVal?: any;
  imgActionUrl: string;
  fileActionUrl: string;
}>({
  imgActionUrl: "",
  fileActionUrl: "",
  value: resolveValue(props.config, props.modelValue),
  prependVal: props.config.prependDefault,
  appendVal: props.config.appendDefault,
});

const handleChange = (val: any) => {
  emit("update:model-value", deresolveValue(props.config, val));
  emit("change", val, props.row, props.config);
  // props.config.onChange && props.config.onChange(val, props.row, props.config, state.options)
};
const setoptionval = computed(() => {
  if (props.config.type === "select") {
    if (!props.row || !props.config.setOptionBy) return "";
    return props.row[props.config.setOptionBy];
  }
  return "";
});
watch(
  () => setoptionval.value,
  async () => {
    if (props.config.type === "select" && props.config.setOptionBy) {
      // state.value = undefined
      if (props.config.setOptionMethod) {
        props.config.setOptionMethod(props.config, props.row);
        // state.options = res
      } else {
        // state.options = []
      }
    }
  },
  { immediate: true }
);
const getDateOptions = (date: any) => {
  const item = props.config as IFormDate | IFormDateRange;
  // 2021.07.17设置时间可选范围
  if ((!item.min && !item.max) || !date) {
    return false;
  }
  if (item.min && item.min.indexOf(" ") === -1) {
    // 不设置时分秒，后面会自动加上 08:00
    item.min += " 00:00:000";
  }
  return compareDate(date, item.min) || !compareDate(date, item.max);
};
const filterNodeMethod = (value, data) => data.label?.includes(value);
const compareDate = (date1: any, date2: any) => {
  if (!date2) {
    return true;
  }
  return (
    date1.valueOf() <
    (typeof date2 === "number" ? date2 : new Date(date2).valueOf())
  );
};
watch(
  () => state.value,
  (val: string) => {
    emit("update:model-value", val);
    // emit('change', val, props.row, props.config,state.options)
    // props.config.onChange && props.config.onChange(val, props.row, props.config,state.options)
  },
  {
    deep: true,
  }
);
watch(
  () => props.modelValue,
  (val) => {
    const newVal = resolveValue(props.config, val);
    state.value = newVal;
    // if (val !== newVal) {
    // }
  },
  {
    immediate: true,
  }
);

// 年份区间相关

const pickerStartAuditYear = (value) => {
  console.log(value);

  // state.value[1] = null  开启开始年份清空结束年份
};

const pickerEndAuditYear = (value) => {
  return value.getFullYear() < parseInt(state.value[0]);
};
</script>

<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 250px;
}

.readonly-input {
  color: #ffffff;
}

.unit {
  font-style: normal;
  font-size: 14px;
  margin-right: 10px;
}

.btn-wrapper {
  width: 100%;
  display: flex;
}

:deep(.el-input--small) {
  .el-input__inner {
    height: 24px !important;
  }
}

.el-radio-button {
  :deep(.el-radio-button__inner) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}

.no-border {
  :deep(.el-input__wrapper) {
    box-shadow: none;
  }
}

:deep(.el-date-editor) {
  .el-input__wrapper {
    widows: 100%;
  }
}
</style>
