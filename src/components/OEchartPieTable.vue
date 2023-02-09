<script setup lang="ts">
import OEchartPie from './OEchartPie.vue';
import OEchartPieOfTable from './OEchartPieOfTable.vue';
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
    default: '500px',
  },
  height: {
    type: String,
    default: '580px',
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
    <OEchartPie
      :id="id"
      ref="pieEchart"
      :data="data"
      :width="width"
      :height="height"
    ></OEchartPie>
    <OEchartPieOfTable
      class="table"
      :data="data"
      :only-value="onlyValue"
      @dispatch-action="dispatchAction"
    ></OEchartPieOfTable>
  </div>
</template>
<style lang="scss" scoped>
.pieTable {
  display: flex;
}
.table {
  margin-left: 100px;
}
</style>
