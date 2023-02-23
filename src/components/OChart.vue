<script setup lang="ts">
import { ECHARTOPTION } from '@/shared/common.const';
import * as echarts from 'echarts';
import { nanoid } from 'nanoid';
import { onMounted, ref, shallowRef, watch } from 'vue';
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
const myChart = shallowRef<EChartsType | null>(null);
const initEchart = () => {
  if (!myChart.value) {
    const chartDom = document.getElementById(props.id || defaultId.value);
    if (chartDom) {
      myChart.value = echarts.init(chartDom);
    }
  }
  const option = {
    ...ECHARTOPTION,
    ...props.option,
  };
  myChart.value?.clear();
  myChart.value?.setOption(option);
  myChart.value?.off('click');
  myChart.value?.on('click', 'series', function (param: any) {
    emits('clickSeries', param);
  });
};

</script>
<template>
  <div :id="id || defaultId" :style="{ width, height }"></div>
</template>
