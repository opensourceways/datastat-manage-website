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
  id: {
    type: String,
    default: '',
  },
  data: {
    type: Array<any>,
    required: true,
    default: [],
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
