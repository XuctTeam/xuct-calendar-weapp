/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-07 21:49:22
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-08 22:36:56
 */
import { PullRefresh } from '@taroify/core'
import { View } from '@tarojs/components'
import { usePageScroll } from '@tarojs/taro'
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

const WebGroupList: FunctionComponent<IPageStateProps> = (props) => {
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  return (
    <PullRefresh style={{ height: '100%', overflowY: 'auto' }} loading={props.loading} reachTop={reachTop} onRefresh={props.refresh}>
      {props.groups.map((item, i) => {
        return <GroupBody uid={props.uid} group={item} key={i} edit={props.edit} remove={props.remove} viewGroup={props.viewGroup}></GroupBody>
      })}
      <View className='bottom'></View>
    </PullRefresh>
  )
}

export default WebGroupList
