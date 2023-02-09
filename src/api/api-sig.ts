import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 查询社区贡献
 *
 */
export function queryMetricsData(params: any) {
  const name = params.community;
  const url = `/query/metrics/data?community=${name}`;
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 查询社区贡献
 */
export function queryCompanyContribute(params: object) {
  const url = '/query/company/contribute';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}
