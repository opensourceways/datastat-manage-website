<script setup lang="ts">
/* 定制化支持跳转更多的card */

defineProps({
  name: {
    type: String,
    required: true,
    default: '',
  },
});

const emits = defineEmits(['clickMore']);
const clickMore = () => {
  emits('clickMore');
};
</script>
<template>
  <OCard>
    <div class="card-header">
      <slot name="header">
        <div></div>
      </slot>
      <a @click="clickMore">更多</a>
    </div>
    <slot name="content"></slot>
  </OCard>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--o-spacing-h4);
  padding-bottom: var(--o-spacing-h4);
  border-bottom: 1px solid var(--o-color-division1);
}
</style>
