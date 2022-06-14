/*
 * @Author: Derek Xu
 * @Date: 2022-06-12 20:12:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-06-14 20:51:48
 * @FilePath: \xuct-calendar-weapp\src\pages\messagesearch\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { usePageScroll } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Cell, Checkbox, List, Loading, Search } from '@taroify/core'
import { list as searchQry, read } from '@/api/message'
import { IMessage, IMessagePageComponent } from '~/../@types/message'
import { throttle } from 'lodash/function'
import { MessageBody } from './ui'
import './index.scss'

const index: FunctionComponent = () => {
  const pageRef = useRef<number>(0)
  const [value, setValue] = useState('')
  const [hasMore, setHasMore] = useState(false)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  useEffect(() => {}, [])

  const refresh = (reload: boolean = false) => {
    searchQry(pageRef.current, 20, value)
      .then((res) => {
        _fillMessage(reload, res as any as IMessagePageComponent)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setHasMore(false)
      })
  }

  const search = () => {
    if (!value) return
    pageRef.current = 0
    setHasMore(true)
    refresh(true)
  }

  const _fillMessage = (reload: boolean, res: IMessagePageComponent) => {
    setHasMore(!res.finished)
    setLoading(false)
    pageRef.current = pageRef.current + 1
    const msgs = reload ? [] : [...messages]
    setMessages(msgs.concat(res.messages))
  }

  const viewHandler = throttle(
    (id: string) => {
      const msgIndex: number | undefined = messages.findIndex((m) => m.id === id)
      if (msgIndex < 0) return
      const msg = messages[msgIndex]
      if (msg.status === 0) {
        const writeMessages = [...messages]
        read(id)
          .then(() => {
            msg.status = 1
            writeMessages.splice(msgIndex, 1, msg)
            setMessages(writeMessages)
            _toDetail(msg)
          })
          .catch((err) => {
            console.log(err)
          })
        return
      }
      _toDetail(msg)
    },
    300,
    {
      trailing: false
    }
  )

  const _toDetail = async (msg: IMessage) => {
    try {
      const res = await Router.toMessagedetail({
        params: {
          id: msg.id
        },
        data: msg
      })
      if (res && res.delete) {
        refresh()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <CommonMain title='消息搜索' left fixed className='vi-message-search-warpper' to={3}>
      <Search
        value={value}
        shape='rounded'
        placeholder='请输入搜索关键词'
        onChange={(e) => setValue(e.detail.value)}
        clearable
        onClear={() => setMessages([])}
        onSearch={search}
      />
      <View className='opt taroify-hairline--top'>
        <Checkbox shape='square' size={20}>
          全选
        </Checkbox>
        筛选
      </View>
      <View className='container'>
        <List className='list' loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={refresh}>
          {messages.map((item, index) => (
            <MessageBody key={index} message={item} viewHandler={viewHandler}></MessageBody>
          ))}
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && '没有更多了'}
          </List.Placeholder>
        </List>
      </View>
    </CommonMain>
  )
}

export default index
