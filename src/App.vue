<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppAside from '@/components/AppAside.vue';
import { refreshInfo } from './shared/utils/login';

refreshInfo();
</script>

<template>
  <AppHeader />
  <main>
    <AppAside />
    <div class="app-view-block">
      <router-view />
    </div>
  </main>
  <footer></footer>
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  position: relative;
  min-height: calc(100vh - 80px);
  background-color: var(--o-color-bg1);
  margin-top: 80px;
  overflow: hidden;
  display: grid;
  grid-template-columns: max-content auto;

  @media (max-width: 1100px) {
    margin-top: 48px;
  }
}
</style>
