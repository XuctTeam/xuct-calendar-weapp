/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-04 10:39:35
 * @LastEditTime: 2022-04-20 21:03:15
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

/**
 * @description: 按天查询日历下日程
 * @param {string} calendarId
 * @param {string} start
 * @param {string} end
 * @return {*}
 * @author: Derek Xu
 */
export const componentsDaysById = (calendarId: string, start: string, end: string) => {
  return http.get('/cms/api/app/v1/component/list/calendar/days', { calendarId, start, end })
}

/**
 * @description: 新增日历下日程
 * @param {any} data
 * @return {*}
 * @author: Derek Xu
 */
export const add = (data: any) => {
  return http.post('/cms/api/app/v1/component', data)
}

/**
 * @description: 按天根据id查询
 * @param {string} id
 * @return {*}
 * @author: Derek Xu
 */
export const getDaysById = (id: string) => {
  return http.get('/cms/api/app/v1/component/days/'.concat(id))
}

/**
 * @description: 查询日程详情
 * @param {string} id
 * @return {*}
 * @author: Derek Xu
 */
export const getById = (id: string) => {
  return http.get('/cms/api/app/v1/component/'.concat(id))
}

/**
 * @description: 按关键词查询日程
 * @param {string} word
 * @param {number} page
 * @param {number} limit
 * @return {*}
 * @author: Derek Xu
 */
export const search = (word: string, page: number, limit: number) => {
  return http.get('/cms/api/app/v1/component/list/search', { word, page, limit })
}

/**
 * @description: 删除日程
 * @param {string} id
 * @return {*}
 * @author: Derek Xu
 */
export const deleteById = (id: string) => {
  return http.delete('/cms/api/app/v1/component/'.concat(id))
}

/**
 * @description: 通过事件查询邀请人ID
 * @param {string} componentId
 * @return {*}
 * @author: Derek Xu
 */
export const queryComponentMemberIds = (componentId: string) => {
  return http.get('/cms/api/app/v1/component/attend/member/ids', { componentId })
}

/**
 * @description: 通过事件查询参会人
 * @param {string} createMemberId
 * @param {string} componentId
 * @return {*}
 * @author: Derek Xu
 */
export const queryComponentMembers = (createMemberId: string, componentId: string) => {
  return http.get('/cms/api/app/v1/component/attend/member', { createMemberId, componentId })
}

/**
 * @description: 获取邀请状态
 * @param {string} componentId
 * @return {*}
 * @author: Derek Xu
 */
export const getAttendStatus = (componentId: string) => {
  return http.get('/cms/api/app/v1/component/attend/status', { componentId })
}

/**
 * @description:  更新邀请状态
 * @param {string} componentId
 * @param {number} status
 * @return {*}
 * @author: Derek Xu
 */
export const updateAttendStatus = (componentId: string, status: number) => {
  return http.post('/cms/api/app/v1/component/attend/status', { componentId, status })
}

/**
 * @description:  拒绝邀请
 * @param {string} componentId
 * @return {*}
 * @author: Derek Xu
 */
export const refuseAttend = (componentId: string) => {
  return http.delete('/cms/api/app/v1/component/attend/'.concat(componentId))
}

/**
 * @description:
 * @param {string} componentId
 * @return {*}
 * @author: Derek Xu
 */
export const getShareInfo = (componentId: string) => {}
