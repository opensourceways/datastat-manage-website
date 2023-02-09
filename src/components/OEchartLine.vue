<script setup lang="ts">
import { ref, watch } from 'vue';
import OEchart from './OEchart.vue';
type EChartsOption = echarts.EChartsOption;
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  data: {
    type: Array<any>,
    default: [],
  },
  width: {
    type: String,
    default: '950px',
  },
  height: {
    type: String,
    default: '300px',
  },
  title: {
    type: String,
    default: '开发者（D0当期活跃）',
  },
});
const getOption = (): EChartsOption => {
  return {
    title: {
      text: props.title,
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: true },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '开发者',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
      },
    ],
  };
};
const option = ref({} as EChartsOption);
option.value = getOption();
watch(
  () => props.data,
  () => (option.value = getOption()),
  { deep: true }
);
const clickSeries = (res: any) => {
  console.log(res);
};
</script>
<template>
  <o-echart
    :id="id"
    :option="(option as EChartsOption)"
    :width="width"
    :height="height"
    @click-series="clickSeries"
  ></o-echart>
</template>
