/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-24 11:37:59
 * @LastEditTime: 2022-01-24 18:41:09
 * @LastEditors: Derek Xu
 */
import { useState } from 'react'
import { View } from '@tarojs/components'
import { List, Loading, Empty } from '@taroify/core'
import { usePageScroll } from '@tarojs/taro'
import { ICalendarComponent } from '~/../@types/calendar'
import DayBody from './DayBody'

interface IPageStateProps {
  loading: boolean
  hasMore: boolean
  list: Array<ICalendarComponent>
  refresh: () => void
}

const EventList: React.FC<IPageStateProps> = (props) => {
  const [scrollTop, setScrollTop] = useState(0)

  usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  return (
    <View className='vi-search-wrapper_list'>
      {props.list.length === 0 ? (
        <Empty>
          <Empty.Image src='search' />
          <Empty.Description>暂无数据</Empty.Description>
        </Empty>
      ) : (
        <List loading={props.loading} hasMore={props.hasMore} scrollTop={scrollTop} onLoad={() => props.refresh()}>
          {props.list.map((item, i) => (
            <DayBody key={i} day={item.day} components={item.components}></DayBody>
          ))}
          <List.Placeholder>
            {props.loading && <Loading>加载中...</Loading>}
            {!props.hasMore && '没有更多了'}
          </List.Placeholder>
        </List>
      )}
    </View>
  )
}
export default EventList
