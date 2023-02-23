<script setup lang="ts">
import { queryMetricsData } from '@/api/api-sig';
import { IObject } from '@/shared/interface';
import { ProTableColConfig } from '@/shared/protable.interface';
import { calcRatio } from '@/shared/utils/helper';
import { useCommonData } from '@/stores/common';
import { throttle } from 'lodash-es';
import { from, Observable } from 'rxjs';
import { concatMap, reduce } from 'rxjs/operators';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  // 必传，用于记忆缓存列显示隐藏
  id: {
    type: String,
    required: true,
    default: '',
  },
  commonParams: {
    type: Object,
    default: () => ({}),
  },
});
const { community } = useCommonData();

const termsObj: IObject = {
  huawei: '华为',
  enterprise: '企业',
  student: '学生',
  partners: '合作方',
  independent: '个人',
};

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
  queryCompanyContribute();
};

// table
const proTableData = ref<IObject[]>([]);
const proTableConfig: ProTableColConfig[] = [
  {
    key: 'type',
    label: '组织类型',
  },
  {
    key: 'developer',
    label: '开发者贡献',
    children: [
      {
        key: 'pr_ratio',
        label: 'PR',
      },
      {
        key: 'issue_ratio',
        label: 'Issue',
      },
      {
        key: 'comment_ratio',
        label: 'Comment',
      },
    ],
  },
];

const queryCompanyContribute = () => {
  queryTermsOfTotalCount().subscribe((data) => {
    let pr_total = 0;
    let issue_total = 0;
    let comment_total = 0;
    data.forEach((item) => {
      pr_total += item.pr;
      issue_total += item.issue;
      comment_total += item.comment;
    });
    proTableData.value = data.map((item) => ({
      type: termsObj[item.term] || '',
      pr_ratio: `${item.pr} (${calcRatio(item.pr, pr_total)})`,
      issue_ratio: `${item.issue} (${calcRatio(item.issue, issue_total)})`,
      comment_ratio: `${item.comment} (${calcRatio(
        item.comment,
        comment_total
      )})`,
      ...item,
    }));
  });
};

const queryTermsOfTotalCount = () => {
  const terms = from(Object.keys(termsObj));
  return terms.pipe(
    concatMap(queryTotalCount),
    reduce((pre, next: any) => {
      if (Object.keys(next)?.length) {
        pre.push(next);
      }
      return pre;
    }, [] as any[])
  );
};

const queryTotalCount = (term: string) => {
  return new Observable((observe) => {
    const param = {
      metrics: ['pr', 'issue', 'comment'],
      community: community.value,
      variables: {
        org: props.commonParams.org,
        internal: props.commonParams.internal,
        term,
      },
      operation: 'totalCount',
      start: props.commonParams.start,
      end: props.commonParams.end,
    };
    queryMetricsData(param)
      .then((res) => {
        const { data } = res;
        if (data instanceof Object) {
          const obj = Object.fromEntries(
            Object.entries(data).map((item) => {
              item[0] = item[0].replace(`${term}_`, '');
              return item;
            })
          );
          observe.next({ term, ...obj });
        } else {
          observe.next({});
        }
        observe.complete();
      })
      .catch(() => {
        observe.next({});
        observe.complete();
      });
  });
};
</script>
<template>
  <div>
    <OProTable
      :id="id"
      :data="proTableData"
      :table-config="proTableConfig"
    ></OProTable>
  </div>
</template>
