/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-03 09:31:21
 * @LastEditTime: 2021-12-03 09:51:16
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'
/**
 * 微信登录
 *
 * @param code
 * @returns ILoginData
 */
export const wechatLogin = (code: string, iv: string, encryptedData: string): Promise<any> => {
  return http.post(
    '/uaa/oauth/token',
    {
      grant_type: 'wechat',
      code,
      iv,
      encryptedData
    },
    'application/x-www-form-urlencoded; charset=UTF-8'
  )
}

/**
 * 电话号码登录
 * @param phone
 * @param code
 * @returns
 */
export const phoneLogin = (phone: string, code: string): Promise<any> => {
  return http.post(
    '/uaa/oauth/token',
    {
      grant_type: 'phone',
      mobile: phone,
      code
    },
    'application/x-www-form-urlencoded; charset=UTF-8'
  )
}

/**
 * 账号密码登录
 * @param username
 * @param password
 * @returns
 */
export const usernameLogin = (username: string, password: string): Promise<any> => {
  return http.post(
    '/uaa/oauth/token',
    {
      grant_type: 'password',
      username,
      password
    },
    'application/x-www-form-urlencoded; charset=UTF-8'
  )
}

/**
 * 刷新token
 * @param refresh_token
 * @returns
 */
export const tokenRefresh = (refresh_token: string): Promise<any> => {
  return http.post(
    '/uaa/oauth/token',
    {
      grant_type: 'refresh_token',
      refresh_token
    },
    'application/x-www-form-urlencoded; charset=UTF-8'
  )
}
