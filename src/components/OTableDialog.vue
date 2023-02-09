<script setup lang="ts">
import { ProTableColConfig } from '@/shared/protable.interface';
import { computed } from 'vue';
import OProTable from './OProTable.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  // 必传，用于记忆缓存列显示隐藏
  id: {
    type: String,
    required: true,
    default: '',
  },
  data: {
    type: Array<any>,
    required: true,
    default: [
      {
        name: '1',
        value: 3,
      },
      {
        name: '2',
        value: 4,
      },
    ],
  },
  tableConfig: {
    type: Array<ProTableColConfig>,
    default: [
      {
        key: 'name',
        label: '名称',
        filtersConfig: {
          search: true,
        },
      },
      {
        key: 'value',
        label: 'Value',
        filtersConfig: {
          search: true,
        },
      },
    ],
  },
});
const visible = computed(() => props.modelValue);
const emits = defineEmits(['update:modelValue']);
const close = () => {
  emits('update:modelValue', false);
};
</script>
<template>
  <ODialog
    v-model="visible"
    title="用户"
    :destroy-on-close="true"
    width="40%"
    @close="close"
  >
    <OProTable :id="id" :data="data" :table-config="tableConfig"></OProTable>
  </ODialog>
</template>
