/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-09 19:39:54
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 15:29:35
 */

import { Fragment, FunctionComponent, useState } from 'react'
import { Empty, IndexList, PullRefresh } from '@taroify/core'
import { usePageScroll } from '@tarojs/taro'
import { IPinYinGroupMember } from '~/../@types/group'
import UserBodyList from './UserBodyList'

interface IPageOption {
  loading: boolean
  pinYinMembers: Array<IPinYinGroupMember>
  refresh: () => void
  disabled: boolean
}

const UserList: FunctionComponent<IPageOption> = (props) => {
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  const refresh = () => {
    props.refresh()
  }

  return (
    <PullRefresh
      style={{ height: '100%' }}
      loading={props.loading}
      reachTop={reachTop}
      disabled={props.disabled}
      onRefresh={() => {
        refresh()
      }}
    >
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
    </PullRefresh>
  )
}

export default UserList
