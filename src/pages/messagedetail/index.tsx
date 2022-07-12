/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-07-12 10:00:24
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import { Backdrop, Button, Dialog, Loading } from '@taroify/core'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import CommonMain from '@/components/mixin'
import { IMessage } from '~/../@types/message'
import { toast } from '@/utils/taro'
import { get, remove } from '@/api/message'
import { EventBody, GroupBody, SystemBody } from './ui'

import './index.scss'

const MessageDetail: FunctionComponent = ({}) => {
  const [open, setOpen] = useState<boolean>(true)
  const [message, setMessage] = useState<IMessage>({
    title: '',
    memberId: '',
    type: 'SYSTEM',
    createTime: dayjs().toDate(),
    operation: 0,
    status: 0,
    content: null
  })

  useEffect(() => {
    const data = Router.getData()
    if (data) {
      setMessage(data)
      setTimeout(() => {
        setOpen(false)
      }, 500)
      return
    }
    const { id } = Router.getParams()
    if (!id) {
      toast({ title: '获取参数失败' })
      return
    }
    get(id)
      .then((res) => {
        setMessage(res as any as IMessage)
        setOpen(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const view = () => {
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
  }

  const removeMessage = (id: string) => {
    Dialog.confirm({
      title: '确认',
      message: '是否删除？',
      onConfirm: () => {
        remove(id)
          .then(() => {
            Router.back({ delete: true })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  return (
    <Fragment>
      <CommonMain className='vi-message-detail-warpper' title='消息详情' fixed to={3} left>
        <View className='vi-message-detail-warpper_container'>{view()}</View>
        <View className='vi-message-detail-warpper_button'>
          <Button color='danger' block onClick={() => removeMessage(message.id || '')}>
            删除
          </Button>
        </View>
      </CommonMain>
      <Dialog id='dialog' />
      <Backdrop className='vi-message-detail-warpper_loading' open={open} closeable onClose={() => setOpen(false)}>
        <View className='content-wrapper'>
          <Loading size='24px' type='spinner' direction='vertical'>
            加载中...
          </Loading>
        </View>
      </Backdrop>
    </Fragment>
  )
}

export default MessageDetail
