/*
 * @Author: Derek Xu
 * @Date: 2022-06-12 20:12:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-12 17:38:20
 * @FilePath: \xuct-calendar-weapp\src\pages\messagesearch\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */
import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { usePageScroll } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { useToast } from 'taro-hooks'
import { Backdrop, Button, Checkbox, Dialog, FixedView, List, Loading, Search } from '@taroify/core'
import { list as searchQry, read, removeAll, readAll } from '@/api/message'
import { IMessage, IMessagePageComponent } from '~/../@types/message'
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
  const [toast] = useToast({})
  const [refresh, setRefresh] = useState<boolean>(false)

  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  useEffect(() => {}, [])

  const onRefresh = (reload: boolean = false) => {
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
    setLoading(true)
    onRefresh(true)
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

  const viewHandler = (id: string) => {
    const msgIndex: number | undefined = messages.findIndex((m) => m.id === id)
    if (msgIndex < 0) return
    _toDetail(msgIndex)
  }

  const deleteAllMessage = () => {
    const deleteArray = messages.filter((item) => item.checked)
    if (deleteArray.length === 0) {
      toast({
        title: '请选择数据',
        icon: 'error'
      })
      return
    }
    Dialog.confirm({
      title: '确认',
      message: '确认全部删除？',
      onConfirm: () => {
        _deleteAll(deleteArray)
      }
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
        setRefresh(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _toDetail = async (msgIndex: number) => {
    const msg = messages[msgIndex]
    try {
      const res = await Router.toMessagedetail({
        params: {
          id: msg.id
        },
        data: msg
      })
      if (res && res.delete) {
        onRefresh()
      }
      _toRead(msg, msgIndex)
    } catch (err) {
      console.log(err)
    }
  }

  const _toRead = (msg: TMessage, msgIndex: number) => {
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

  const _deleteAll = (deleteArray: TMessage[]) => {
    setLock(true)
    removeAll(
      deleteArray.map((i) => {
        return i.id || ''
      })
    )
      .then(() => {
        setLock(false)
        search()
        setRefresh(true)
      })
      .catch((err) => {
        console.log(err)
        setLock(false)
      })
  }

  return (
    <Fragment>
      <CommonMain title='消息搜索' left fixed className='vi-message-search-warpper' to={3} data={{ refresh }}>
        <Search
          value={value}
          shape='rounded'
          placeholder='请输入搜索关键词'
          onChange={(e) => setValue(e.detail.value)}
          clearable
          onClear={() => setMessages([])}
          onSearch={search}
        />
        <ScrollView className='list' scrollY style={{ height: '100vh' }} onScroll={(e) => setScrollTop(e.detail.scrollTop)} scrollWithAnimation>
          <List loading={loading} offset={20} hasMore={hasMore} scrollTop={scrollTop} onLoad={onRefresh}>
            {messages.map((item, index) => (
              <MessageBody key={index} message={item} selected={itemCheck} viewHandler={viewHandler}></MessageBody>
            ))}
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {!hasMore && '没有更多了'}
            </List.Placeholder>
          </List>
        </ScrollView>
      </CommonMain>
      <FixedView position='bottom' className='vi-message-search-warpper_opt'>
        <Checkbox size={20} checked={checkAll} onChange={(e) => selectAll(e)}>
          全选
        </Checkbox>
        <View className='button'>
          <Button size='small' color='primary' onClick={() => readAllMessage()}>
            已读
          </Button>
          <Button size='small' color='danger' onClick={deleteAllMessage}>
            删除
          </Button>
        </View>
      </FixedView>
      <Backdrop className='vi-message-search-warpper_popup' open={lock}>
        <Loading type='spinner' />
      </Backdrop>
      <Dialog id='dialog' />
    </Fragment>
  )
}

export default index
