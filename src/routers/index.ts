import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import TheOverview from '@/views/overview/TheOverview.vue';
import TheUsers from '@/views/users/TheUsers.vue';
import TheDeveloper from '@/views/developer/TheDeveloper.vue';
import TheOrganization from '@/views/organization/TheOrganization.vue';
import TheSigs from '@/views/sigs/TheSigs.vue';
import TheWarehouse from '@/views/warehouse/TheWarehouse.vue';
import { useCommonData } from '@/stores/common';

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/overview' },
  {
    path: '/overview',
    name: 'overview',
    component: TheOverview,
  },
  {
    path: '/users',
    name: 'users',
    component: TheUsers,
  },
  {
    path: '/developer',
    name: 'developer',
    component: TheDeveloper,
  },
  {
    path: '/organization',
    name: 'organization',
    component: TheOrganization,
  },
  {
    path: '/sigs',
    name: 'sigs',
    component: TheSigs,
  },
  {
    path: '/warehouse',
    name: 'warehouse',
    component: TheWarehouse,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// 路由守卫，可在此处进行页面权限处理
router.beforeEach((to, from, next) => {
  const { selectAsideItem } = useCommonData();
  selectAsideItem.value = to.path;
  next();
});
