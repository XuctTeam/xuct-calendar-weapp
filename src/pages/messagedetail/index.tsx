/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-07-11 18:59:16
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import { Button } from '@taroify/core'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import CommonMain from '@/components/mixin'
import { IMessage } from '~/../@types/message'
import { toast } from '@/utils/taro'
import { get, remove } from '@/api/message'
import { useModal } from 'taro-hooks'
import { EventBody, GroupBody, SystemBody } from './ui'

import './index.scss'

const MessageDetail: FunctionComponent = ({}) => {
  const [message, setMessage] = useState<IMessage>({
    title: '',
    memberId: '',
    type: 'SYSTEM',
    createTime: dayjs().toDate(),
    operation: 0,
    status: 0,
    content: null
  })
  const [show] = useModal({
    title: '提醒',
    content: '确定删除?'
  })

  useEffect(() => {
    try {
      const data = Router.getData()
      if (!data) {
        const { id } = Router.getParams()
        if (!id) {
          toast({ title: '获取参数失败' })
          return
        }
        get(id)
          .then((res) => {
            setMessage(res as any as IMessage)
          })
          .catch((err) => {
            console.log(err)
          })
        return
      }
      setMessage(data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const view = useCallback(() => {
    switch (message.type) {
      case 'GROUP':
        return <GroupBody status={message.status} operation={message.operation} content={message.content}></GroupBody>
      case 'SYSTEM':
        return <SystemBody status={message.status} operation={message.operation} content={message.content}></SystemBody>
      case 'EVENT':
        return <EventBody status={message.status} operation={message.operation} content={message.content}></EventBody>
      default:
        return <></>
    }
  }, [message])

  const removeMessage = useCallback(
    (id: string) => {
      if (!id) return
      show()
        .then((res) => {
          if (res.cancel) return
          _remove(id)
        })
        .catch((err) => {
          console.log(err)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [show]
  )

  const _remove = (id: string) => {
    remove(id)
      .then(() => {
        Router.back({ delete: true })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonMain className='vi-message-detail-warpper' title='消息详情' fixed to={3} left>
      <View className='vi-message-detail-warpper_container'>{view()}</View>
      <View className='vi-message-detail-warpper_button'>
        <Button color='danger' block onClick={() => removeMessage(message.id || '')}>
          删除
        </Button>
      </View>
    </CommonMain>
  )
}

export default MessageDetail
