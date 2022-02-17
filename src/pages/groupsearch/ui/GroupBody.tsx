/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-16 14:35:53
 * @LastEditTime: 2022-02-17 10:48:23
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, SwipeCell, Avatar } from '@taroify/core'
import { IGroup } from '~/../@types/group'

interface IPageStateProps {
  group: IGroup
  onJoinClick: (id: string) => void
}

const GroupBody: FunctionComponent<IPageStateProps> = (props) => {
  const { id = '', name, images, createMemberName } = props.group

  const joinClickHandler = () => {
    props.onJoinClick(id)
  }

  return (
    <SwipeCell>
      <Cell>
        <View className='cell'>
          {images ? <Avatar size='small' src={images}></Avatar> : <Avatar size='small'>G</Avatar>}
          <View className='label'>
            <View> {name}</View>
            <View> 创建者：{createMemberName}</View>
          </View>
        </View>
      </Cell>
      <SwipeCell.Actions side='right'>
        <Button
          variant='contained'
          shape='square'
          color='danger'
          onClick={() => {
            joinClickHandler()
          }}
        >
          加入
        </Button>
      </SwipeCell.Actions>
    </SwipeCell>
  )
}

export default GroupBody
