/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao
 * date: 2018/4/25
 */
import Request, { Params } from '@sitb/wbs/utils/Request';
import { getAccessToken, getAgencyId } from './SessionServices';
import { queryToObjectWithUrl, urlArgs } from '@sitb/wbs/utils/HttpUtil';

export async function execute({headers, url, method, ...args}: Params) {
  const newHeaders: any = {
    ...headers,
    authorization: `Bearer ${getAccessToken()}`,
    ['X-Agency-ID']: getAgencyId()
  };
  let newUrl = url;
  let newArgs: any = Object.assign({}, args);
  // get请求 统一添加size  sort
  if (!method || method === 'GET') {
    if (url.includes('?')) {
      // 截取搜索参数
      let params = queryToObjectWithUrl(url) || {};
      params.size = params.size || (global as any).size || 10;
      params.sort = params.sort || 'id,desc';
      newUrl = `${url.substr(0, url.indexOf('?'))}?${urlArgs(params)}`;
    }
  }
  return await Request.execute({
    ...newArgs,
    url: newUrl,
    method,
    credentials: 'include',
    headers: newHeaders
  });
}
