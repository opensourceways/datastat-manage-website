<script lang="ts" setup>
import { FormRadioConfig } from '@/shared/formRadio.interface';
import { toRefs, ref } from 'vue';
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  option: {
    type: Array<FormRadioConfig>,
    default: [],
  },
  // 展示分割线
  division: {
    type: Boolean,
    default: false,
  },
});
const { option, modelValue } = toRefs(props);

const changeRadio = () => {
  emits('update:modelValue', form.value);
  emits('change', form.value);
};
const emits = defineEmits(['change', 'update:modelValue']);

// 动态计算参数赋值
const form = ref(
  option.value.reduce((pre: any, next: any) => {
    pre[next.id] = modelValue.value[next.id];
    return pre;
  }, {})
);
</script>

<template>
  <div class="group-radio">
    <template v-for="(item, index) in option" :key="item.id">
      <div v-if="division && index" class="line"></div>
      <p class="label">{{ item.label }}</p>
      <OSelect
        v-if="item.type === 'select'"
        v-model="form[item.id]"
        class="select"
        @change="changeRadio"
      >
        <OOption
          v-for="list in item.options"
          :key="list.value"
          :label="list.label"
          :value="list.value"
        />
      </OSelect>
      <el-radio-group
        v-else
        v-model="form[item.id]"
        class="select"
        @change="changeRadio"
      >
        <el-radio
          v-for="list in item.options"
          :key="list.value"
          border
          :label="list.value"
        >
          {{ list.label }}
        </el-radio>
      </el-radio-group>
    </template>
    <div class="input">
      <slot name="searchInput"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line {
  border-bottom: 1px solid var(--o-color-division1);
  grid-column-start: span 3;
}
.group-radio {
  display: grid;
  grid-template-columns: max-content max-content auto;
  align-items: center;
  margin-bottom: 16px;
  gap: 16px 24px;
  .label {
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .select {
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .input {
    grid-column-start: 2;
    grid-column-end: 4;
  }
  :deep(.el-radio) {
    border-radius: 0;
    margin-right: 12px;
    border: 1px solid transparent;
    height: 28px;
    padding: 0 12px;
    .el-radio__label {
      color: var(--o-color-text4);
      font-weight: normal;
      padding: 0;
    }
    &.is-checked .el-radio__label {
      color: var(--o-color-brand1);
    }
    &.is-checked {
      border-color: var(--o-color-brand1);
    }
    .el-radio__input {
      display: none;
    }
  }
}
</style>
