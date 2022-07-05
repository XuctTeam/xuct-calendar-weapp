/*
 * @Author: Derek Xu
 * @Date: 2022-06-12 20:12:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-05 19:00:54
 * @FilePath: \xuct-calendar-weapp\src\pages\messagesearch\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { usePageScroll } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Backdrop, Button, Checkbox, Dialog, FixedView, List, Loading, Search } from '@taroify/core'
import { list as searchQry, read, removeAll, readAll } from '@/api/message'
import { IMessage, IMessagePageComponent } from '~/../@types/message'
import { throttle } from 'lodash/function'
import { MessageBody } from './ui'

import './index.scss'

type TMessage = { checked: boolean } & IMessage

const index: FunctionComponent = () => {
  const pageRef = useRef<number>(0)
  const [value, setValue] = useState('')
  const [hasMore, setHasMore] = useState(false)
  const [messages, setMessages] = useState<TMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const [lock, setLock] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

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

  const selectAll = (e: boolean) => {
    setMessages(
      messages.map((item) => {
        return { ...item, checked: e }
      })
    )
    setCheckAll(e)
  }

  const itemCheck = (id: string, checked: boolean) => {
    const msgArray = [...messages]
    let msg = msgArray.find((item) => item.id === id)
    if (!msg) return
    const index = msgArray.findIndex((item) => item.id === id)
    msg.checked = checked
    msgArray.splice(index, 1, msg)
    setMessages(msgArray)
    const selectNumArray = msgArray.filter((item) => item.checked)
    if (selectNumArray.length === msgArray.length) {
      setCheckAll(true)
    } else {
      if (checkAll) {
        setCheckAll(false)
      }
    }
  }

  const _fillMessage = (reload: boolean, res: IMessagePageComponent) => {
    setHasMore(!res.finished)
    setLoading(false)
    pageRef.current = pageRef.current + 1
    const msgs = reload ? [] : [...messages]
    setMessages(
      msgs.concat(
        res.messages.map((x) => {
          return { ...x, checked: false }
        })
      )
    )
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

  const deleteAllMessage = () => {
    const deleteArray = messages.filter((item) => item.checked)
    if (deleteArray.length === 0) {
      return
    }
    setLock(true)
    setOpen(false)
    removeAll(
      deleteArray.map((i) => {
        return i.id || ''
      })
    )
      .then(() => {
        setLock(false)
        search()
      })
      .catch((err) => {
        console.log(err)
        setLock(false)
      })
  }

  const readAllMessage = () => {
    const readArray = messages.filter((item) => item.checked)
    if (readArray.length === 0) {
      return
    }
    readAll(
      readArray.map((i) => {
        return i.id || ''
      })
    )
      .then(() => {
        search()
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
    <Fragment>
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
        <View className='container'>
          <List className='list' loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={refresh}>
            {messages.map((item, index) => (
              <MessageBody key={index} message={item} selected={itemCheck} viewHandler={viewHandler}></MessageBody>
            ))}
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {!hasMore && '没有更多了'}
            </List.Placeholder>
          </List>
        </View>
      </CommonMain>
      <FixedView position='bottom' className='vi-message-search-warpper_opt'>
        <Checkbox size={20} checked={checkAll} onChange={(e) => selectAll(e)}>
          全选
        </Checkbox>
        <View className='button'>
          <Button size='small' color='primary' onClick={() => readAllMessage()}>
            已读
          </Button>
          <Button size='small' color='danger' onClick={() => setOpen(true)}>
            删除
          </Button>
        </View>
      </FixedView>
      <Backdrop className='vi-message-search-warpper_popup' open={lock}>
        <Loading type='spinner' />
      </Backdrop>
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Header>确认</Dialog.Header>
        <Dialog.Content>是否确认？</Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={deleteAllMessage}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </Fragment>
  )
}

export default index
