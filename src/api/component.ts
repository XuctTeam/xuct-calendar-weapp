/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-04 10:39:35
 * @LastEditTime: 2022-01-24 18:21:23
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
 * 按关键词查询日程
 * @param word
 * @param page
 * @param limit
 * @returns
 */
export const search = (word: string, page: number, limit: number) => {
  return http.get('/cms/api/app/v1/component/list/search/days', { word, page, limit })
}

/**
 * 删除日程
 * @param id
 */
export const deleteById = (id: string) => {
  return http.delete('/cms/api/app/v1/component/'.concat(id))
}
