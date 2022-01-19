/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-02 17:45:23
 * @LastEditTime: 2022-01-18 11:27:56
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

import { IDavCalendar } from '~/../@types/calendar'

/**
 * 查询日历列表
 * @returns
 */
export const list = () => {
  return http.get('/cms/api/app/v1/calendar/list')
}

/**
 * 查询颜色列表
 * @returns
 */
export const colorsList = () => {
  return http.get('/cms/api/app/v1/calendar/color')
}

/**
 * 获取日历详情
 * @param id
 * @returns
 */
export const get = (id: string) => {
  return http.get('/cms/api/app/v1/calendar', { id })
}

/**
 * 更新日历
 *
 * @param data
 * @returns
 */
export const update = (data: IDavCalendar) => {
  return http.put('/cms/api/app/v1/calendar', data)
}

/**
 * 新建日历
 *
 * @param data
 * @returns
 */
export const create = (data: IDavCalendar) => {
  return http.post('/cms/api/app/v1/calendar', data)
}
