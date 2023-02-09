<script lang="ts" setup>
import { IObject } from '@/shared/interface';
import { toRefs, ref } from 'vue';
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  option: {
    type: Array<IObject>,
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
  <div>
    <div v-for="(item, index) in option" :key="item.id">
      <div v-if="division && index" class="line"></div>
      <div class="group-radio">
        <p class="label">{{ item.label }}</p>
        <el-radio-group v-model="form[item.id]" @change="changeRadio">
          <el-radio
            v-for="list in item.list"
            :key="list.id"
            border
            :label="list.value"
          >
            {{ list.label }}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
      <slot name="searchInput"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line {
  border-bottom: 1px solid var(--o-color-division1);
  margin-bottom: 18px;
}
.group-radio {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  .label {
    margin-right: 24px;
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
