/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-04 09:12:17
 * @LastEditTime: 2022-01-07 15:57:07
 * @LastEditors: Derek Xu
 */
declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd'
    [key: string]: any
  }
}
