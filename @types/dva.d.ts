/*
 * @Description:dva 定义属性
 * @Author: Derek Xu
 * @Date: 2021-11-04 09:12:16
 * @LastEditTime: 2021-11-05 13:30:54
 * @LastEditors: Derek Xu
 */
//import { Dispatch } from 'redux'
interface IDvaLoadingProps {
  global: boolean
  models: { [type: string]: boolean | undefined }
  effects: { [type: string]: boolean | undefined }
}

// by lazen at 2020-04-01
export interface DvaProps {
  dispatch: any
  loading?: IDvaLoadingProps
}
