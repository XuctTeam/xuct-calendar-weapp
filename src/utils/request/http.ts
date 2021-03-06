/*
 * @Description: 封装请求参数

 * @Author: Derek Xu
 * @Date: 2021-11-09 09:14:24
 * @LastEditTime: 2022-04-12 13:49:30
 * @LastEditors: Derek Xu
 */
import Taro from '@tarojs/taro'

import interceptors from './customInterceptor'
import { storage } from '../taro'
import { base64 } from '../utils'

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem))

type RequestOpts = Omit<Taro.request.Option, 'url'>
type IAnyObject = Record<string, any>
type IReqData = string | IAnyObject | ArrayBuffer | any

//@ts-ignore
const BASE_URL = SERVICES_API

class httpRequest<T> {
  baseOptions(url: string, options: RequestOpts): Taro.RequestTask<T> {
    const header: IAnyObject = { 'Content-Type': 'application/json', ...options?.header }

    if (!(url.includes('/uaa/sms') || url.includes('/uaa/captcha') || url.includes('/register'))) {
      /* 非登录接口都要通过token请求 */
      if (!url.includes('/oauth/token')) {
        header['Authorization'] = storage('accessToken')
      } else {
        header['Authorization'] = this._getAuthorization()
      }
    }
    if (options.header) delete options.header
    return Taro.request({ url: BASE_URL + url, method: 'GET', ...options, header })
  }

  get(url: string, data?: IReqData): Taro.RequestTask<T> {
    return this.baseOptions(url, data ? { method: 'GET', data } : { method: 'GET' })
  }

  post(url: string, data: IReqData, contentType: string = 'application/json'): Taro.RequestTask<T> {
    return this.baseOptions(url, { method: 'POST', data, header: { 'Content-Type': contentType } })
  }

  put(url: string, data: IReqData): Taro.RequestTask<T> {
    return this.baseOptions(url, { method: 'PUT', data })
  }

  delete(url: string, data?: IReqData): Taro.RequestTask<T> {
    return this.baseOptions(url, data ? { method: 'DELETE', data } : { method: 'DELETE' })
  }

  exchage(url: string, opt: RequestOpts): Taro.RequestTask<T> {
    return this.baseOptions(url, opt)
  }

  /**
   * 读取认证客户端地址
   */
  _getAuthorization = () => {
    //@ts-ignore
    return 'Basic ' + base64(CLIENT_INFO.CLIENT_ID + ':' + CLIENT_INFO.CLIENT_SECURITY)
  }
}

export default httpRequest
