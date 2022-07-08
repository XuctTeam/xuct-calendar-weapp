/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-07 21:49:22
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-08 22:37:03
 */
import { ScrollView } from '@tarojs/components'
import { FunctionComponent, useState } from 'react'
import { IGroup } from '~/../@types/group'
import GroupBody from './GroupBody'

interface IPageStateProps {
  groups: Array<IGroup>
  uid: string
  loading: boolean
  refresh: () => void
  edit: (id: string) => void
  remove: (id: string) => void
  viewGroup: (id: string) => void
}

const WxGroupList: FunctionComponent<IPageStateProps> = (props) => {
  const [scrollTop, setScrollTop] = useState<number>(0)

  return (
    <ScrollView
      style={{ height: '100%' }}
      scrollY
      refresherTriggered={props.loading}
      scrollWithAnimation
      refresherEnabled
      enhanced
      showScrollbar={false}
      scrollTop={scrollTop}
      onScroll={(e) => setScrollTop(e.detail.scrollTop)}
      onRefresherRefresh={props.refresh}
    >
      {props.groups.map((item, i) => {
        return <GroupBody uid={props.uid} group={item} key={i} edit={props.edit} remove={props.remove} viewGroup={props.viewGroup}></GroupBody>
      })}
    </ScrollView>
  )
}

export default WxGroupList
