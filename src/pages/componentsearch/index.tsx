/*
 * @Description:日程搜索页面
 * @Author: Derek Xu
 * @Date: 2022-01-24 11:26:49
 * @LastEditTime: 2022-01-25 21:35:53
 * @LastEditors: Derek Xu
 */
import React, { Fragment, useState } from 'react'
import { Search } from '@taroify/core'
import CommonHeader from '@/components/mixin'
import { View } from '@tarojs/components'
import { ICalendarComponent } from '~/../@types/calendar'
import { search } from '@/api/component'
import { ComponentList } from './ui'

import './index.scss'

interface IPageStateProps {}

const ComponentSearch: React.FC<IPageStateProps> = () => {
  const [value, setValue] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<ICalendarComponent[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)

  const toSearch = () => {
    setLoading(true)
    search(value, page, 20)
      .then((res) => {
        setLoading(false)
        const _list: Array<ICalendarComponent> = res as any as Array<ICalendarComponent>
        setList(list.concat(_list))
        setPage(page + 1)
        setHasMore(_list.length < 20)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const clean = () => {
    setList([])
    setPage(0)
    setHasMore(true)
  }

  const refresh = () => {
    if (hasMore) {
      return
    }
    console.log(hasMore)
  }

  return (
    <Fragment>
      <CommonHeader title='日程搜索' left to={1} fixed></CommonHeader>
      <View className='vi-search-wrapper'>
        <Search
          value={value}
          placeholder='请输入搜索关键词'
          action={<View onClick={() => toSearch()}>搜索</View>}
          onChange={(e) => setValue(e.detail.value)}
          onClear={() => clean()}
        />
        <ComponentList loading={loading} hasMore={hasMore} list={list} refresh={refresh}></ComponentList>
      </View>
    </Fragment>
  )
}

export default ComponentSearch
