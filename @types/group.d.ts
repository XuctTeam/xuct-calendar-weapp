/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-08 09:44:01
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-05 22:26:49
 */
export interface IGroup {
  id?: string
  name: string
  images?: string
  password?: string
  count?: number
  num: number
  memberId?: string
  createMemberId: string
  power: string
  createMemberName?: string
  hasPasswordJoin: number
}

/**
 * 通讯录人
 */
export type TMember = {
  name: string
  avatar: string
  memberId: string
}

/**
 *  群组通讯录
 */
export interface IGroupMember extends TMember {
  groupId: string
  groupName: string
  groupCreateMemberId?: string
}

/**
 *  选择通讯通人员
 */
export interface ICheckGroupMember extends TMember {
  checked: boolean
}

/**
 * 按拼音分组
 */
export interface IPinYinGroupMember {
  charCode: string
  members: Array<IGroupMember>
}
