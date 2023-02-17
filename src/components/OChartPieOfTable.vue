<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
const props = defineProps({
  data: {
    type: Array<any>,
    required: true,
  },
  width: {
    type: String,
    default: '350px',
  },
  height: {
    type: String,
    default: '580px',
  },
  onlyValue: {
    type: Boolean,
    default: false,
  },
});
watch(
  () => props.data,
  () => initTableData(),
  { deep: true }
);
onMounted(() => {
  initTableData();
});
const tableData = ref<any>([]);
const initTableData = () => {
  const arr = props.data || [];
  if (tableData.value.length) {
    tableData.value.forEach((item: any) => {
      const findone = arr.find((it) => it.name === item.name);
      item.value = findone?.value || 0;
    });
  } else {
    tableData.value = arr.map((item) => ({
      ...item,
      selected: true,
    }));
  }
  sortTableDataValue();
  calcTableDataPercent();
};
const calcTableDataPercent = () => {
  // 总数
  const total = tableData.value.reduce((pre: number, next: any) => {
    if (next.selected) {
      pre += next.value;
    }
    return pre;
  }, 0);
  tableData.value.forEach((item: any) => {
    item.percent = Math.round((item.value / total) * 10000) / 100 + '%';
  });
};

const sortValue = ref(true);
const sortTableDataValue = () => {
  tableData.value.sort((a: any, b: any) =>
    sortValue.value ? b.value - a.value : a.value - b.value
  );
};
const clickSort = () => {
  sortValue.value = !sortValue.value;
  sortTableDataValue();
};

const emits = defineEmits(['dispatchAction']);
const clickItem = (data: any) => {
  data.selected = !data.selected;
  calcTableDataPercent();
  emits('dispatchAction', data);
};
</script>
<template>
  <div class="table">
    <table cellspacing="0" cellpadding="10px" :style="{ width: width }">
      <thead class="bgcolor">
        <th align="left" class="border padcell"></th>
        <th align="right" class="border padcell">
          Value
          <span v-if="onlyValue" class="cursor" @click="clickSort">
            {{ sortValue ? '▼' : '▲' }}
          </span>
        </th>
        <th v-if="!onlyValue" align="right" class="border padcell">Percent</th>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.name">
          <td class="border padcell cursor align" @click="clickItem(item)">
            <div
              class="color-block"
              :style="{
                'background-color': item.selected ? item.color : '#ccc',
              }"
            ></div>
            <span>
              {{ item.name }}
            </span>
          </td>
          <td class="border padcell" align="right">
            {{ item.value }}
          </td>
          <td v-if="!onlyValue" class="border padcell" align="right">
            {{ item.selected ? item.percent : '--' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
.table {
  font-size: var(--o-font-size-tip);
  color: #4e5865;
  th {
    font-weight: 500;
  }
}
.color-block {
  width: var(--o-spacing-h6);
  height: 4px;
  margin-right: 8px;
}
.border {
  border-bottom: 1px solid var(--o-color-border2);
}
.padcell {
  padding: var(--o-spacing-h6) var(--o-spacing-h5);
}
.cursor {
  cursor: pointer;
}
.align {
  display: flex;
  align-items: center;
}
</style>
