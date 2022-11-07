<template>
  <el-pagination
    v-if="!props.config?.hide"
    :current-page="config.page || 1"
    :page-size="config.limit || 20"
    :class="config.align || 'left'"
    :layout="config.layout || 'total,sizes, prev, pager, next, jumper'"
    :total="config.total || 0"
    :page-sizes="config.pageSize || [5, 10, 20, 50, 100]"
    @size-change="handleSize"
    @current-change="handlePage"
    @prev-click="handlePage"
    @next-click="handlePage"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElPagination } from 'element-plus'

const props = defineProps<{
  config: IPagination
  refreshData?:(pageSize: { page: number; size: number }) => any
}>()
const state = reactive<{ page: number; size: number }>({
  page: props.config.page || 1,
  size: props.config.limit || 20
})
const handlePage = (page: number) => {
  state.page = page
  if (props.refreshData) {
    props.refreshData(state)
  } else {
    props.config.handlePage && props.config.handlePage(page)
  }
}
const handleSize = (size: number) => {
  state.size = size
  if (props.refreshData) {
    props.refreshData(state)
  } else {
    props.config.handleSize && props.config.handleSize(size)
  }
}
</script>

<style lang="scss" scoped>
.left {
  text-align: left;
}
.right {
  text-align: right;
}
</style>
