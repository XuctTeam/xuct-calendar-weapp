/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-16 14:35:53
 * @LastEditTime: 2022-07-07 13:17:14
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell, Avatar } from '@taroify/core'
import { IGroup } from '~/../@types/group'

interface IPageStateProps {
  group: IGroup
  onJoinClick: (id: string, hasPassword: number) => void
}

const GroupBody: FunctionComponent<IPageStateProps> = (props) => {
  const { id = '', name, images, createMemberName, hasPasswordJoin } = props.group

  const joinClickHandler = () => {
    props.onJoinClick(id, hasPasswordJoin)
  }

  return (
    <Cell clickable onClick={joinClickHandler}>
      <View className='cell'>
        {images ? (
          <Avatar size='small' src={images}></Avatar>
        ) : (
          <Avatar style={{ background: 'pink' }} size='small'>
            G
          </Avatar>
        )}
        <View className='label'>
          <View> {name}</View>
          <View> 创建者：{createMemberName}</View>
        </View>
      </View>
    </Cell>
  )
}

export default GroupBody
