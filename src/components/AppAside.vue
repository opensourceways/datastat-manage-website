<script setup lang="ts">
import { useCommonData } from '@/stores/common';
import { computed, ref } from 'vue';
import IconLeft from '~icons/app/icon-chevron-left.svg';
import IconRight from '~icons/app/icon-chevron-right.svg';
import IconMenu from '~icons/app/icon-menu.svg';
import IconHome from '~icons/app/icon-home.svg';
import IconMail from '~icons/app/icon-mail.svg';
import IconTime from '~icons/app/icon-time.svg';
import IconComment from '~icons/app/icon-comment.svg';
import IconLink from '~icons/app/icon-link.svg';
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
      <el-menu-item index="/overview">
        <el-icon>
          <OIcon>
            <IconLink></IconLink>
          </OIcon>
        </el-icon>
        <span>总览</span>
      </el-menu-item>
      <el-menu-item index="/users">
        <el-icon>
          <OIcon>
            <IconComment></IconComment>
          </OIcon>
        </el-icon>
        <span>社区用户</span>
      </el-menu-item>
      <el-menu-item index="/developer">
        <el-icon>
          <OIcon>
            <IconMenu></IconMenu>
          </OIcon>
        </el-icon>
        <span>开发者</span>
      </el-menu-item>
      <!-- <el-sub-menu index="/users">
        <template #title>
          <el-icon>
            <OIcon>
              <IconMenu></IconMenu>
            </OIcon>
          </el-icon>
          <span>社区用户</span>
        </template>
        <el-menu-item index="/contributor">总览</el-menu-item>
      </el-sub-menu> -->
      <el-menu-item index="/organization">
        <el-icon>
          <OIcon>
            <IconHome></IconHome>
          </OIcon>
        </el-icon>
        <span>组织分析</span>
      </el-menu-item>
      <el-menu-item index="/sigs">
        <el-icon>
          <OIcon>
            <IconMail></IconMail>
          </OIcon>
        </el-icon>
        <span>SIG分析</span>
      </el-menu-item>
      <el-menu-item index="/warehouse">
        <el-icon>
          <OIcon>
            <IconTime></IconTime>
          </OIcon>
        </el-icon>
        <span>仓库分析</span>
      </el-menu-item>
      <!-- <el-menu-item index="/contribution">
        <el-icon>
          <OIcon>
            <IconComment></IconComment>
          </OIcon>
        </el-icon>
        <span>社区贡献详情</span>
      </el-menu-item>
      <el-menu-item index="/others">
        <el-icon>
          <OIcon>
            <IconLink></IconLink>
          </OIcon>
        </el-icon>
        <span>社区其他详情</span>
      </el-menu-item> -->
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
.app-aside-menu:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
</style>
