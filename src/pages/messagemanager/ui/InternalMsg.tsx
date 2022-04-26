/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-04-22 21:11:46
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-26 17:24:34
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import { ScrollView, View } from '@tarojs/components'
import { Empty, List, Loading, Flex, Search, Cell } from '@taroify/core'
import { Arrow } from '@taroify/icons'
import { IDvaCommonProps } from '~/../@types/dva'
import { IMessagePageComponent, IMessage } from '~/../@types/message'
import { list, read } from '@/api/message'
import MessageBody from './MessageBody'

interface IPageOption {
  status: number
  statusPickerChage: (flag: boolean) => void
}

const InternalMsg: FunctionComponent<IPageOption> = (props) => {
  const pageRef = useRef<number>(0)
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [scrollTop, setScrollTop] = useState(0)
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    if (!accessToken) {
      return
    }
    _init(props.status)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, props.status])

  const _init = (nm: number) => {
    pageRef.current = 0
    refresh(nm, [])
  }

  const refresh = (nm: number, msgs: IMessage[]) => {
    console.log('---- onload -----')
    setLoading(true)
    list(pageRef.current, 1, nm)
      .then((res) => {
        _fillMessage(res as any as IMessagePageComponent, msgs)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setHasMore(false)
      })
  }

  const _fillMessage = (res: IMessagePageComponent, msgs: IMessage[]) => {
    setHasMore(!res.finished)
    setLoading(false)
    pageRef.current = pageRef.current + 1
    setMessages(msgs.concat(res.messages))
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
    <Fragment>
      <View className='search'>
        <Flex gutter={4}>
          <Flex.Item span={18}>
            <Search shape='rounded' value={searchValue} placeholder='请输入搜索关键词' onChange={(e) => setSearchValue(e.detail.value)} />
          </Flex.Item>
          <Flex.Item span={6}>
            <Cell rightIcon={<Arrow />} clickable onClick={() => props.statusPickerChage(true)}>
              {props.status === 2 ? '全部' : props.status === 0 ? '未读' : '已读'}
            </Cell>
          </Flex.Item>
        </Flex>
      </View>
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
            <List loading={loading} offset={20} hasMore={hasMore} scrollTop={scrollTop} onLoad={() => refresh(props.status, messages)}>
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
    </Fragment>
  )
}

export default InternalMsg
