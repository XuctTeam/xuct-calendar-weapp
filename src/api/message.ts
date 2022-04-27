/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-17 14:04:42
 * @LastEditTime: 2022-04-27 19:52:56
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

/**
 * @description: 查询列表
 * @param {number} page
 * @param {number} limit
 * @param {number} status
 * @return {*}
 * @author: Derek Xu
 */
export const list = (page: number, limit: number, status: number, title?: string) => {
  return http.get('/ums/api/app/v1/message/list', { page, limit, status, title })
}

/**
 * @description: 已读消息
 * @param {string} id
 * @return {*}
 * @author: Derek Xu
 */
export const read = (id: string) => {
  return http.post('/ums/api/app/v1/message', { id })
}

/**
 * @description: 获取消息
 * @param {string} id
 * @return {*}
 * @author: Derek Xu
 */
export const get = (id: string) => {
  return http.get('/ums/api/app/v1/message', { id })
}
