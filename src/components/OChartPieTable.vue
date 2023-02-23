<script setup lang="ts">
import OChartPie from './OChartPie.vue';
import OChartPieOfTable from './OChartPieOfTable.vue';
import { ref } from 'vue';
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  data: {
    type: Array<any>,
    required: true,
  },
  width: {
    type: String,
    default: '300px',
  },
  height: {
    type: String,
    default: '300px',
  },
  title: {
    type: String,
    default: '',
  },
  onlyValue: {
    type: Boolean,
    default: false,
  },
});
const pieEchart = ref<null | any>(null);

const dispatchAction = (data: any) => {
  pieEchart.value.dispatchAction(data);
};
</script>
<template>
  <div class="pieTable">
    <OChartPie
      :id="id"
      ref="pieEchart"
      :data="data"
      :title="title"
      :width="width"
      :height="height"
    ></OChartPie>
    <OChartPieOfTable
      class="table"
      :data="data"
      :only-value="onlyValue"
      @dispatch-action="dispatchAction"
    ></OChartPieOfTable>
  </div>
</template>
<style lang="scss" scoped>
.pieTable {
  display: flex;
}
.table {
  margin-left: 16px;
}
</style>
