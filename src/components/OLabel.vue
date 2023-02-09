<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
    default: '',
  },
});
</script>
<template>
  <div class="o-label">
    <div class="o-name">{{ name }}:</div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.o-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--o-font-size-text);
}
</style>
