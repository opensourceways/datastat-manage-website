export interface IObject<T = any> {
  [key: string]: T;
}

export interface OptionItem {
  value: string;
  label: string;
}

export interface Option {
  options: OptionItem[];
}
