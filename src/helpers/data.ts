import { isPlainObject } from './util'
//处理请求data，将data转换为JSON字符串类型
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

//处理响应data，将JSON字符串类型转换成JSON对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
