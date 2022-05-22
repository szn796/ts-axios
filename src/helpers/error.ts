import { AxiosRequestConfig, AxiosResponse } from '../types'
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    //当Ts的类继承Error\Array\Map时，在类中定义的方法，不会被绑定到类的实例上
    //所以手动绑定
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
//为了方便使用，对外暴露了一个 createError 的工厂方法
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response);
  return error
}