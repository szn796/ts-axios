import xhr from './xhr'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data';
import { processHeaders } from './helpers/header'


function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}


/*  */
//对 config 中的数据做处理，除了对 url 和 params 处理之外，未来还会处理其它属性
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}
//transformURL用于处理config.url数据
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}
//给请求headers设置正确的Content-Type
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}
//调用帮助类的处理响应数据方法
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
export default axios