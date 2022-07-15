/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-09 19:39:54
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-14 12:05:13
 */

import { Fragment, FunctionComponent } from 'react'
import { Empty, IndexList } from '@taroify/core'
import { IPinYinGroupMember } from '~/../@types/group'
import UserBodyList from './UserBodyList'
import RefreshList from '@/components/RefreshList'

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
        <RefreshList loading={props.loading} refresh={props.refresh}>
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
        </RefreshList>
      )}
    </Fragment>
  )
}

export default UserList
