<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
});
</script>
<template>
  <OCard>
    <div class="card-header">
      <h3>
        <slot name="title">
          <span>{{ title }}</span>
        </slot>
      </h3>
    </div>
    <slot name="content"></slot>
  </OCard>
</template>

<style lang="scss" scoped>
.card-header {
  margin-bottom: var(--o-spacing-h4);
  padding-bottom: var(--o-spacing-h4);
  border-bottom: 1px solid var(--o-color-division1);
}
</style>
