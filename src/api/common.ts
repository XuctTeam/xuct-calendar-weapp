/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-02 08:59:45
 * @LastEditTime: 2022-03-29 10:09:16
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

export const upload = (): string => {
  //@ts-ignore
  return SERVICE_URL + '/ums/api/v1/common/file/upload'
}

/**
 * 绑定或解绑手机发验证
 * @param edit
 * @param phone
 * @returns
 */
export const sendUmsSmsCode = (edit: boolean, phone: string): Promise<any> => {
  return http.post('/ums/api/v1/common/sms', { type: edit ? 2 : 1, phone })
}

/**
 * 绑定或解绑邮箱发验证
 * @param email
 * @param type
 */
export const sendUmsEmailCode = (email: string, type: number) => {
  return http.post('/ums/api/v1/common/email', { email, type })
}
