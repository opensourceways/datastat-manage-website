<script setup lang="ts">
import { ref } from 'vue';

const D0Data = ref([
  {
    key: 'users',
    name: '用户量（下载量）',
    value: 0,
  },
  {
    key: 'contributors',
    name: '下载IP数',
    value: 0,
  },
]);

const getParams = (val: any) => {
  console.log(val);
};
</script>
<template>
  <div class="card-grid">
    <div>
      <div v-for="item in D0Data" :key="item.key">
        <OChartText :data="item"></OChartText>
      </div>
    </div>
    <div>
      <OFormRadio class="right-radio" @change="getParams"></OFormRadio>
      <OChartBar></OChartBar>
    </div>
  </div>
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
