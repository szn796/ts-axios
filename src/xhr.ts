
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/header'
function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    const { data = null, url, method = 'get', headers, responseType } = config;
    const request = new XMLHttpRequest();
    if (responseType) {
      request.responseType = responseType;
    }
    //方法必须大写，地址，是否异步（默认是）
    request.open(method.toUpperCase(), url, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response);
    }

    //处理请求header
    Object.keys(headers).forEach(name => {
      //当我们传入的 data 为空的时候，请求 header 配置 Content-Type 是没有意义的，于是我们把它删除。
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    })
    request.send(data);
  })

}
export default xhr;
