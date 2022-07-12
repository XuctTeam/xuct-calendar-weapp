/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-03 15:04:45
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-12 17:31:55
 */
import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import Router from 'tarojs-router-next'
import { useSelector } from 'react-redux'
import { useDidShow } from '@tarojs/taro'
import dayjs from 'dayjs'
import { ScrollView, View } from '@tarojs/components'
import { Empty, List, Loading, Button, Dialog } from '@taroify/core'
import CommonMain from '@/components/mixin'
import IconFont from '@/components/iconfont'
import { Search } from '@taroify/icons'
import { IDvaCommonProps } from '~/../@types/dva'
import { IMessage, IMessagePageComponent } from '~/../@types/message'
import { count, list, read, clear } from '@/api/message'
import { MessageBody, NoticeMsg } from './ui'

import './index.scss'

const MessageManager: FunctionComponent = () => {
  const [countNum, setCountNum] = useState<number>(0)
  const pageRef = useRef<number>(0)
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [scrollTop, setScrollTop] = useState(0)
  const refreshTimeRef = useRef<number>(0)

  useDidShow(() => {
    if (!refreshTimeRef.current) return
    const current = dayjs()
    const refreshTime = dayjs(refreshTimeRef.current)
    console.log(current.diff(refreshTime, 'minute'))
    console.log('internal msg:: current = ' + current + ', refresh time =' + refreshTime)
    if (current.diff(refreshTime, 'minute') > 2) {
      _init()
    }
  })

  useEffect(() => {
    if (!accessToken) {
      setMessages([])
      return
    }
    _init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  const _init = () => {
    pageRef.current = 0
    onRefresh(true)
    _count()
  }

  const _count = () => {
    count()
      .then((res) => {
        setCountNum(res as any as number)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onRefresh = (reload: boolean = false) => {
    console.log('---- onload -----')
    setLoading(true)
    list(pageRef.current, 20, '')
      .then((res) => {
        _fillMessage(reload, res as any as IMessagePageComponent)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setHasMore(false)
      })
  }

  const clearUnread = () => {
    Dialog.confirm({
      title: '确认',
      message: '是否全部清除？',
      onConfirm() {
        clear()
          .then(() => {
            _init()
            _count()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  const viewHandler = (id) => {
    const msgIndex: number | undefined = messages.findIndex((m) => m.id === id)
    if (msgIndex < 0) return
    console.log(id, msgIndex)
    _toDetail(msgIndex)
  }

  const _toDetail = async (msgIndex: number) => {
    const msg = messages[msgIndex]
    if (!msg || !msg.id) return
    try {
      const res = await Router.toMessagedetail({
        params: {
          id: msg.id
        },
        data: msg
      })
      if (res && res.delete) {
        _init()
        return
      }
      _toRead(msg, msgIndex)
    } catch (err) {
      console.log(err)
    }
  }

  const _toRead = (msg: IMessage, msgIndex: number) => {
    console.log(msg.status)
    if (!msg.id) return
    /** 更新状态 */
    if (msg.status === 0) {
      const writeMessages = [...messages]
      read(msg.id)
        .then(() => {
          console.log(msgIndex)
          writeMessages.splice(msgIndex, 1, { ...msg, status: 1 })
          setMessages(writeMessages)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const _fillMessage = (reload: boolean, res: IMessagePageComponent) => {
    setHasMore(!res.finished)
    setLoading(false)
    pageRef.current = pageRef.current + 1
    const msgs = reload ? [] : [...messages]
    setMessages(msgs.concat(res.messages))
    refreshTimeRef.current = dayjs().valueOf()
  }

  const messageSearch = async () => {
    try {
      const result = await Router.toMessagesearch()
      if (!result) return
      const { refresh } = result
      if (!refresh) return
      _init()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Fragment>
      <CommonMain className='vi-message-manager-warpper' left={false} title='消息管理' fixed>
        <View className='message-header'>
          <View className='action'>
            <View className='all'>全部消息({countNum})</View>
            <View className='clean' onClick={clearUnread}>
              <IconFont name='zuixing-81' size={38} /> 清除未读
            </View>
          </View>
          <View className='search'>
            <Button variant='text' size='mini' color='primary' icon={<Search />} onClick={messageSearch}>
              高级查询
            </Button>
          </View>
        </View>
        <NoticeMsg></NoticeMsg>
        <View className='br'></View>
        {messages.length === 0 ? (
          <Empty>
            <Empty.Image />
            <Empty.Description>暂无数据</Empty.Description>
          </Empty>
        ) : (
          <ScrollView className='list' scrollY style={{ height: '100vh' }} onScroll={(e) => setScrollTop(e.detail.scrollTop)} scrollWithAnimation>
            <List loading={loading} offset={20} hasMore={hasMore} scrollTop={scrollTop} onLoad={onRefresh}>
              {messages.map((item, i) => (
                <MessageBody key={i} message={item} viewHandler={viewHandler}></MessageBody>
              ))}
              <List.Placeholder>
                {loading && <Loading>加载中...</Loading>}
                {!hasMore && '没有更多了'}
              </List.Placeholder>
            </List>
          </ScrollView>
        )}
      </CommonMain>
      <Dialog id='dialog' />
    </Fragment>
  )
}

export default MessageManager
