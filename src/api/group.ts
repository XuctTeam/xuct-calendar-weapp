/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-08 09:36:26
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-08 09:36:26
 */
import http from '@/utils/request'

/**
 * 查询会员群组
 * @param phone
 * @param code
 */
export const groupList = (): Promise<any> => {
  return http.get('/ums/api/app/v1/group')
}
