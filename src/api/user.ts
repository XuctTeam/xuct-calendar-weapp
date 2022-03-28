/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-10 19:52:50
 * @LastEditTime: 2022-03-28 17:38:01
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

/**
 * 发送登录短信验证码
 * @param phone
 * @returns
 */
export const sendSmsCode = (phone: String): Promise<any> => {
  return http.post('/uaa/sms', { phone, type: 0 })
}

/**
 * 退出
 * @returns
 */
export const logout = (): Promise<any> => {
  return http.delete('/uaa/oauth/logout')
}

/**
 * 获取注册验证码
 * @returns
 */
export const captcha = (): Promise<any> => {
  return http.get('/uaa/captcha')
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
 * 通过ID查询名称
 * @param memberId
 */
export const getName = (memberId: string): Promise<any> => {
  return http.get('/ums/api/app/v1/member/name', { memberId })
}

/**
 * 修改头像
 * @param avatar
 */
export const updateAvatar = (avatar: string): Promise<any> => {
  return http.post('/ums/api/app/v1/member/avatar', { avatar })
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

/**
 * 绑定账号
 * @param username
 * @param password
 * @returns
 */
export const bindUserName = (formData: any) => {
  return http.post('/ums/api/app/v1/member/username/bind', formData)
}

/**
 * 绑定邮箱
 * @param email
 * @param code
 * @returns
 */
export const bindEmail = (email: string, code: string) => {
  return http.post('/ums/api/app/v1/member/email/bind', { email, code })
}

/**
 * 解绑邮箱
 * @param email
 * @param code
 */
export const unbindEmail = (email: string, code: string) => {
  return http.post('/ums/api/app/v1/member/email/unbind', { email, code })
}
