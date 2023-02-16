<script setup lang="ts">
import OLabel from '@/components/OLabel.vue';
import { onMounted, ref } from 'vue';
import { useCommonData } from '@/stores/common';

const selectValue = ref('all');

// 默认最近一个月时间
const timeRange = ref<number[]>([]);
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

const commonParams = useCommonData();
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
      <ODatePicker v-model="timeRange" />
    </OLabel>
  </div>
  <router-view />
</template>

<style lang="scss" scoped>
.content-header {
  display: flex;
  margin-bottom: var(--o-spacing-h4);
}
</style>
