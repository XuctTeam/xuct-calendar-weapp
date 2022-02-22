/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-22 18:02:10
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import CommonMain from '@/components/mixin'
import { IMessage } from '~/../@types/message'

import './index.scss'

const MessageDetail: FunctionComponent = () => {
  const [message, setMessage] = useState<IMessage>({
    memberId: '',
    type: 'SYSTEM',
    createTime: dayjs().toDate(),
    operation: 0,
    status: 0
  })

  useEffect(() => {
    try {
      const data = Router.getData()
      if (!data) {
      }
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <CommonMain className='vi-message-detail-warpper' title='消息详情' fixed to={3} left>
      <View className='vi-message-detail-warpper_container'>123</View>
    </CommonMain>
  )
}

export default MessageDetail
