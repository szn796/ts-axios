
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/header'
function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config;
    const request = new XMLHttpRequest();
    //设置响应类型
    if (responseType) {
      request.responseType = responseType;
    }
    //设置超时时间，默认为0，则无超时处理
    if (timeout) {
      request.timeout = timeout;
    }
    //方法必须大写，地址，是否异步（默认是）
    request.open(method.toUpperCase(), url, true);

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }
      //在请求完成前，status的值为0。如果 XMLHttpRequest 出错，浏览器返回的 status 也为0。
      if (request.status === 0) {
        return
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
      handleResponse(response);
    }
    //处理网络请求错误
    request.onerror = function handleError() {
      reject(new Error('Network Error'));
    }
    //处理网络请求超时
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout}ms exceeded`));
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
    //处理状态非2XX错误
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed with status ${response.status}`))
      }
    }
  })


}
export default xhr;
