/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-04-22 21:11:46
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-22 21:14:25
 */
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import { ScrollView, View } from '@tarojs/components'
import { Empty, DropdownMenu, List, Loading } from '@taroify/core'
import { IDvaCommonProps } from '~/../@types/dva'
import { IMessagePageComponent, IMessage } from '~/../@types/message'
import { list, read } from '@/api/message'
import MessageBody from './MessageBody'

const InternalMsg = () => {
  const pageRef = useRef<number>(0)
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const [messages, setMessages] = useState<Array<IMessage>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [scrollTop, setScrollTop] = useState(0)
  const [status, setStatus] = useState<number>(2)
  const [sort, setSort] = useState<number>(0)

  useEffect(() => {
    if (!accessToken) {
      _reset(1)
      return
    }
    if (accessToken) {
      refresh(status, sort)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  const refresh = (sts: number, sot: number) => {
    console.log('---- onload -----')
    setLoading(true)
    list(pageRef.current, 20, sts, sot)
      .then((res) => {
        _fillMessage(res as any as IMessagePageComponent)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const statusChageHandler = (val: any) => {
    if (val === undefined) return
    _reset(0)
    setStatus(val)
    if (!accessToken) return
    refresh(val, sort)
  }

  const sortChageHandler = (val: any) => {
    if (val === undefined) return
    _reset(0)
    setSort(val)
    if (!accessToken) return
    refresh(status, val)
  }

  const _fillMessage = (res: IMessagePageComponent) => {
    setHasMore(!res.finished)
    setLoading(false)
    if (!res.messages || res.messages.length === 0) return
    setMessages(res.messages)
  }

  const _reset = (all: number) => {
    setMessages([])
    pageRef.current = 0
    if (all === 1) {
      setStatus(2)
      setSort(0)
      setHasMore(true)
    }
  }

  const viewHandler = (id: string) => {
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
  }

  const _toDetail = (msg: IMessage) => {
    Router.toMessagedetail({
      params: {
        id: msg.id
      },
      data: msg
    })
  }

  return (
    <View className='vi-message-manager-warpper_container'>
      <DropdownMenu>
        <DropdownMenu.Item value={status} onChange={statusChageHandler}>
          <DropdownMenu.Option value={2}>全部消息</DropdownMenu.Option>
          <DropdownMenu.Option value={0}>未读消息</DropdownMenu.Option>
          <DropdownMenu.Option value={1}>已读消息</DropdownMenu.Option>
        </DropdownMenu.Item>
        <DropdownMenu.Item value={sort} onChange={sortChageHandler}>
          <DropdownMenu.Option value={0}>默认排序</DropdownMenu.Option>
          <DropdownMenu.Option value={1}>时间排序</DropdownMenu.Option>
          <DropdownMenu.Option value={2}>类型排序</DropdownMenu.Option>
        </DropdownMenu.Item>
      </DropdownMenu>
      {messages.length === 0 ? (
        <Empty>
          <Empty.Image />
          <Empty.Description>暂无数据</Empty.Description>
        </Empty>
      ) : (
        <View className='list'>
          <ScrollView
            scrollY
            style={{ height: '100%' }}
            onScroll={(e) => {
              setScrollTop(e.detail.scrollTop)
            }}
          >
            <List loading={loading} offset={20} hasMore={hasMore} scrollTop={scrollTop} onLoad={() => refresh(status, sort)}>
              {messages.map((item, i) => (
                <MessageBody key={i} message={item} viewHandler={viewHandler}></MessageBody>
              ))}
              <List.Placeholder>
                {loading && <Loading>加载中...</Loading>}
                {!hasMore && '没有更多了'}
              </List.Placeholder>
            </List>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default InternalMsg
