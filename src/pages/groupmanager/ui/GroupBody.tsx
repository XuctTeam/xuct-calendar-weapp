/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-07 21:52:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-06-21 21:35:25
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell, Avatar } from '@taroify/core'
import { Ellipsis, FriendsOutlined } from '@taroify/icons'
import { IGroup } from '~/../@types/group'

interface IPageStateProps {
  group: IGroup
  groupClick: (id: string) => void
  groupView: (id: string) => void
}

const GroupBody: FunctionComponent<IPageStateProps> = (props) => {
  const { id, name, images, count } = props.group

  const groupEditHandler = () => {
    if (!id) return
    props.groupClick(id)
  }

  const groupViewHanler = () => {
    if (!id) return
    props.groupView(id)
  }

  return (
    <Cell
      className='card'
      onClick={() => groupViewHanler()}
      rightIcon={
        <Ellipsis
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            groupEditHandler()
          }}
        />
      }
      clickable
    >
      {images ? <Avatar src={images}></Avatar> : <Avatar>G</Avatar>}
      <View className='cell'>
        <View className='title'>{name}</View>
        <View className='number'>
          <FriendsOutlined style={{ color: '#ee0a24' }} size={18}></FriendsOutlined> {count} 人
        </View>
      </View>
    </Cell>
  )
}

export default GroupBody
