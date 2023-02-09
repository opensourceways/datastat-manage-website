<script setup lang="ts">
import OLabel from '@/components/OLabel.vue';
import GeneralOverview from './GeneralOverview.vue';
import { onMounted, ref } from 'vue';
import { useCommonData } from '@/stores/common';

const selectValue = ref('all');

// 默认最近一个月时间
const timeRange = ref<[Date, Date]>([
  new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),
  new Date(),
]);
const communityOption = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'src-openeuler',
    label: 'src-openeuler',
  },
  {
    value: 'openeuler',
    label: 'openeuler',
  },
];

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
  {
    text: '最近一年',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
      return [start, end];
    },
  },
];

const { commonParams } = useCommonData();
onMounted(() => {
  initSelect();
});
// 设置搜索值
const initSelect = () => {
  const obj = {
    org: getOrg(),
    start: new Date(timeRange.value[0]).getTime(),
    end: new Date(timeRange.value[1]).getTime(),
  };
  commonParams.value = obj;
};
const getOrg = (): string[] => {
  if (selectValue.value === 'all') {
    return communityOption.map((item) => item.value).slice(1);
  }
  return [selectValue.value];
};
</script>

<template>
  <div class="content-header">
    <OLabel name="组织名称" style="margin-right: 24px">
      <OSelect v-model="selectValue" @change="initSelect">
        <OOption
          v-for="item in communityOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </OSelect>
    </OLabel>
    <OLabel name="时间">
      <el-date-picker
        v-model="timeRange"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="To"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="initSelect"
      />
    </OLabel>
  </div>
  <GeneralOverview></GeneralOverview>
</template>

<style lang="scss" scoped>
.content-header {
  display: flex;
  margin-bottom: var(--o-spacing-h4);
}
</style>
