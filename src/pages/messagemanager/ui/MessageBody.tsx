/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-21 15:28:49
 * @LastEditTime: 2022-02-21 16:44:20
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell } from '@taroify/core'
import { Arrow } from '@taroify/icons'
import { IMessage } from '~/../@types/message'
import dayjs from 'dayjs'

interface IPageStateProps {
  message: IMessage
}

const messageType = (type: string): string => {
  switch (type) {
    case 'SYSTEM':
      return '系统消息'
    default:
      return '其他消息'
  }
}

const operateType = (type: string, operate: number): string => {
  switch (type) {
    case 'SYSTEM':
      return operateSystemMessage(operate)
    default:
      return '未知'
  }
}

const operateSystemMessage = (operate: number): string => {
  switch (operate) {
    case 0:
      return '用户注册消息'
    default:
      return '未知'
  }
}

const MessageBody: FunctionComponent<IPageStateProps> = (props) => {
  const { status, type, operation, createTime } = props.message
  return (
    <Cell rightIcon={<Arrow />} clickable>
      <View className='cell'>
        <View className='label'>
          {status === 0 && <View className='read'></View>}
          <View className='taroify-ellipsis'>
            {messageType(type)}：{operateType(type, operation)}
          </View>
        </View>
        <View>{dayjs(createTime).format('YYYY-MM-DD HH:mm')}</View>
      </View>
    </Cell>
  )
}

export default MessageBody
