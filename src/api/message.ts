/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-17 14:04:42
 * @LastEditTime: 2022-02-25 20:58:10
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

/**
 * 查询列表
 * @param page
 * @param limit
 * @returns
 */
export const list = (page: number, limit: number, status: number, sort: number) => {
  return http.get('/ums/api/app/v1/message/list', { page, limit, status, sort })
}

/**
 * 已读消息
 * @param id
 */
export const read = (id: string) => {
  return http.post('/ums/api/app/v1/message', { id })
}

/**
 * 获取消息
 * @param id
 */
export const get = (id: string) => {
  return http.get('/ums/api/app/v1/message', { id })
}
