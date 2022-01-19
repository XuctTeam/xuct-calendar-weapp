/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-04 10:39:35
 * @LastEditTime: 2022-01-19 11:23:50
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

/**
 * 按天查询日历下日程
 * @param id
 * @param start
 * @param end
 * @returns
 */
export const componentsDaysById = (calendarId: string, start: string, end: string) => {
  return http.get('/cms/api/app/v1/component/list/calendar/days', { calendarId, start, end })
}

/**
 * 新增日历下日程
 * @param data
 * @returns
 */
export const add = (data: any) => {
  return http.post('/cms/api/app/v1/component', data)
}

/**
 * 按天根据id查询
 * @param id
 * @returns
 */
export const getDaysById = (id: string) => {
  return http.get('/cms/api/app/v1/component/days/'.concat(id))
}

/**
 * 查询日程详情
 * @param id
 */
export const getById = (id: string) => {
  return http.get('/cms/api/app/v1/component/'.concat(id))
}

/**
 * 删除日程
 * @param id
 */
export const deleteById = (id: string) => {
  return http.delete('/cms/api/app/v1/component/'.concat(id))
}
