/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-07 21:52:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-09 07:02:31
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell, Avatar, Tag, Button, Flex, Space } from '@taroify/core'
import { FriendsOutlined } from '@taroify/icons'
import { IGroup } from '~/../@types/group'

interface IPageStateProps {
  group: IGroup
  uid: string
  edit: (id: string) => void
  remove: (id: string) => void
  viewGroup: (id: string) => void
}

const GroupBody: FunctionComponent<IPageStateProps> = (props) => {
  const { id, name, images, count, createMemberId } = props.group

  return (
    <View className='box'>
      <Cell className='info' clickable>
        <View className='avatar'>
          {images ? (
            <Avatar src={images} size='medium'></Avatar>
          ) : (
            <Avatar style={{ background: 'pink' }} size='medium'>
              G
            </Avatar>
          )}
        </View>
        <View className='cell'>
          <View className='row'>
            <View className='title'>
              <View className='label'>{name}</View>
              <Tag color='warning'>{createMemberId === props.uid ? '群主' : '组员'}</Tag>
            </View>
            <View>sdfsdf</View>
          </View>
          <View className='number'>
            <FriendsOutlined style={{ color: '#ee0a24' }} size={16}></FriendsOutlined> {count} 人
          </View>
        </View>
      </Cell>

      <View className='btns'>
        <Button
          color='info'
          size='mini'
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            props.edit(id || '')
          }}
        >
          编辑
        </Button>
        <Button
          color='danger'
          size='mini'
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            props.remove(id || '')
          }}
        >
          删除
        </Button>
      </View>
    </View>
  )
}

export default GroupBody
