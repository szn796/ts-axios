
import { AxiosRequestConfig } from './types'
function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config;
  const request = new XMLHttpRequest();
  //方法必须大写，地址，是否异步（默认是）
  request.open(method.toUpperCase(), url, true);
  Object.keys(headers).forEach(name => {
    //当我们传入的 data 为空的时候，请求 header 配置 Content-Type 是没有意义的，于是我们把它删除。
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name];
    } else {
      request.setRequestHeader(name, headers[name]);
    }
  })
  request.send(data);
}
export default xhr;
