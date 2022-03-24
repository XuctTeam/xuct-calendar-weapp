/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-03-24 09:22:16
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import CommonMain from '@/components/mixin'
import { IMessage } from '~/../@types/message'
import { toast } from '@/utils/taro'
import { get } from '@/api/message'
import { GroupBody, SystemBody } from './ui'

import './index.scss'

const MessageDetail: FunctionComponent = ({}) => {
  const [message, setMessage] = useState<IMessage>({
    memberId: '',
    type: 'SYSTEM',
    createTime: dayjs().toDate(),
    operation: 0,
    status: 0,
    content: null
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

  return (
    <CommonMain className='vi-message-detail-warpper' title='消息详情' fixed to={3} left>
      <View className='vi-message-detail-warpper_container'>
        {message.type === 'GROUP' ? (
          <GroupBody status={message.status} operation={message.operation} content={message.content}></GroupBody>
        ) : (
          <SystemBody status={message.status} operation={message.operation} content={message.content}></SystemBody>
        )}
      </View>
    </CommonMain>
  )
}

export default MessageDetail
