<script setup lang="ts">
import { queryMetricsData } from '@/api/api-sig';
import { IObject } from '@/shared/interface';
import { formatDate } from '@/shared/utils/helper';
import { useCommonData } from '@/stores/common';
import { computed, onMounted, ref, watch } from 'vue';
import { throttle } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FormRadioConfig } from '@/shared/formRadio.interface';

const props = defineProps({
  commonParams: {
    type: Object,
    default: () => ({}),
  },
});

const echartData = ref<IObject>({
  xAxis: [],
  series: [],
});

const { community } = useCommonData();

onMounted(() => {
  init();
});

watch(
  () => [community.value, props.commonParams],
  () => init(),
  { deep: true }
);

const init = throttle(
  function () {
    initData();
  },
  50,
  {
    leading: false,
  }
);

const initData = () => {
  queryDetail()
    .pipe(
      mergeMap((item: any) => {
        const _echartData = {
          xAxis: [],
          series: [] as any,
        };
        const { xAxis, ...series } = item;
        _echartData.xAxis = xAxis;
        _echartData.series.push(series);
        return of(_echartData);
      })
    )
    .subscribe((data: any) => {
      echartData.value = data;
    });
};

const queryDetail = () => {
  return new Observable((observe) => {
    const param = {
      metrics: [formRadioValue.value.metrics],
      community: community.value,
      variables: {
        oversea: props.commonParams.oversea,
        interval: formRadioValue.value.interval,
      },
      operation: formRadioValue.value.operation,
      start: props.commonParams.start,
      end: props.commonParams.end,
    };
    const stat = {
      name: getTitle.value,
      xAxis: [] as string[],
      data: [] as any[],
    };
    queryMetricsData(param)
      .then((res) => {
        const { data } = res;
        const key = `${formRadioValue.value.metrics}_${formRadioValue.value.interval}`;
        if (data[key]) {
          data[key].forEach((item: any) => {
            stat.xAxis.push(formatDate(item.date));
            stat.data.push({
              value: Math.round(item[formRadioValue.value.operation]),
              date: item.date,
            });
          });
        }
        observe.next(stat);
        observe.complete();
      })
      .catch(() => {
        observe.next(stat);
        observe.complete();
      });
  });
};

const getTitle = computed(
  () =>
    formRadioOption[0].options.find(
      (item) => item.value === formRadioValue.value.metrics
    )?.label
);

const formRadioOption: FormRadioConfig[] = [
  {
    label: '??????',
    id: 'metrics',
    options: [
      { label: '?????????(?????????)', value: 'download_count' },
      { label: '??????IP???', value: 'download_ip' },
    ],
  },
  {
    label: '????????????',
    id: 'operation',
    options: [
      { label: '??????', value: 'increase' },
      { label: '??????', value: 'total' },
    ],
  },
  {
    label: '????????????',
    id: 'interval',
    options: [
      { label: '???', value: '1d' },
      { label: '???', value: '1w' },
      { label: '???', value: '1M' },
    ],
  },
];

const formRadioValue = ref({
  metrics: 'download_count',
  operation: 'increase',
  interval: '1d',
});
</script>
<template>
  <div>
    <OFormRadio
      v-model="formRadioValue"
      class="right-radio"
      :option="formRadioOption"
      @change="initData"
    ></OFormRadio>
    <OChartBar :title="getTitle" :data="echartData"></OChartBar>
  </div>
</template>
<style lang="scss" scoped></style>
