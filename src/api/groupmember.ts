/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-03-09 22:14:22
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-09 22:17:24
 */
import http from '@/utils/request'

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

/**
 * 会员主动退出或被请出群组
 * @param groupId
 * @param action
 * @param memberId
 */
export const groupMemberLeave = (groupId: string, action: number, memberId?: string) => {
  return http.post('/ums/api/app/v1/mbr/group/leave', { groupId, action, memberId })
}

/**
 * 去重查询用户组下所有组员
 * @returns
 */
export const distinctMemberList = () => {
  return http.get('/ums/api/app/v1/mbr/group/distinct')
}
