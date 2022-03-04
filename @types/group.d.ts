/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-08 09:44:01
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-04 16:25:10
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
}

export interface IPinYinGroupMember {
  charCode: string
  members: Array<IGroupMember>
}
