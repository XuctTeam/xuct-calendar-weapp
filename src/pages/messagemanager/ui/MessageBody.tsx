/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-21 15:28:49
 * @LastEditTime: 2022-04-26 11:57:47
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell, Flex, Tag } from '@taroify/core'
import { IMessage } from '~/../@types/message'
import dayjs from 'dayjs'

interface IPageStateProps {
  message: IMessage
  viewHandler: (id: string) => void
}

const MessageBody: FunctionComponent<IPageStateProps> = (props) => {
  const messageType = (type: string): string => {
    switch (type) {
      case 'SYSTEM':
        return '系统消息'
      case 'GROUP':
        return '群组消息'
      case 'EVENT':
        return '日程消息'
      default:
        return '其他消息'
    }
  }

  const operateType = (type: string, operate: number): string => {
    switch (type) {
      case 'SYSTEM':
        return operateSystemMessage(operate)
      case 'GROUP':
        return operateGroupMessage(operate)
      case 'EVENT':
        return operateEventMessage(operate)
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

  const operateGroupMessage = (operate: number): string => {
    switch (operate) {
      case 0:
        return '申请入组'
      case 1:
        return '同意入组'
      case 2:
        return '拒绝入组'
      case 3:
        return '群组删除'
      default:
        return '未知'
    }
  }

  /** 0.新建邀请 1.更新邀请 2.事件删除 3.事件提醒  */
  const operateEventMessage = (operate: number): string => {
    switch (operate) {
      case 0:
        return '新增邀请'
      case 1:
        return '更新邀请'
      case 2:
        return '事件删除'
      case 3:
        return '事件提醒'
      default:
        return '未知'
    }
  }

  const getTagColor = (type: string) => {
    switch (type) {
      case 'SYSTEM':
        return 'success'
      case 'GROUP':
        return 'warning'
      case 'EVENT':
        return 'danger'
      default:
        return 'primary'
    }
  }

  const view = () => {
    props.viewHandler(props.message.id ? props.message.id : '')
  }

  const { title, status, type, operation, createTime } = props.message
  return (
    <Cell onClick={() => view()} clickable>
      <View className='title'>
        {status === 0 && <View className='read' />}
        {title}
      </View>
      <View className='cell'>
        <View>
          <Flex gutter={4}>
            <Flex.Item>
              <Tag shape='round' color='primary'>
                <View className='taroify-ellipsis'>{operateType(type, operation)}</View>
              </Tag>
            </Flex.Item>
            <Flex.Item>
              <Tag shape='round' color={getTagColor(type)}>
                {messageType(type)}
              </Tag>
            </Flex.Item>
          </Flex>
        </View>
        <View>{dayjs(createTime).format('YYYY-MM-DD HH:mm')}</View>
      </View>
    </Cell>
  )
}

export default MessageBody
