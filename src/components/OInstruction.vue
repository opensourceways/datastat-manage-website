<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    border
    :row-class-name="tableRowClassName"
    :header-cell-style="{ color: '#002fa7' }"
  >
    <el-table-column prop="type" label="开源社区的开发者类型" />
    <el-table-column prop="scale" label="鲲鹏/昇腾的开发者分级定义" />
    <el-table-column prop="caliber" label="开源社区对外宣传的数据口径" />
    <el-table-column prop="kpi" label="OSDT KPI指标" />
  </el-table>
</template>

<script lang="ts" setup>
interface User {
  type: string;
  scale: string;
  caliber: string;
  kpi: string;
}

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User;
  rowIndex: number;
}) => {
  if (rowIndex % 2 === 1) {
    return 'warning-row';
  } else if (rowIndex % 2 === 0) {
    return 'success-row';
  }
  return '';
};

const tableData: User[] = [
  {
    type: '狭义贡献者：合入的PR的开发者',
    scale: 'D2开发者',
    caliber: '展示为"代码贡献者"',
    kpi: '代码贡献者',
  },
  {
    type: '广义贡献者：合入PR,提交Issue,Commentissue or PR',
    scale: 'D1开发者',
    caliber: '展示为"贡献者"',
    kpi: '',
  },
  {
    type: '触达：广义贡献者 + SFW(去重)',
    scale: 'D0开发者',
    caliber: '展示为"开发者"',
    kpi: '开发者',
  },
  {
    type: 'SFW',
    scale: '',
    caliber: '内部运营管理',
    kpi: '',
  },
  {
    type: '关注社区开发者(SWF)',
    scale: '',
    caliber: '关注社区开发者(SWF)',
    kpi: '',
  },
  {
    type: '用户量(下载量)',
    scale: '',
    caliber: '展示为"用户"',
    kpi: '用户量',
  },
  {
    type: '下载IP数量',
    scale: '',
    caliber: '内部运营管理',
    kpi: '',
  },
];
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-primary);
  --el-table-row-hover-bg-color: var(--el-color-primary);
  color: #fff;
}
.el-table .success-row {
  --el-table-row-hover-bg-color: #fff;
  color: #000;
}
</style>
