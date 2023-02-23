/**
 * 判断是否是移动端
 */
export const testIsPhone = () => {
  return /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
};

// 格式化数字 K
export function formatNumber(key: number) {
  let num: number | string = 0;
  if (key === undefined) {
    num = 0;
  } else {
    num = key >= 1e3 ? `${parseInt(`${(key / 1e3) * 10}`) / 10}K` : key;
  }

  return num;
}

// 获取时间格式YY-MM-DD
export function formatDate(date: number | string) {
  const time = new Date(date);
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
}

// 格式化数字1000=>1,000
export function toThousands(key: number | 0) {
  let num: number | string = 0;
  if (key === undefined) {
    num = 0;
  } else {
    num = Number(key).toLocaleString('en-US');
  }
  return num;
}

// 获取当前日期 yy-mm-dd
export const getNowFormatDate = () => {
  const date = new Date();
  const seperator1 = '-';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const yearStr = `${year}`;
  let monthStr = `${month}`;
  let dayStr = `${day}`;

  if (month >= 1 && month <= 9) {
    monthStr = `0${month}`;
  }
  if (day >= 0 && day <= 9) {
    dayStr = `0${day}`;
  }
  const currentdate = yearStr + seperator1 + monthStr + seperator1 + dayStr;
  return currentdate;
};

/**
 * @param num 被除数
 * @param total 总数
 * @param decimal 保留几位小数
 */
export function calcRatio(
  num: number | string,
  total: number | string,
  decimal = 2
) {
  const _num = Number(num) || 0;
  const _total = Number(total) || 1;
  return (
    Math.round((_num / _total) * Math.pow(10, decimal + 2)) /
      Math.pow(10, decimal) +
    '%'
  );
}
