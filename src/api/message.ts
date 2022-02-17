/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-17 14:04:42
 * @LastEditTime: 2022-02-17 14:05:44
 * @LastEditors: Derek Xu
 */
import http from '@/utils/request'

/**
 * 查询列表
 * @param page
 * @param limit
 * @returns
 */
export const list = (page: number, limit: number) => {
  return http.get('/ums/api/app/v1/message', { page, limit })
}