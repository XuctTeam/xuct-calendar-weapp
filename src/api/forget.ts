/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-28 16:02:47
 * @LastEditTime: 2022-03-28 16:02:47
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

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
export const forgetModify = (memberId: string, pwd: string, code: string) => {
  return http.post('/uaa/forget/password/modify', { memberId, password: pwd, code })
}
