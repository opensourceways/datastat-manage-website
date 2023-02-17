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
  data: {
    type: Array<any>,
    required: true,
  },
  config: {
    type: Array<EChartsOption>,
    default: {},
  },
  width: {
    type: String,
    default: '500px',
  },
  height: {
    type: String,
    default: '580px',
  },
});
const defaultId = ref(nanoid());
watch(
  () => props.data,
  () => initEchart(),
  { deep: true }
);
onMounted(() => {
  initEchart();
});
const getOption = (): EChartsOption => {
  return {
    title: {
      text: '合入PR个数',
      left: 'right',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      show: false,
    },
    series: [
      {
        name: '合入PR个数',
        type: 'pie',
        radius: ['0%', '70%'],
        data: props.data.map((item) => ({
          value: item.value,
          name: item.name,
        })),
        label: {
          position: 'inner',
          fontSize: 12,
          lineHeight: 16,
          formatter: function (info) {
            return `${info.name}\n${info.percent}%`;
          },
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
};
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
    ...getOption(),
    ...props.config,
  };
  myChart.setOption(option);
};
const dispatchAction = (data: any) => {
  myChart.dispatchAction({
    type: 'legendToggleSelect',
    // 图例名称
    name: data.name,
  });
};
defineExpose({ dispatchAction });
</script>
<template>
  <div :id="id || defaultId" :style="{ width, height }"></div>
</template>
