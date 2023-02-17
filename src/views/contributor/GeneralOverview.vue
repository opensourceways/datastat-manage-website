<script setup lang="ts">
import OChartPieTable from '@/components/OChartPieTable.vue';
import OProTable from '@/components/OProTable.vue';
import OLabel from '@/components/OLabel.vue';
import MoreCard from './MoreCard.vue';
import GeneralDevelopers from './items/GeneralDevelopers.vue';
import GeneralUsers from './items/GeneralUsers.vue';
import GeneralMembers from './items/GeneralMembers.vue';
import GeneralSigs from './items/GeneralSigs.vue';
import { queryCompanyContribute } from '@/api/api-sig';
import { computed, onMounted, ref } from 'vue';
import { ECHARTOPTION } from '@/shared/common.const';
import { ProTableColConfig } from '@/shared/protable.interface';
const props = defineProps({
  name: {
    type: String,
    required: true,
    default: '',
  },
});
onMounted(() => {
  initData();
});

const initData = () => {
  queryCompany();
};

const companyContribute = ref<any>([]);
const queryCompany = () => {
  const param = {
    community: 'openeuler',
    contributeType: 'pr',
    timeRange: 'all',
  };
  const obj = {
    huawei: {
      name: '华为',
      value: 0,
    },
    partner: {
      name: '华为合作方',
      value: 0,
    },
    company: {
      name: '企业',
      value: 0,
    },
    user: {
      name: '个人贡献者',
      value: 0,
    },
    student: {
      name: '学生',
      value: 0,
    },
  };
  queryCompanyContribute(param).then((res) => {
    const { data } = res;
    data.forEach((item: any) => {
      if (item.company_cn === '华为技术有限公司') {
        obj.huawei.value += item.contribute;
      } else if (item.company_cn === '个人贡献者') {
        obj.user.value += item.contribute;
      } else if (item.company_cn.includes('学')) {
        obj.student.value += item.contribute;
      } else if (item.company_cn.includes('公司')) {
        obj.company.value += item.contribute;
      } else {
        obj.partner.value += item.contribute;
      }
    });
    companyContribute.value = Object.values(obj).map((item, index) => ({
      ...item,
      color: ECHARTOPTION.color[index],
    }));
  });
};

// table
const proTableData = [
  {
    name: '1',
    size: '2',
    age: '30',
  },
  {
    name: '2',
    size: '2io',
    age: '30',
  },
  {
    name: '3',
    size: '2q',
    age: '20',
  },
  {
    name: '4',
    size: '2a',
    age: '20',
  },
  {
    name: '5',
    size: '2sad',
    age: '30',
  },
  {
    name: '6',
    size: '2qw',
    age: '40',
  },
];
const proTableConfig: ProTableColConfig[] = [
  {
    key: 'name',
    label: '姓名',
    filtersConfig: {
      search: true,
    },
  },
  {
    key: 'size',
    label: '尺寸',
  },
  {
    key: 'age',
    label: '年龄',
    filtersConfig: {
      select: {
        options: [
          {
            value: '20',
            label: '20',
          },
          {
            value: '30',
            label: '30',
          },
          {
            value: '40',
            label: '40',
          },
        ],
      },
    },
  },
];
const selectInsider = ref('all');
const insiderOption = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: '0',
    label: '内部人员',
  },
  {
    value: '1',
    label: '外部人员',
  },
];
const selectInsiderProp = computed(() => {
  if (selectInsider.value === 'all') {
    return insiderOption.map((item) => item.value).slice(1);
  }
  return [selectInsider.value];
});
</script>
<template>
  <MoreCard class="morecard-gap">
    <template #header>
      <OLabel name="内部外部人员">
        <OSelect v-model="selectInsider">
          <OOption
            v-for="item in insiderOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </OSelect>
      </OLabel>
    </template>
    <template #content>
      <GeneralDevelopers :internal="selectInsiderProp"></GeneralDevelopers>
    </template>
  </MoreCard>
  <MoreCard class="morecard-gap">
    <template #header>
      <OLabel name="海内外下载">
        <OSelect v-model="selectInsider">
          <OOption
            v-for="item in insiderOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </OSelect>
      </OLabel>
    </template>
    <template #content>
      <GeneralUsers></GeneralUsers>
    </template>
  </MoreCard>
  <MoreCard class="morecard-gap">
    <template #content>
      <GeneralMembers></GeneralMembers>
    </template>
  </MoreCard>
  <MoreCard class="morecard-gap">
    <template #content>
      <GeneralSigs></GeneralSigs>
    </template>
  </MoreCard>
  <div class="content-body">
    <OCard class="card pie-table">
      <OProTable
        id="contributorProtable"
        :data="proTableData"
        :table-config="proTableConfig"
      ></OProTable>
    </OCard>
    <OCard class="card pie-table">
      <OChartPieTable
        id="contributorPieTable"
        :data="companyContribute"
      ></OChartPieTable>
    </OCard>
    <OCard class="card pie-table">
      <OChartPieTable
        id="contributorPieTable1"
        :data="companyContribute"
        :only-value="true"
      ></OChartPieTable>
    </OCard>
  </div>
</template>

<style lang="scss" scoped>
.morecard-gap {
  margin-bottom: 24px;
}
.content-body {
  display: grid;
  grid-template-columns: max-content max-content auto;
  grid-auto-flow: row;
  grid-gap: 10px;
  .develop-card {
    display: grid;
    grid-gap: 10px;
  }
  .pie-table {
    grid-column-start: span 2;
  }
}
</style>
