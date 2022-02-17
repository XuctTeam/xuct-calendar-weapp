/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-03 15:04:45
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-17 14:55:10
 */
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, View } from '@tarojs/components'
import { Empty, Search, List, Loading } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { IDvaCommonProps } from '~/../@types/dva'
import { list } from '@/api/message'

import './index.scss'

const MessageManager: FunctionComponent = () => {
  const page = useRef<number>(0)
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [scrollTop, setScrollTop] = useState(0)

  const heightStyle = (): React.CSSProperties => ({
    height: process.env.TARO_ENV === 'h5' ? `calc(100% - 60px)` : `calc(100% - 60px)`
  })

  useEffect(() => {
    if (accessToken) {
      refresh()
    }
  }, [])

  const refresh = () => {
    console.log('---- onload -----')
    setLoading(true)
    list(page.current, 20)
      .then((res) => {
        setLoading(false)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <CommonMain className='vi-message-manager-warpper' left={false} title='消息管理' fixed>
      <View style={{ height: '60px' }}>
        <Search value={value} placeholder='请输入搜索关键词' action={<View onClick={() => 111}>搜索</View>} onChange={(e) => setValue(e.detail.value)} />
      </View>

      <View style={heightStyle()}>
        {messages.length === 0 ? (
          <Empty>
            <Empty.Image />
            <Empty.Description>暂无数据</Empty.Description>
          </Empty>
        ) : (
          <ScrollView
            scrollY
            style={{ height: '100%' }}
            onScroll={(e) => {
              setScrollTop(e.detail.scrollTop)
            }}
          >
            <List loading={loading} offset={20} hasMore={hasMore} scrollTop={scrollTop} onLoad={() => refresh()}>
              {messages.map((item, i) => (
                <></>
              ))}
              <List.Placeholder>
                {loading && <Loading>加载中...</Loading>}
                {!hasMore && '没有更多了'}
              </List.Placeholder>
            </List>
          </ScrollView>
        )}
      </View>
    </CommonMain>
  )
}

export default MessageManager
