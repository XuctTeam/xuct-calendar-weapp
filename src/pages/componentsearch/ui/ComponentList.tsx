/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-24 11:37:59
 * @LastEditTime: 2022-01-27 17:58:29
 * @LastEditors: Derek Xu
 */
import { useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import { List, Loading, Empty } from '@taroify/core'
import { ICalendarComponent } from '~/../@types/calendar'
import DayBody from './DayBody'

interface IPageStateProps {
  loading: boolean
  hasMore: boolean
  list: Array<ICalendarComponent>
  refresh: () => void
}

const heightStyle = (): React.CSSProperties => ({
  height: process.env.TARO_ENV === 'h5' ? `calc(100% - 90px)` : `calc(100% - 60px)`
})

const EventList: React.FC<IPageStateProps> = (props) => {
  const [scrollTop, setScrollTop] = useState(0)
  console.log(props.hasMore)
  return (
    <View className='vi-search-wrapper_list' style={heightStyle()}>
      {props.list.length === 0 ? (
        <Empty>
          <Empty.Image src='search' />
          <Empty.Description>暂无数据</Empty.Description>
        </Empty>
      ) : (
        <ScrollView
          scrollY
          style={{ height: '100%' }}
          onScroll={(e) => {
            console.log(1111111111)
            setScrollTop(e.detail.scrollTop)
          }}
        >
          <List loading={props.loading} offset={20} hasMore={props.hasMore} scrollTop={scrollTop} onLoad={() => props.refresh()}>
            {props.list.map((item, i) => (
              <DayBody key={i} day={item.day} components={item.components}></DayBody>
            ))}
            <List.Placeholder>
              {props.loading && <Loading>加载中...</Loading>}
              {!props.hasMore && '没有更多了'}
            </List.Placeholder>
          </List>
        </ScrollView>
      )}
    </View>
  )
}
export default EventList
