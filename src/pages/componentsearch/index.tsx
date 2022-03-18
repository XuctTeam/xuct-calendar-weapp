/*
 * @Description:日程搜索页面
 * @Author: Derek Xu
 * @Date: 2022-01-24 11:26:49
 * @LastEditTime: 2022-03-18 12:01:08
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useRef, useState } from 'react'
import { Empty, Search } from '@taroify/core'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { IDavComponent, ICalendarComponent, ICalendarPageComponent } from '~/../@types/calendar'
import { search } from '@/api/component'
import { ComponentList } from './ui'

import './index.scss'

const ComponentSearch: FunctionComponent = () => {
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
    search(value, page.current, 20)
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
   * 查看日程详情
   * @param component
   */
  const viewComponent = (component: IDavComponent) => {
    Router.toComponentview({
      params: {
        componentId: component.id
      },
      data: {
        component: component
      }
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
    <CommonMain className='vi-search-wrapper' title='日程搜索' left to={1} fixed>
      <View className='vi-search-wrapper_container'>
        <Search
          value={value}
          placeholder='请输入搜索关键词'
          action={<View onClick={() => toSearch()}>搜索</View>}
          onChange={(e) => setValue(e.detail.value)}
          onClear={() => clean()}
        />
        {list.length === 0 ? (
          <Empty>
            <Empty.Image src='search' />
            <Empty.Description>暂无数据</Empty.Description>
          </Empty>
        ) : (
          <ComponentList loading={loading} hasMore={hasMore} list={list} refresh={refresh} viewComponent={viewComponent}></ComponentList>
        )}
      </View>
    </CommonMain>
  )
}

export default ComponentSearch
