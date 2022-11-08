<template>
  <SLCard class="card-search-box">
    <Search
      ref="refSearch"
      :config="config"
    ></Search>
  </SLCard>
</template>
<script lang="ts" setup>
import { ISearch } from '../../..';
import { computed, ref } from 'vue'
import Search from './Search.vue'
import SLCard from './SLCard.vue'

defineProps<{ config: ISearch }>()
const refSearch = ref<InstanceType<typeof Search>>()
const toggleMore = () => {
  refSearch.value?.toggleMore()
}
const queryParams = computed(() => refSearch.value?.queryParams)
const resetForm = () => {
  refSearch.value?.resetForm()
}
defineExpose({
  queryParams,
  toggleMore,
  resetForm
})
</script>
<style lang="scss" scoped>
.card-search-box {
  margin-bottom: 15px;
}
</style>
