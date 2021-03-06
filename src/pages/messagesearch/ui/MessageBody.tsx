/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-21 15:28:49
 * @LastEditTime: 2022-07-07 09:37:24
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell, Flex, Tag } from '@taroify/core'
import { Checkbox } from '@taroify/core'
import { IMessage } from '~/../@types/message'
import dayjs from 'dayjs'

type TMessage = { checked: boolean } & IMessage

interface IPageStateProps {
  message: TMessage
  viewHandler: (id: string) => void
  selected: (id: string, checked: boolean) => void
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
        return '注册消息'
      case 1:
        return '修改名称消息'
      case 2:
        return '使用微信头像昵称消息'
      case 3:
        return '账号合并消息'
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
        return '撤回申请'
      case 4:
        return '离开群组'
      case 5:
        return '踢出群组'
      case 6:
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

  const { id, title, status, type, operation, createTime, checked } = props.message
  return (
    <Cell bordered={true}>
      <View className='flex'>
        <View>
          <Checkbox checked={checked} onChange={(e) => props.selected(id || '', e)}></Checkbox>
        </View>
        <View onClick={() => view()} className='content'>
          <View className='title'>
            {status === 0 && <View className='read' />}
            {title}
          </View>
          <View className='cell'>
            <View>
              <Flex gutter={4}>
                <Flex.Item>
                  <Tag shape='rounded' color={getTagColor(type)}>
                    {messageType(type)}
                  </Tag>
                </Flex.Item>
                <Flex.Item>
                  <Tag shape='rounded' color='primary'>
                    <View className='taroify-ellipsis'>{operateType(type, operation)}</View>
                  </Tag>
                </Flex.Item>
              </Flex>
            </View>
            <View>{dayjs(createTime).format('YYYY-MM-DD HH:mm')}</View>
          </View>
        </View>
      </View>
    </Cell>
  )
}

export default MessageBody
