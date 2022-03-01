/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-08 09:36:26
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 12:02:31
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

/**
 * 搜索
 * @param word
 * @returns
 */
export const search = (word: string) => {
  return http.get('/ums/api/app/v1/group/search', { word })
}

/**
 * 我申请的列表
 * @returns
 */
export const mineApplyList = () => {
  return http.get('/ums/api/app/v1/group/mine/apply')
}

/**
 * 申请我的列表
 * @returns
 */
export const applyMineList = () => {
  return http.get('/ums/api/app/v1/group/apply/mine')
}

/**
 * 申请加入群组
 * @param id
 * @returns
 */
export const apply = (id: string) => {
  return http.post('/ums/api/app/v1/mbr/group/apply', { id })
}

/**
 * 同意加入群组
 * @param groupId
 * @param memberId
 */
export const applyAgreeJoinGroup = (groupId: string, memberId: string) => {
  return http.post('/ums/api/app/v1/mbr/group/apply/agree', { groupId, memberId })
}

/**
 * 拒绝加入群组
 * @param groupId
 * @param memberId
 */
export const applyRefuseJoinGroup = (groupId: string, memberId: string) => {
  return http.post('/ums/api/app/v1/mbr/group/apply/refuse', { groupId, memberId })
}

/**
 * 用户下所有群组用户
 */
export const groupMemberList = () => {
  return http.get('/ums/api/app/v1/mbr/group')
}
