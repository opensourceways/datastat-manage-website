<script setup lang="ts">
import { queryMetricsData } from '@/api/api-sig';
import { IObject } from '@/shared/interface';
import { useCommonData } from '@/stores/common';
import { ref, watch } from 'vue';

const props = defineProps({
  internal: {
    type: Array<string>,
    default: [],
  },
});

const D0Data = ref([
  {
    key: 'users',
    name: 'D0',
    value: 0,
  },
  {
    key: 'contributors',
    name: 'D1',
    value: 0,
  },
  {
    key: 'partners',
    name: 'D2',
    value: 0,
  },
]);
const echartData = ref<IObject>({
  xAxis: [],
  yAxis: [],
});

const { community, commonParams } = useCommonData();

watch(
  () => [community.value, commonParams.value, props.internal],
  () => initData()
);

const initData = () => {
  queryData();
};

const queryData = () => {
  const param = {
    metrics: [formRadioValue.value.metrics],
    community: community.value,
    variables: {
      org: commonParams.value.org,
      internal: props.internal,
    },
    operation: formRadioValue.value.operation,
    start: commonParams.value.start,
    end: commonParams.value.end,
  };
  queryMetricsData(param).then((res) => {
    const { data } = res;
    const key = `${formRadioValue.value.metrics}_${formRadioValue.value.interval}`;
    const stat = {
      xAxis: [] as string[],
      yAxis: [] as string[],
    };
    if (data[key]) {
      data[key].forEach((item: any) => {
        stat.xAxis.push(item.date);
        stat.yAxis.push(item[formRadioValue.value.operation]);
      });
    }
    echartData.value = stat;
  });
};

const formRadioOption = [
  {
    label: '度量指标',
    id: 'metrics',
    list: [
      { label: 'D0', value: 'D0' },
      { label: 'D1', value: 'D1' },
      { label: 'D2', value: 'D2' },
    ],
  },
  {
    label: '度量维度',
    id: 'operation',
    list: [
      { label: '增量', value: 'increase' },
      { label: '总量', value: 'total' },
      { label: '当期活跃', value: 'active' },
    ],
  },
  {
    label: '间隔周期',
    id: 'interval',
    list: [
      { label: '天', value: '1d' },
      { label: '周', value: '1w' },
      { label: '月', value: '1M' },
    ],
  },
];

const formRadioValue = ref({
  metrics: 'D0',
  operation: 'increase',
  interval: '1d',
});

const seriesDialogVisible = ref(false);
const clickSeries = (res: any) => {
  seriesDialogVisible.value = true;
};
</script>
<template>
  <div class="card-grid">
    <OEchartFunnel :data="D0Data"></OEchartFunnel>
    <div>
      <OFormRadio
        v-model="formRadioValue"
        class="right-radio"
        :option="formRadioOption"
        @change="initData"
      ></OFormRadio>
      <OEchartBar
        title="开发者"
        :data="echartData"
        @click-series="clickSeries"
      ></OEchartBar>
    </div>
  </div>
  <OTableDialog v-model="seriesDialogVisible"></OTableDialog>
</template>
<style lang="scss" scoped>
.card-grid {
  display: grid;
  grid-template-columns: 35% auto;
  .right-radio {
    margin-left: 64px;
  }
}
</style>
