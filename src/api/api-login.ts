import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 获取授权的相关回调链接
 */
export function queryCourse(params: object) {
  const url = '/oneid/user/permission';
  return request
    .get(url, { params, global: true })
    .then((res: AxiosResponse) => res.data);
}
/**
 * 获取授权的相关回调链接
 */
export function refreshUser(params: object) {
  const url = '/oneid/user/refresh';
  return request
    .get(url, { params, global: true })
    .then((res: AxiosResponse) => res.data);
}
/**
 * 获取idtoken用于退出
 */
export function queryIDToken(params: any) {
  const url = '/oneid/logout';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}
