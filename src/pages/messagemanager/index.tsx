/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-03 15:04:45
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-21 18:20:04
 */
import { Key, FunctionComponent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, View } from '@tarojs/components'
import { Empty, DropdownMenu, List, Loading } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { IDvaCommonProps } from '~/../@types/dva'
import { IMessagePageComponent, IMessage } from '~/../@types/message'
import { list } from '@/api/message'
import { MessageBody } from './ui'

import './index.scss'

const MessageManager: FunctionComponent = () => {
  const page = useRef<number>(0)
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const [messages, setMessages] = useState<Array<IMessage>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [scrollTop, setScrollTop] = useState(0)
  const [status, setStatus] = useState<number>(2)

  useEffect(() => {
    if (accessToken) {
      refresh(status)
    }
  }, [])

  const refresh = (sts: number) => {
    console.log('---- onload -----')
    setLoading(true)
    list(page.current, 20, sts, 1)
      .then((res) => {
        _fillMessage(res as any as IMessagePageComponent)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const statusChageHandler = (val: any) => {
    setStatus(val)
    setMessages([])
    refresh(val)
  }

  const _fillMessage = (res: IMessagePageComponent) => {
    setHasMore(!res.finished)
    setLoading(false)
    if (!res.messages || res.messages.length === 0) return
    setMessages(res.messages)
  }

  return (
    <CommonMain className='vi-message-manager-warpper' left={false} title='消息管理' fixed>
      <View className='vi-message-manager-warpper_container'>
        <DropdownMenu>
          <DropdownMenu.Item value={status} onChange={statusChageHandler}>
            <DropdownMenu.Option value={2}>全部消息</DropdownMenu.Option>
            <DropdownMenu.Option value={0}>已读消息</DropdownMenu.Option>
            <DropdownMenu.Option value={1}>未读消息</DropdownMenu.Option>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
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
              <List loading={loading} offset={20} hasMore={hasMore} scrollTop={scrollTop} onLoad={() => refresh()}>
                {messages.map((item, i) => (
                  <MessageBody key={i} message={item}></MessageBody>
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
    </CommonMain>
  )
}

export default MessageManager
