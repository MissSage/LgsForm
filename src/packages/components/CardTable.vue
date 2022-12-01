<template>
  <SLCard
    class="table-card"
    :title="config.title || !!config.titleRight?.length"
  >
    <template
      v-if="config.title || config.titleRight?.length"
      #title
    >
      <slot name="title">
        <div
          id="title"
          class="title-wrapper"
        >
          <span
            v-if="config.title"
            class="title"
          >{{ config.title }}</span>
          <div
            v-if="config.titleRight?.length"
            class="right-wrapper"
          >
            <template
              v-for="(rightitem, k) in config.titleRight"
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
                    v-model="state.titleQueryParams[obj.field]"
                    :config="obj"
                    @change="(val: any) => config.handleQuery &&config.handleQuery(val,obj)"
                  />
                  <FormItem
                    v-else
                    :config="obj"
                    @change="(val: any) => config.handleQuery &&config.handleQuery(val,obj)"
                  />
                </template>
              </div>
            </template>
          </div>
        </div>
      </slot>
    </template>
    <FormTable
      ref="refTable"
      :config="config"
      :in-card="true"
    />
  </SLCard>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'
import SLCard from './SLCard.vue'
import FormTable from './FormTable.vue'
import FormItem from './FormItem.vue'

defineProps<{
  config: __lgsform.ICardTable
}>()
const refTable = ref<InstanceType<typeof FormTable>>()
const state = reactive<{
  titleQueryParams: any
}>({
  titleQueryParams: {}
})
// const exportTable = () => {
//   refTable.value && refTable.value.exportTable()
// }
const getTable = () => {
  return refTable.value && refTable.value.refElTable
}
defineExpose({
  refTable,
  getTable,
  // exportTable,
  ...toRefs(state)
})
</script>
<style lang="scss" scoped>
.table-card {
  :deep(.el-card__body) {
    height: 100%;
    padding: 0;
  }
}
.title-wrapper,
.right-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
}
.title {
  white-space: nowrap;
  word-break: keep-all;
  color: #a0a6c5;
  font-size: 18px;
}
.right-wrapper {
  width: 100%;
}
</style>
