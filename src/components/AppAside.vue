<script setup lang="ts">
import { useCommonData } from '@/stores/common';
import { computed, ref } from 'vue';
import IconLeft from '~icons/app/icon-chevron-left.svg';
import IconRight from '~icons/app/icon-chevron-right.svg';
const { selectAsideItem } = useCommonData();
const collapse = ref(false);
const collapseBtn = computed(() => (collapse.value ? IconRight : IconLeft));
const clickCollapse = () => {
  collapse.value = !collapse.value;
};
</script>
<template>
  <div class="app-aside">
    <el-menu
      :default-active="selectAsideItem"
      :router="true"
      :collapse="collapse"
      class="app-aside-menu"
    >
      <el-sub-menu index="/1">
        <template #title>
          <span>社区组织</span>
        </template>
        <el-menu-item index="/1-4-1">item</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/contributor">
        <span>社区贡献者</span>
      </el-menu-item>
      <el-menu-item index="/organization">
        <span>社区组织</span>
      </el-menu-item>
      <el-menu-item index="/project">
        <span>社区项目</span>
      </el-menu-item>
      <el-menu-item index="/activity">
        <span>社区活动</span>
      </el-menu-item>
      <el-menu-item index="/contribution">
        <span>社区贡献详情</span>
      </el-menu-item>
      <el-menu-item index="/others">
        <span>社区其他详情</span>
      </el-menu-item>
    </el-menu>
    <div class="collapseBtn">
      <OIcon class="icon" @click="clickCollapse">
        <component :is="collapseBtn"></component>
      </OIcon>
    </div>
  </div>
</template>
<style scoped lang="scss">
.app-aside {
  min-height: calc(100vh - 80px);
  background-color: var(--o-color-bg2);
  position: relative;
  .el-sub-menu .el-menu-item {
    min-width: auto;
  }
  .collapseBtn {
    position: absolute;
    right: -15px;
    top: 60px;
    width: var(--o-spacing-h4);
    height: var(--o-spacing-h4);
    border-radius: 50%;
    background-color: var(--o-color-bg2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .icon {
      font-size: var(--o-font-size-h8);
      color: var(--o-color-text1);
    }
  }
}
</style>
