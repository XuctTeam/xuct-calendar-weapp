/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-07 21:52:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-06-20 18:59:27
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell, Avatar } from '@taroify/core'
import { Ellipsis } from '@taroify/icons'
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
        <View className='number'>组内 {count} 人</View>
      </View>
    </Cell>
  )
}

export default GroupBody
