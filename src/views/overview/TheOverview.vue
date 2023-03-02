<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import OBanner from '@/components/OBanner.vue';
import { toThousands } from '@/shared/utils/helper';
import homeBanner from '@/assets/bg.png';
import homeBannerGauss from '@/assets/bgGauss.png';
import { queryAll } from '@/api/api-overview';
import { getNowFormatDate } from '@/shared/utils/helper';
import { useCommonData } from '@/stores/common';
import { throttle } from 'lodash-es';
const router = useRouter();
const goTo = (item: any) => {
  router.push({
    path: `/${item}`,
  });
};
const { community } = useCommonData();
const png = ref();
const src = ref();
const changePng = () => {
  if (community.value === 'openeuler') {
    png.value = homeBanner;
    src.value =
      'https://datastat.obs.cn-north-4.myhuaweicloud.com/datastat-openeuler-home.mp4';
  } else {
    png.value = homeBannerGauss;
    src.value =
      'https://datastat.obs.cn-north-4.myhuaweicloud.com/datastat-opengauss-home.mp4';
  }
};
watch(
  () => community.value,
  () => initData(),
  { deep: true }
);

const allData = ref();
const time = ref('--');
const getTime = () => {
  time.value = getNowFormatDate();
};
const data = ref<any>({
  users: '',
  contributors: '',
  sigs: '',
  prs: '',
  issues: '',
  comments: '',
  repos: '',
  partners: '',
});
const getAllData = () => {
  queryAll(community.value).then((res) => {
    allData.value = res.data;
    data.value.users = toThousands(allData.value.users);
    data.value.contributors = toThousands(allData.value.contributors);
    data.value.sigs = toThousands(allData.value.sigs);
    data.value.prs = toThousands(allData.value.prs);
    data.value.issues = toThousands(allData.value.issues);
    data.value.comments = toThousands(allData.value.comments);
    data.value.repos = toThousands(allData.value.repos);
    data.value.partners = toThousands(allData.value.partners);
  });
};

const initData = throttle(
  function () {
    getAllData();
    getTime();
    changePng();
  },
  50,
  {
    leading: false,
  }
);
initData();

// 获取数据
onMounted(() => {
  initData();
});
</script>

<template>
  <o-banner class="home-banner">
    <div class="banner-content">
      <div class="community-content">
        <div class="community-info" @click="goTo('users')">
          <p class="title">社区用户 User</p>
          <p class="num">{{ data.users }}</p>
        </div>
        <div class="community-info" @click="goTo('developer')">
          <p class="title">贡献者 Contributor</p>
          <p class="num">
            {{ data.contributors }}
          </p>
        </div>
        <div class="community-info" @click="goTo('organization')">
          <p class="title">单位会员 Organization Member</p>
          <p class="num">{{ data.partners }}</p>
        </div>
        <div class="community-panel">
          <div class="community-info" @click="goTo('warehouse')">
            <p class="title">合并请求 PR</p>
            <p class="num">{{ data.prs }}</p>
          </div>
          <div class="community-info" @click="goTo('warehouse')">
            <p class="title">需求&问题 Issue</p>
            <p class="num">{{ data.issues }}</p>
          </div>
          <div class="community-info" @click="goTo('warehouse')">
            <p class="title">评审 Comment</p>
            <p class="num">{{ data.comments }}</p>
          </div>
          <div class="community-info" @click="goTo('sigs')">
            <p class="title">特别兴趣小组 SIG</p>
            <p class="num">{{ data.sigs }}</p>
          </div>
          <div class="community-info" @click="goTo('warehouse')">
            <p class="title">代码仓库 Repository</p>
            <p class="num">{{ data.repos }}</p>
          </div>
        </div>
      </div>
      <p class="time">{{ time }}</p>
    </div>

    <template #video>
      <video
        class="bg-video"
        :src="src"
        :poster="png"
        autoplay
        loop
        muted
        controlslist="nodownload nofullscreen"
        x5-playsinline="true"
        playsinline="true"
        webkit-playsinline="true"
      ></video>
    </template>
  </o-banner>
</template>

<style lang="scss" scoped>
.bg-video {
  height: 100vh;
}
.banner-content {
  padding: 100px 0;
  color: #ffffff;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .community-content {
    display: grid;
    height: 100%;
    align-items: center;

    .title {
      font-size: 24px;
      line-height: 24px;
      color: #fff;
      cursor: pointer;
    }
    .num {
      font-size: 64px;
      color: #fff;
      line-height: 84px;
      font-weight: 400;
      cursor: pointer;

    }
    .community-info {
      text-align: left;
    }
    .community-panel {
      display: flex;
      .community-info {
        margin-bottom: 0;
        margin-right: 64px;
        text-align: left;
      }
      .title {
        font-size: 16px;
        color: #d3dce9;
      }
      .num {
        font-size: 40px;
        line-height: 48px;

      }
    }
  }

  .time {
    display: inline-block;
    font-size: 12px;
    color: #ffffff;
    line-height: 16px;
    opacity: 0.8;
  }

  .more {
    position: absolute;
    bottom: 20px;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    cursor: pointer;
    color: #fff;
    p {
      font-size: 16px;
      color: #fff;
      line-height: 24px;
      // opacity: 0.6;
      font-weight: 100;
    }
    .icon {
      animation: chevronsDown 2s infinite;
      display: inline-block;
      // opacity: 0.6;
    }
  }
}
</style>
