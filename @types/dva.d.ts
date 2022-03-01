/*
 * @Description:dva 定义属性
 * @Author: Derek Xu
 * @Date: 2021-11-04 09:12:16
 * @LastEditTime: 2022-03-01 18:04:07
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

export interface IUserAuth {
  username: string
  nickName: string
  avatar: string
  identityType: string
}

export interface IUserInfo {
  id: string
  name: string
  avatar?: string
  timeZone: string
}

interface ICommonProps {
  accessToken: string
  userInfo: IUserInfo
  auths: IUserAuth[]
}

export interface IDvaCommonProps {
  common: ICommonProps
}
