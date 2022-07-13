/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-09 19:39:54
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-13 19:35:15
 */

import { Fragment, FunctionComponent } from 'react'
import { Empty, IndexList } from '@taroify/core'
import { IPinYinGroupMember } from '~/../@types/group'
import UserBodyList from './UserBodyList'

interface IPageOption {
  loading: boolean
  pinYinMembers: Array<IPinYinGroupMember>
  refresh: () => void
}

const UserList: FunctionComponent<IPageOption> = (props) => {
  return (
    <Fragment>
      {props.pinYinMembers.length === 0 ? (
        <Empty>
          <Empty.Image />
          <Empty.Description>暂无数据</Empty.Description>
        </Empty>
      ) : (
        <IndexList>
          {props.pinYinMembers.map((item) => {
            return (
              <Fragment key={item.charCode}>
                <IndexList.Anchor index={item.charCode} />
                <UserBodyList charCode={item.charCode} members={item.members}></UserBodyList>
              </Fragment>
            )
          })}
        </IndexList>
      )}
    </Fragment>
  )
}

export default UserList
