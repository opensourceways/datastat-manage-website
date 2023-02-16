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
