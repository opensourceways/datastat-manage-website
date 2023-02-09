<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElTableColumn class="o-table-column" v-bind="attrs">
    <template v-if="$slots.header" #header>
      <slot name="header"></slot>
    </template>
  </ElTableColumn>
</template>

<style lang="scss"></style>
