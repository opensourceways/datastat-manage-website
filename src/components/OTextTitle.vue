<script setup lang="ts">
import { OptionItem } from '@/shared/interface';

defineProps({
  data: {
    type: Array<OptionItem>,
    default: [],
  },
});
</script>
<template>
  <div class="box">
    <div v-for="item in data" :key="item.value" class="box-item">
      <div>{{ item.label }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@mixin text {
  width: max-content;
  line-height: 32px;
  text-align: center;
}
.box {
  display: grid;
  grid-template-columns: 400px repeat(auto-fill, 240px);
  .box-item {
    @include text;
    &:not(:first-child) {
      border-left: 1px solid var(--o-color-border2);
      padding-left: var(--o-spacing-h4);
      > div:first-child {
        font-size: var(--o-font-size-h8);
        font-weight: normal;
        color: var(--o-color-text3);
      }
    }
  }

}
</style>
