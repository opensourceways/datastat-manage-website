<script setup lang="ts">
import { ECHARTOPTION } from '@/shared/common.const';
import * as echarts from 'echarts';
import { nanoid } from 'nanoid';
import { onMounted, ref, watch } from 'vue';
type EChartsOption = echarts.EChartsOption;
type EChartsType = echarts.EChartsType;
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  option: {
    type: Object as () => EChartsOption,
    required: true,
    default: {} as EChartsOption,
  },
  width: {
    type: String,
    default: '200px',
  },
  height: {
    type: String,
    default: '200px',
  },
});
const defaultId = ref(nanoid());
watch(
  () => props.option,
  () => initEchart(),
  { deep: true }
);
onMounted(() => {
  initEchart();
});
const emits = defineEmits(['clickSeries']);
let myChart: EChartsType;
const initEchart = () => {
  if (!myChart) {
    const chartDom = document.getElementById(props.id || defaultId.value);
    if (chartDom) {
      myChart = echarts.init(chartDom);
    }
  }
  const option = {
    ...ECHARTOPTION,
    ...props.option,
  };
  myChart.setOption(option);
  myChart.off('click');
  myChart.on('click', 'series', function (param: any) {
    emits('clickSeries', param);
  });
};

</script>
<template>
  <div :id="id || defaultId" :style="{ width, height }"></div>
</template>
