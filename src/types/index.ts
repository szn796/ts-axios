//字符串字面量类型（模拟字符串枚举）
export type Method = 'get' | 'GET'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
export interface AxiosRequestConfig {
  url: string,
  method?: Method,
  data?: any,      //data是添加到请求体（body）中的， 用于post请求。
  params?: any,     //params是添加到url的请求字符串中的，用于get请求。
  headers?: any
}