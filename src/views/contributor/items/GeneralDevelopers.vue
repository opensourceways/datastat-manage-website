<script setup lang="ts">
import { queryMetricsData } from '@/api/api-sig';
import { IObject } from '@/shared/interface';
import { formatDate } from '@/shared/utils/helper';
import { useCommonData } from '@/stores/common';
import { onMounted, ref, watch } from 'vue';
import { from, Observable } from 'rxjs';
import { mergeMap, reduce } from 'rxjs/operators';
import { throttle } from 'lodash-es';

const props = defineProps({
  internal: {
    type: Array<string>,
    default: [],
  },
});

const D0Data = ref([
  {
    key: 'D0',
    name: 'D0',
    value: 0,
    momratio: 0,
    wowratio: 0,
  },
  {
    key: 'D1',
    name: 'D1',
    value: 0,
    momratio: 0,
    wowratio: 0,
  },
  {
    key: 'D2',
    name: 'D2',
    value: 0,
    momratio: 0,
    wowratio: 0,
  },
]);
const echartData = ref<IObject>({
  xAxis: [],
  yAxis: [],
});

const { community, commonParams } = useCommonData();

onMounted(() => {
  initData();
});

watch(
  () => [community.value, commonParams.value, props.internal],
  () => initData()
);

const initData = throttle(
  function () {
    getTotalCount();
    queryDetail();
  },
  50,
  {
    leading: false,
  }
);

const getTotalCount = () => {
  // operation循环赋值请求
  const arr = ['totalCount', 'wowratio', 'momratio'];
  const operations = from(arr);
  operations
    .pipe(
      mergeMap((item) => queryTotalCount(item)),
      reduce((pre: any, next) => {
        if (pre.length && next.length) {
          pre.forEach((item: any, index: number) => {
            Object.assign(item, next[index]);
          });
        }
        return pre;
      })
    )
    .subscribe((data) => {
      if (data.length) {
        D0Data.value.forEach((item, index) => {
          const obj = data[index] || {};
          item.value = obj?.totalCount || 0;
          Object.assign(item, obj);
        });
      }
    });
};

const queryTotalCount = (operation: string) => {
  return new Observable((observe) => {
    const param = {
      metrics: ['D0', 'D1', 'D2'],
      community: community.value,
      variables: {
        org: commonParams.value.org,
        internal: props.internal,
      },
      operation,
      start: commonParams.value.start,
      end: commonParams.value.end,
    };
    queryMetricsData(param)
      .then((res) => {
        if (res?.data) {
          const {
            data: { D0 = 0, D1 = 0, D2 = 0 },
          } = res;
          const data = [D0, D1, D2].map((item) => ({
            [operation]: item,
          }));
          observe.next(data);
          observe.complete();
        } else {
          observe.next([]);
          observe.complete();
        }
      })
      .catch(() => {
        observe.next([]);
        observe.complete();
      });
  });
};

const queryDetail = () => {
  const param = {
    metrics: [formRadioValue.value.metrics],
    community: community.value,
    variables: {
      org: commonParams.value.org,
      internal: props.internal,
      interval: formRadioValue.value.interval,
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

const tableData = ref([]);
const seriesDialogVisible = ref(false);
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
      org: commonParams.value.org,
      internal: props.internal,
      interval: formRadioValue.value.interval,
    },
    operation: `${formRadioValue.value.operation}Detail`,
    start: start,
    end: start + timeObj[formRadioValue.value.interval],
  };
  queryMetricsData(param).then((res) => {
    seriesDialogVisible.value = true;
    const { data = {} } = res || {};
    if (data[formRadioValue.value.metrics]) {
      tableData.value = data[formRadioValue.value.metrics].map(
        (item: string) => ({
          name: item,
        })
      );
    }
  });
};
</script>
<template>
  <div class="card-grid">
    <OChartFunnel :data="D0Data"></OChartFunnel>
    <div>
      <OFormRadio
        v-model="formRadioValue"
        class="right-radio"
        :option="formRadioOption"
        @change="initData"
      ></OFormRadio>
      <OChartBar
        title="开发者"
        :data="echartData"
        @click-series="clickSeries"
      ></OChartBar>
    </div>
  </div>
  <OTableDialog v-model="seriesDialogVisible" :data="tableData"></OTableDialog>
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
