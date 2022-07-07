/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-07 21:52:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-07 18:57:56
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell, Avatar, Tag, Button, Flex } from '@taroify/core'
import { Ellipsis, FriendsOutlined } from '@taroify/icons'
import { IGroup } from '~/../@types/group'

interface IPageStateProps {
  group: IGroup
  uid: string
  groupClick: (id: string) => void
  groupView: (id: string) => void
}

const GroupBody: FunctionComponent<IPageStateProps> = (props) => {
  const { id, name, images, count, createMemberId } = props.group

  const groupEditHandler = () => {
    if (!id) return
    props.groupClick(id)
  }

  const groupViewHanler = () => {
    if (!id) return
    props.groupView(id)
  }

  return (
    <Cell className='box' onClick={() => groupViewHanler()}>
      <View className='flex'>
        {images ? <Avatar src={images}></Avatar> : <Avatar style={{ background: 'pink' }}>G</Avatar>}
        <View className='cell'>
          <View className='title'>
            <View className='label'>{name}</View>
            <Tag color='warning'>{createMemberId === props.uid ? '群主' : '组员'}</Tag>
          </View>
          <View className='number'>
            <FriendsOutlined style={{ color: '#ee0a24' }} size={16}></FriendsOutlined> {count} 人
          </View>
        </View>
      </View>
      <View className='br'></View>
      <Flex justify='center' className='act'>
        <Button
          color='info'
          size='mini'
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            console.log(111111111111111111111)
          }}
        >
          编辑
        </Button>
        <Button color='danger' size='mini'>
          删除
        </Button>
      </Flex>
    </Cell>
  )
}

export default GroupBody
