/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-03-09 22:14:22
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-20 21:06:06
 */
import http from '@/utils/request'

/**
 * @description: 我申请的列表
 * @param {*}
 * @return {*}
 * @author: Derek Xu
 */
export const mineApplyList = () => {
  return http.get('/ums/api/app/v1/group/mine/apply')
}

/**
 * @description: 申请我的列表
 * @param {*}
 * @return {*}
 * @author: Derek Xu
 */
export const applyMineList = () => {
  return http.get('/ums/api/app/v1/group/apply/mine')
}

/**
 * @description: 申请加入群组
 * @param {string} id
 * @return {*}
 * @author: Derek Xu
 */
export const apply = (id: string) => {
  return http.post('/ums/api/app/v1/mbr/group/apply', { id })
}

/**
 * @description: 同意加入群组
 * @param {string} groupId
 * @param {string} memberId
 * @return {*}
 * @author: Derek Xu
 */
export const applyAgreeJoinGroup = (groupId: string, memberId: string) => {
  return http.post('/ums/api/app/v1/mbr/group/apply/agree', { groupId, memberId })
}

/**
 * @description: 拒绝加入群组
 * @param {string} groupId
 * @param {string} memberId
 * @return {*}
 * @author: Derek Xu
 */
export const applyRefuseJoinGroup = (groupId: string, memberId: string) => {
  return http.post('/ums/api/app/v1/mbr/group/apply/refuse', { groupId, memberId })
}

/**
 * @description: 按拼音分组用户
 * @param {*}
 * @return {*}
 * @author: Derek Xu
 */
export const groupMemberPinYinList = () => {
  return http.get('/ums/api/app/v1/mbr/group')
}

/**
 * @description: 通过群组查询
 * @param {string} id
 * @return {*}
 * @author: Derek Xu
 */
export const groupMemberList = (id: string) => {
  return http.get('/ums/api/app/v1/mbr/group/query', { groupId: id })
}

/**
 * @description: 会员主动退出或被请出群组
 * @param {string} groupId
 * @param {number} action
 * @param {string} memberId
 * @return {*}
 * @author: Derek Xu
 */
export const groupMemberLeave = (groupId: string, action: number, memberId?: string) => {
  return http.post('/ums/api/app/v1/mbr/group/leave', { groupId, action, memberId })
}

/**
 * @description: 去重查询用户组下所有组员
 * @param {*}
 * @return {*}
 * @author: Derek Xu
 */
export const distinctMemberList = () => {
  return http.get('/ums/api/app/v1/mbr/group/distinct')
}
