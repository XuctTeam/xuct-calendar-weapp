/*
 * @Description:日程搜索页面
 * @Author: Derek Xu
 * @Date: 2022-01-24 11:26:49
 * @LastEditTime: 2022-01-27 18:00:49
 * @LastEditors: Derek Xu
 */
import React, { useRef, useState } from 'react'
import { Search } from '@taroify/core'
import CommonHeader from '@/components/mixin'
import { View } from '@tarojs/components'
import { IDavComponent, ICalendarComponent, ICalendarPageComponent } from '~/../@types/calendar'
import { search } from '@/api/component'
import { ComponentList } from './ui'

import './index.scss'
import dayjs from 'dayjs'

interface IPageStateProps {}

const ComponentSearch: React.FC<IPageStateProps> = () => {
  const [value, setValue] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<ICalendarComponent[]>([])
  const [loading, setLoading] = useState(false)
  const page = useRef(0)

  const toSearch = () => {
    refresh()
  }

  const clean = () => {
    setList([])
    page.current = 0
    setHasMore(true)
  }

  /**
   * 刷新加载
   */
  const refresh = () => {
    console.log('---- onload -----')

    setLoading(true)
    search(value, page.current, 2)
      .then((res) => {
        setLoading(false)
        const searchData: ICalendarPageComponent = res as any as ICalendarPageComponent
        if (!searchData.components || searchData.components.length === 0) {
          setHasMore(false)
          return
        }
        _fillComponentList(searchData.finished, searchData.components)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  /**
   * @description 填充展示数据
   * @param components
   */
  const _fillComponentList = (findished: boolean, components: Array<IDavComponent>) => {
    const days: Array<string> = list.map((i) => {
      return i.day
    })
    const componentList: Array<ICalendarComponent> = [...list]
    components.forEach((comp) => {
      const formatDay = dayjs(comp.dtstart).format('YYYY-MM-DD')
      if (days.includes(formatDay)) {
        componentList.find((i) => i.day === formatDay)?.components.push(comp)
      } else {
        days.push(formatDay)
        componentList.push({
          day: formatDay,
          calendarId: comp.calendarId,
          components: [comp]
        })
      }
    })
    setList(componentList)
    page.current = page.current + 1
    setHasMore(!findished)
  }

  return (
    <View className='vi-search-wrapper'>
      <CommonHeader title='日程搜索' left to={1} fixed></CommonHeader>
      <View style={{ marginTop: process.env.TARO_ENV === 'h5' ? '40px' : '0px' }}>
        <Search
          value={value}
          placeholder='请输入搜索关键词'
          action={<View onClick={() => toSearch()}>搜索</View>}
          onChange={(e) => setValue(e.detail.value)}
          onClear={() => clean()}
        />
      </View>
      <ComponentList loading={loading} hasMore={hasMore} list={list} refresh={refresh}></ComponentList>
    </View>
  )
}

export default ComponentSearch
