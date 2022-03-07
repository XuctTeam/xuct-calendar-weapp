/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-08 09:36:26
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-07 14:02:35
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
 * 按拼音分组用户
 */
export const groupMemberPinYinList = () => {
  return http.get('/ums/api/app/v1/mbr/group')
}

/**
 * 通过群组查询
 * @param id
 */
export const groupMemberList = (id: string) => {
  return http.get('/ums/api/app/v1/mbr/group/query', { groupId: id })
}
