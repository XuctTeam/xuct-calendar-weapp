/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-07 21:49:22
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-13 19:39:11
 */
import { View } from '@tarojs/components'
import { FunctionComponent } from 'react'
import { IGroup } from '~/../@types/group'
import GroupBody from './GroupBody'

interface IPageStateProps {
  groups: Array<IGroup>
  uid: string
  loading: boolean
  edit: (id: string) => void
  remove: (id: string) => void
  viewGroup: (id: string) => void
}

const WebGroupList: FunctionComponent<IPageStateProps> = (props) => {
  return (
    <View style={{ height: '100%', overflowY: 'auto' }}>
      {props.groups.map((item, i) => {
        return <GroupBody uid={props.uid} group={item} key={i} edit={props.edit} remove={props.remove} viewGroup={props.viewGroup}></GroupBody>
      })}
      <View className='bottom'></View>
    </View>
  )
}

export default WebGroupList
