/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-09 19:39:54
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 16:15:59
 */

import { Fragment, FunctionComponent, useState } from 'react'
import { Empty, IndexList } from '@taroify/core'
import { IPinYinGroupMember } from '~/../@types/group'
import { ScrollView } from '@tarojs/components'
import UserBodyList from './UserBodyList'

interface IPageOption {
  loading: boolean
  pinYinMembers: Array<IPinYinGroupMember>
  refresh: () => void
  disabled: boolean
}

const WeappUserList: FunctionComponent<IPageOption> = (props) => {
  const [scrollTop, setScrollTop] = useState<number>(0)

  return (
    <ScrollView
      style={{ height: '100%' }}
      scrollY
      refresherTriggered={props.loading}
      scrollWithAnimation
      refresherEnabled={props.disabled}
      enhanced
      showScrollbar={false}
      scrollTop={scrollTop}
      onScroll={(e) => setScrollTop(e.detail.scrollTop)}
      onRefresherRefresh={() => props.refresh()}
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
    </ScrollView>
  )
}

export default WeappUserList
