/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-08 09:36:26
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-13 21:06:24
 */
import http from '@/utils/request'

export const upload = (): string => {
  //@ts-ignore
  return SERVICE_URL + '/ums/api/app/v1/group/upload'
}

/**
 * 查询会员群组
 * @param phone
 * @param code
 */
export const groupList = (): Promise<any> => {
  return http.get('/ums/api/app/v1/group')
}

/**
 * 添加群组
 * @param url
 * @param name
 */
export const addGroup = (name: string, imageUrl: string) => {
  return http.post('/ums/api/app/v1/group', { name, imageUrl })
}
