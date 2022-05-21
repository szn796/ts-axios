import { isPlainObject } from './util'
//将请求头内容更新为
//'Content-Type': 'application/json;charset=utf-8'
export function processHeaders(headers: any, data: any): any {
  normalizeHeaders(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers;
}

//将header请求头标准格式化为'Content-Type'
export function normalizeHeaders(headers: any, normalizeName: string): any {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name];
      delete headers[name];
    }
  })
}