/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 14:33:11
 * @LastEditTime: 2022-03-01 14:54:59
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent } from 'react'
import { IGroupMember } from '~/../@types/group'
import UserBody from './UserBody'

interface IPageOption {
  charCode: string
  members: IGroupMember[]
}

const UserBodyList: FunctionComponent<IPageOption> = (props) => {
  return (
    <Fragment>
      {props.members.map((item, index) => {
        return (
          <Fragment key={index}>
            <UserBody charCode={props.charCode} member={item}></UserBody>
          </Fragment>
        )
      })}
    </Fragment>
  )
}
export default UserBodyList
