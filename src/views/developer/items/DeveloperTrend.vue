<script setup lang="ts">
import { queryMetricsData } from '@/api/api-sig';
import { IObject } from '@/shared/interface';
import { formatDate } from '@/shared/utils/helper';
import { useCommonData } from '@/stores/common';
import { onMounted, ref, watch } from 'vue';
import { throttle } from 'lodash-es';

const props = defineProps({
  commonParams: {
    type: Object,
    default: () => ({}),
  },
});

const echartData = ref<IObject>({
  xAxis: [],
  yAxis: [],
});

const { community } = useCommonData();

onMounted(() => {
  initData();
});

watch(
  () => [community.value, props.commonParams],
  () => initData(),
  { deep: true }
);

const initData = throttle(
  function () {
    queryDetail();
  },
  50,
  {
    leading: false,
  }
);

const queryDetail = () => {
  const param = {
    metrics: [formRadioValue.value.metrics],
    community: community.value,
    variables: {
      org: props.commonParams.org,
      internal: props.commonParams.internal,
      interval: formRadioValue.value.interval,
    },
    operation: formRadioValue.value.operation,
    start: props.commonParams.start,
    end: props.commonParams.end,
  };
  queryMetricsData(param).then((res) => {
    const { data } = res;
    const key = `${formRadioValue.value.metrics}_${formRadioValue.value.interval}`;
    const stat = {
      xAxis: [] as string[],
      yAxis: [] as any[],
    };
    if (data[key]) {
      data[key].forEach((item: any) => {
        stat.xAxis.push(formatDate(item.date));
        stat.yAxis.push({
          value: item[formRadioValue.value.operation],
          date: item.date,
        });
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

const clickSeries = (res: any) => {
  const start = res?.data.date || 0;
  const timeObj: any = {
    '1d': 24 * 60 * 60 * 1000,
    '1w': 24 * 60 * 60 * 1000,
    '1M': 24 * 60 * 60 * 1000,
  };
  const param = {
    metrics: [formRadioValue.value.metrics],
    community: community.value,
    variables: {
      org: props.commonParams.org,
      internal: props.commonParams.internal,
      interval: formRadioValue.value.interval,
    },
    operation: `${formRadioValue.value.operation}Detail`,
    start: start,
    end: start + timeObj[formRadioValue.value.interval],
  };
  queryMetricsData(param).then((res) => {
    const { data = {} } = res || {};
    if (data[formRadioValue.value.metrics]) {
      data[formRadioValue.value.metrics].map((item: string) => ({
        name: item,
      }));
    }
  });
};
</script>
<template>
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
</template>
<style lang="scss" scoped>
.right-radio {
  margin-left: 64px;
}
</style>
