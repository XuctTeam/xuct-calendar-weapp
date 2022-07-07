/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-07-07 13:02:03
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useRef, useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import { usePageScroll } from '@tarojs/taro'
import { Search, Empty, List, Loading } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { IPageGroup, IGroup } from '~/../@types/group'
import { search } from '@/api/group'
import { GroupBody } from './ui'

import './index.scss'
import Router from 'tarojs-router-next'

const GroupSearch: FunctionComponent = () => {
  const [value, setValue] = useState<string>('')
  const [list, setList] = useState<IGroup[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const pageRef = useRef<number>(0)

  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  const searchHandle = (refresh: boolean = false) => {
    if (!value) return
    if (refresh) {
      pageRef.current = 0
    }
    const _data = refresh ? [] : [...list]
    setLoading(true)
    setHasMore(true)
    search(value, pageRef.current, 20)
      .then((res) => {
        const pageData: IPageGroup = res as any as IPageGroup
        setHasMore(!pageData.finished)
        setList(_data.concat(...pageData.list))
        setLoading(false)
        pageRef.current = pageRef.current + 1
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setHasMore(false)
      })
  }

  const onJoinClickHandle = (id, hasPasswordJoin) => {
    Router.toGroupdetail({
      params: {
        id,
        hasPasswordJoin
      }
    })
  }

  // const toJoin = () => {
  //   if (!idRef.current) return
  //   setOpen(false)
  //   setPwdOpen(false)
  //   apply(idRef.current, password)
  //     .then(() => {
  //       idRef.current = ''
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       idRef.current = ''
  //     })
  // }

  return (
    <CommonMain className='vi-group-search-warpper' title='加入群组' fixed to={2} left>
      <View className='search'>
        <Search
          shape='rounded'
          value={value}
          placeholder='请输入搜索关键词'
          action={<View onClick={() => searchHandle(true)}>搜索</View>}
          onChange={(e) => setValue(e.detail.value)}
        />
      </View>
      <View className='list'>
        {list.length === 0 ? (
          <Empty>
            <Empty.Image />
            <Empty.Description>暂无结果</Empty.Description>
          </Empty>
        ) : (
          <ScrollView
            scrollY
            style={{ height: '100%' }}
            onScroll={(e) => {
              setScrollTop(e.detail.scrollTop)
            }}
          >
            <List loading={loading} offset={20} hasMore={hasMore} scrollTop={scrollTop} onLoad={searchHandle}>
              {list.map((item, i) => (
                <GroupBody key={i} group={item} onJoinClick={onJoinClickHandle}></GroupBody>
              ))}
              <List.Placeholder>
                {loading && <Loading>加载中...</Loading>}
                {!hasMore && '没有更多了~'}
              </List.Placeholder>
            </List>
          </ScrollView>
        )}
      </View>
    </CommonMain>
  )
}

export default GroupSearch
