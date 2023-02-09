<script setup lang="ts">
import { formatNumber } from '@/shared/utils/helper';
import { computed } from 'vue';

const data = [
  {
    company_en: 'Huawei Technologies Co., Ltd.',
    company_cn: '华为技术有限公司',
    contribute: 907,
    index: 1,
  },
  {
    company_en: '北京凝思软件股份有限公司',
    company_cn: '北京凝思软件股份有限公司',
    contribute: 619,
    index: 2,
  },
  {
    company_en: '北京凝思软件股份有限公司',
    company_cn: '北京凝思软件股份有限公司',
    contribute: 619,
    index: 2,
  },
  {
    company_en: '北京凝思软件股份有限公司',
    company_cn: '北京凝思软件股份有限公司',
    contribute: 619,
    index: 2,
  },
  {
    company_en: '北京凝思软件股份有限公司',
    company_cn: '北京凝思软件股份有限公司',
    contribute: 619,
    index: 2,
  },
  {
    company_en: '北京凝思软件股份有限公司',
    company_cn: '北京凝思软件股份有限公司',
    contribute: 619,
    index: 2,
  },
  {
    company_en: '北京凝思软件股份有限公司',
    company_cn: '北京凝思软件股份有限公司',
    contribute: 619,
    index: 2,
  },
];
// 个人信息
const progressFormat = (item: number) => {
  return (100 / maxNum.value) * item;
};

const maxNum = computed(() => {
  return Math.max(...data.map((it) => it.contribute));
});

// el-tooltip
const showAfter = 200;
</script>

<template>
  <div class="bar-panel">
    <el-scrollbar height="250px">
      <ul class="bar-content">
        <template v-for="(item, index) in data" :key="'com' + index">
          <p class="infos">
            <span class="index">{{ item.index }}</span>
            <span
              class="name"
              :style="{
                color: '#555555',
              }"
              >{{ item.company_cn }}</span
            >
          </p>

          <el-tooltip
            placement="bottom-start"
            effect="light"
            :show-after="showAfter"
            popper-class="bar-tooltip"
            :show-arrow="false"
          >
            <template #content>
              <div class="lable"></div>
              <div class="info">
                <p>
                  <span class="index">{{ item.index }}</span>

                  {{ item.company_cn }}
                </p>
                <span class="num">{{ item.contribute }} </span>
              </div>
            </template>
            <div class="progress">
              <div
                class="progress-inner"
                :style="{
                  width: progressFormat(item.contribute) + '%',
                }"
              >
                <span v-if="progressFormat(item.contribute) > 80">{{
                  formatNumber(item.contribute)
                }}</span>
              </div>
              <span v-if="progressFormat(item.contribute) < 80" class="val">{{
                formatNumber(item.contribute)
              }}</span>
            </div>
          </el-tooltip>
        </template>
      </ul>
    </el-scrollbar>
    <div class="bar-columns">
      <div class="num"><span>0</span></div>
      <div class="num">
        <span>{{ formatNumber(maxNum / 2) }}</span>
      </div>
      <div class="num">
        <span>{{ formatNumber(maxNum) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bar-panel {
  position: relative;
  padding-bottom: 12px;
  padding-top: 12px;

  .bar-columns {
    position: absolute;
    bottom: -3px;
    top: 0;
    left: 222px;
    display: flex;
    justify-content: space-between;
    right: 12px;
    .num {
      color: #9097a3;
      font-size: 12px;
      position: relative;
      display: flex;
      align-items: end;
      min-width: 8px;
      &::after {
        position: absolute;
        top: 12px;
        left: 48%;
        width: 1px;
        border-left: 1px dashed #ccc;
        bottom: 20px;
        content: '';
      }
      &:last-child {
        &::after {
          left: inherit;
          right: 0;
        }
      }
    }
  }
}
.bar-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 210px auto;
  grid-gap: 16px;
  padding-right: 12px;
  .infos {
    font-size: 16px;
    color: #000000;
    line-height: 22px;
    display: flex;
    .index {
      width: 16px;
      margin-right: 8px;
      color: #9097a3;
      text-align: center;
    }
    .name {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.progress {
  height: 24px;
  display: flex;
  width: 100%;
  align-items: center;
  &-inner {
    background: #002fa7;
    box-shadow: 4px 8px 12px 0px rgba(0, 92, 219, 0.25);
    font-size: 12px;
    color: #fff;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 0px;
    transition: all 0.3s ease-in-out;
    span {
      padding-right: 8px;
    }
  }
  .val {
    color: #000;
    font-size: 12px;
    margin-left: 8px;
  }
}
.bar-tooltip {
  padding: 12px 16px;
  box-shadow: 4px 8px 16px 0px rgba(10, 11, 13, 0.05),
    0px 0px 32px 0px rgba(10, 11, 13, 0.1);

  .lable {
    color: #9097a3;
    font-weight: bold;
    .text {
      font-weight: 100;
    }
  }
  .info {
    color: #4e5865;
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    min-width: 280px;
    .index {
      color: #9097a3;
    }
    .num {
      font-size: 16px;
      color: #000000;
      margin-left: 40px;
      .percentage {
        margin-left: 10px;
        font-size: 12px;
        color: #4e5865;
      }
    }
  }
}
</style>
