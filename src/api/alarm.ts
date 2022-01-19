/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-13 14:09:56
 * @LastEditTime: 2022-01-13 14:11:10
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

/**
 * 查询日程提醒
 * @returns
 */
export const list = (componentId: string) => {
  return http.get('/cms/api/app/v1/alarm/'.concat(componentId))
}
