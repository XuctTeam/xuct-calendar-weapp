/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-10 19:52:50
 * @LastEditTime: 2021-12-20 09:12:45
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

/**
 * 发送登录短信验证码
 * @param phone
 * @returns
 */
export const sendSmsCode = (phone: String): Promise<any> => {
  return http.post('/uaa/sms', { phone })
}

/**
 * 退出
 * @returns
 */
export const logout = (): Promise<any> => {
  return http.delete('/uaa/oauth/logout')
}

/**
 * 获取当前用户及所有认证方式
 * @returns
 */
export const userInfo = (): Promise<any> => {
  return http.get('/ums/api/app/v1/member/info/all')
}

/**
 * 获取当前用户基础信息
 * @returns
 */
export const baseUserInfo = (): Promise<any> => {
  return http.get('/ums/api/app/v1/member/info/base')
}

/**
 * 获取当前用户所有认证方式
 * @returns
 */
export const auths = (): Promise<any> => {
  return http.get('/ums/api/app/v1/member/auths')
}

/**
 * 修改密码
 * @param password
 * @returns
 */
export const password = (pwd: string): Promise<any> => {
  return http.post('/ums/api/app/v1/member/password', { password: pwd })
}

/**
 * 修改名称
 * @param name
 */
export const updateName = (name: string): Promise<any> => {
  return http.post('/ums/api/app/v1/member/name', { name })
}

/**
 * 获取微信手机号码
 * @param encryptedData
 * @param ivStr
 * @returns
 */
export const getPhoneNumber = (encryptedData: string, ivStr: string): Promise<any> => {
  return http.post('/ums/api/app/v1/member/phone/get', { encryptedData, ivStr })
}

/**
 * 绑定手机号发送短信
 * @param phone
 */
export const bindPhoneSmsCode = (edit: boolean, phone: string): Promise<any> => {
  return http.post('/ums/api/app/v1/sms/phone/bind/code', { edit, phone })
}

/**
 * 手机号绑定
 * @param phone
 * @param code
 */
export const bindPhone = (phone: string, code: string): Promise<any> => {
  return http.post('/ums/api/app/v1/member/phone/bind', { phone, code })
}

/**
 * 手机号解绑
 * @param code
 */
export const unbindPhone = (code: string): Promise<any> => {
  return http.post('/ums/api/app/v1/member/phone/unbind', { code })
}
