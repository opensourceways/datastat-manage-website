import { useCommon } from '@/stores/common';

// 返回接口报错信息
export function callBackErrMessage(err: any) {
  let _msg = '';
  if (err.response && (err.response?.data as any)?.msg) {
    const msg = (err.response?.data as any)?.msg;
    if (Object.prototype.toString.call(msg) === '[object String]') {
      _msg = msg;
    } else if (Object.prototype.toString.call(msg) === '[object Object]') {
      const { message_en, message_zh } = msg;
      const common = useCommon();
      _msg = common.lang === 'zh' ? message_zh : message_en;
    }
  }
  return _msg;
}

type TO_STRING_TYPE =
  | 'String'
  | 'Boolean'
  | 'String'
  | 'Number'
  | 'Function'
  | 'Undefined'
  | 'Null'
  | 'RegExp'
  | 'Object'
  | 'Array';
export function _toString(val: any): TO_STRING_TYPE {
  return Object.prototype.toString.call(val).slice(8, -1) as TO_STRING_TYPE;
}

// 判断类型
export function determiningType(val: any, type: TO_STRING_TYPE): boolean {
  return _toString(val) === type;
}

// 组装url
export function getUrlByParams(url: string, params: any): string {
  if (!determiningType(params, 'Object')) {
    return url;
  }
  const searh = Object.entries(params).reduce((pre, next) => {
    if (pre) {
      pre += '&';
    }
    pre += `${next[0]}=${next[1]}`;
    return pre;
  }, '');
  return `${url}${searh ? '?' : ''}${searh}`;
}

// 取出url中的param值
export function getParamsFromUrl(uri?: string) {
  const url = uri || location.href;
  const search = url.split('?')[1] || '';
  if (search) {
    return search.split('&').reduce((pre: any, next) => {
      const arr = next.split('=');
      pre[arr[0]] = arr[1];
      return pre;
    }, {});
  }
  return {};
}
