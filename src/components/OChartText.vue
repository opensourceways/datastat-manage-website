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
    required: true,
  },
  width: {
    type: String,
    default: '400px',
  },
  height: {
    type: String,
    default: '160px',
  },
});
const getOption = (): EChartsOption => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    title: [
      {
        text: props.data.name,
        left: '15%',
        top: '11%',
        textStyle: {
          fontSize: 24,
          color: '#4F4F4F',
        },
        textAlign: 'left',
      },
      {
        text: props.data.value,
        left: '34%',
        top: '40%',
        textStyle: {
          fontSize: 22,
          color: '#222222',
        },
        textAlign: 'left',
      },
      {
        text: '周环比: ',
        left: '38%',
        top: '68%',
        textStyle: {
          fontSize: 10,
          color: '#4F4F4F',
        },
        textAlign: 'center',
      },
      {
        text: `▲ 50%`,
        left: '60%',
        top: '65%',
        textStyle: {
          fontSize: 15,
          color: '#EB2A0A',
        },
        textAlign: 'center',
      },
      {
        text: '月环比: ',
        left: '38%',
        top: '86%',
        textStyle: {
          fontSize: 10,
          color: '#4F4F4F',
        },
        textAlign: 'center',
      },
      {
        text: `▼ 50%`,
        left: '60%',
        top: '85%',
        textStyle: {
          fontSize: 15,
          color: '#2BEB0C',
        },
        textAlign: 'center',
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
</script>
<template>
  <OChart
    :id="id"
    :option="(option as EChartsOption)"
    :width="width"
    :height="height"
  ></OChart>
</template>
