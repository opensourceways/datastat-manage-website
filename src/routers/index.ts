import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import TheActivity from '@/views/activity/TheActivity.vue';
import TheContribution from '@/views/contribution/TheContribution.vue';
import TheContributor from '@/views/contributor/TheContributor.vue';
import TheOrganization from '@/views/organization/TheOrganization.vue';
import TheOthers from '@/views/others/TheOthers.vue';
import TheProject from '@/views/project/TheProject.vue';
import { useCommonData } from '@/stores/common';

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/contributor' },
  {
    path: '/contributor',
    name: 'contributor',
    component: TheContributor,
  },
  {
    path: '/organization',
    name: 'organization',
    component: TheOrganization,
  },
  {
    path: '/project',
    name: 'project',
    component: TheProject,
  },
  {
    path: '/activity',
    name: 'activity',
    component: TheActivity,
  },
  {
    path: '/contribution',
    name: 'contribution',
    component: TheContribution,
  },
  {
    path: '/others',
    name: 'others',
    component: TheOthers,
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
