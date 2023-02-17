<script setup lang="ts">
import { ref } from 'vue';

const getParams = (val: any) => {
  console.log(val);
};
</script>
<template>
  <div class="card-grid">
    <div>
      <OFormRadio @change="getParams">
        <template #searchInput><OSearch></OSearch></template>
      </OFormRadio>
      <OBar> </OBar>
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
