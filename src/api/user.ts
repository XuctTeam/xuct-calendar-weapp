/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-10 19:52:50
 * @LastEditTime: 2022-03-27 16:22:18
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
 * 绑定手机号发送短信
 * @param phone
 */
export const bindPhoneSmsCode = (edit: boolean, phone: string): Promise<any> => {
  return http.post('/uaa/sms', { type: edit ? 1 : 2, phone })
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
 * 会员注册
 * @param formData
 * @returns
 */
export const register = (formData: any) => {
  return http.post('/uaa/register', formData)
}

/**
 * 忘记密码 -> 发送验证码
 * @param phone
 * @param email
 * @param type
 * @returns
 */
export const sendForgetPasswordCode = (phone: string, email: string, type: number) => {
  return http.post('/uaa/forget/password/code', { phone, email, type })
}

/**
 * 忘记密码 -> 认证用户
 * @param phone
 * @param email
 * @param code
 * @param type
 * @returns
 */
export const forgetPasswordCheck = (phone: string, email: string, code: string, type: number) => {
  return http.post('/uaa/forget/password/check', { phone, email, code, type })
}

/**
 * 忘记密码 -> 修改密码
 * @param memberId
 * @param password
 * @param code
 */
export const forgetModify = (memberId: string, password: string, code: string) => {
  return http.post('/uaa/forget/password/modify', { memberId, password, code })
}
