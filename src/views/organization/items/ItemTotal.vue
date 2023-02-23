<script setup lang="ts">
import { queryMetricsData } from '@/api/api-sig';
import { useCommonData } from '@/stores/common';
import { onMounted, ref, watch } from 'vue';
import { throttle } from 'lodash-es';
import { from, Observable, zip } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const props = defineProps({
  commonParams: {
    type: Object,
    default: () => ({}),
  },
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
  // const arr = ['totalCount', 'wowratio', 'momratio'];
  const arr = ['totalCount'];
  const operations = from(arr);
  operations.pipe(mergeMap((item) => queryTotal(item)));
};

const queryTotal = (operation: string) => {
  return new Observable((observe) => {
    const param = {
      metrics: ['download_count', 'download_ip'],
      community: community.value,
      variables: {
        oversea: props.commonParams.oversea,
      },
      operation,
      start: props.commonParams.start,
      end: props.commonParams.end,
    };
    queryMetricsData(param)
      .then((res) => {
        const data = res?.data || {};
        observe.next(data);
        observe.complete();
      })
      .catch(() => {
        observe.next({});
        observe.complete();
      });
  });
};

const titalData = ref([
  {
    label: '组织总数',
    value: 0,
  },
  {
    label: '访客数(UV)',
    value: 0,
  },
]);
</script>
<template>
  <OTextTitle :data="titalData"></OTextTitle>
</template>
