<script setup lang="ts">
import { ref, watch } from 'vue';
import OChart from './OChart.vue';
type EChartsOption = echarts.EChartsOption;
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => ({
      xAxis: [],
      series: [],
    }),
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '300px',
  },
  title: {
    type: String,
    default: '',
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
    grid: {
      left: 80,
      right: 20,
    },
    legend: {
      data: props.data.series.map((item: any) => item.name),
      bottom: 10,
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
      data: props.data.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: props.data.series.map((item: any) => ({
      ...item,
      type: item.type || 'bar',
    })),
  };
};
const option = ref({} as EChartsOption);
option.value = getOption();
watch(
  () => props.data,
  () => (option.value = getOption()),
  { deep: true }
);
const emits = defineEmits(['clickSeries']);
const clickSeries = (res: any) => {
  emits('clickSeries', res);
};
</script>
<template>
  <OChart
    :id="id"
    :option="(option as EChartsOption)"
    :width="width"
    :height="height"
    @click-series="clickSeries"
  ></OChart>
</template>
