export interface ProTableColConfig {
  // 列唯一标识字符
  key: string;
  // 列表头名字
  label: string;
  // 过滤方式
  filtersConfig?: ProTableFilterConfig;
}

// 过滤方式
interface ProTableFilterConfig {
  search?: boolean;
  select?: SelectOptionConfig;
}

export type SelectOptionConfig = Option;

export interface OptionItem {
  value: string;
  label: string;
}

export interface Option {
  options: OptionItem[];
}
