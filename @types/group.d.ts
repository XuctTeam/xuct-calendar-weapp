/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-08 09:44:01
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-10 11:53:11
 */
export interface IGroup {
  id?: string
  name: string
  images?: string
  count?: number
  memberId?: string
  createMemberId: string
  createMemberName?: string
}

export interface IGroupMember {
  name: string
  avatar: string
  memberId: string
  groupId: string
  groupName: string
  groupCreateMemberId?: string
}

/**
 *  参会人选择类型
 */
export interface ICheckGroupMember {
  name: string
  avatar: string
  memberId: string
  checked: boolean
}

export interface IPinYinGroupMember {
  charCode: string
  members: Array<IGroupMember>
}
