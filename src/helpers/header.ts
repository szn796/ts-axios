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
export function normalizeHeaders(headers: any, normalizedName: string): any {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  })
}

//将一行一行的headers解析为对象结构
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }
  //   '\r\n'表示回城换行
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();
    if (!key) return //进行下一个
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  })
  return parsed;
}