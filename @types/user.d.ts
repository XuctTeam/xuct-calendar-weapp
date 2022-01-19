/*
 * @Description: 用户信息
 * @Author: Derek Xu
 * @Date: 2021-11-05 13:31:40
 * @LastEditTime: 2021-12-19 14:50:34
 * @LastEditors: Derek Xu
 */

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
