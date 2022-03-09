/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-08 09:36:26
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-09 22:15:02
 */
import http from '@/utils/request'

/**
 * 查询会员所在群组（包括人数）
 * @param phone
 * @param code
 */
export const groupList = (): Promise<any> => {
  return http.get('/ums/api/app/v1/group')
}

/**
 * 通过群组id查询群组信息（包括人数）
 * @param id
 * @returns
 */
export const getGroupInfo = (id: string): Promise<any> => {
  return http.get('/ums/api/app/v1/group/get', { id })
}

/**
 * 添加群组
 * @param url
 * @param name
 */
export const addGroup = (id: string, name: string, imageUrl: string) => {
  return http.post('/ums/api/app/v1/group', { id, name, imageUrl })
}

/**
 * 删除群组
 * @param id
 * @returns
 */
export const deleteGroup = (id: string) => {
  return http.post('/ums/api/app/v1/group/delete', { id })
}

/**
 * 搜索
 * @param word
 * @returns
 */
export const search = (word: string) => {
  return http.get('/ums/api/app/v1/group/search', { word })
}
