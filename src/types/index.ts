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
  headers?: any,
  responseType?: XMLHttpRequestResponseType//指定ajax的响应的数据类型
}
export interface AxiosResponse {
  data: any;                   //返回的数据
  status: number;              //状态码
  statusText: string;          //状态消息
  headers: any;                //响应头
  config: AxiosRequestConfig;  //请求配置对象config
  request: any;                //请求的 XMLHttpRequest 对象实例 request
}
//继承Promise的构造函数，声明其返回值的泛型类型
export interface AxiosPromise extends Promise<AxiosResponse> {

}