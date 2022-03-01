/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-24 11:37:59
 * @LastEditTime: 2022-03-01 14:36:14
 * @LastEditors: Derek Xu
 */
import { useState } from 'react'
import { ScrollView, View } from '@tarojs/components'
import { List, Loading } from '@taroify/core'
import { ICalendarComponent, IDavComponent } from '~/../@types/calendar'
import DayBody from './DayBody'

interface IPageOption {
  loading: boolean
  hasMore: boolean
  list: Array<ICalendarComponent>
  refresh: () => void
  viewComponent: (component: IDavComponent) => void
}

const EventList: React.FC<IPageOption> = (props) => {
  const [scrollTop, setScrollTop] = useState(0)

  return (
    <View className='vi-search-wrapper_list'>
      <ScrollView
        scrollY
        style={{ height: '100%' }}
        onScroll={(e) => {
          setScrollTop(e.detail.scrollTop)
        }}
      >
        <List loading={props.loading} offset={20} hasMore={props.hasMore} scrollTop={scrollTop} onLoad={() => props.refresh()}>
          {props.list.map((item, i) => (
            <DayBody key={i} day={item.day} viewComponent={props.viewComponent} components={item.components}></DayBody>
          ))}
          <List.Placeholder>
            {props.loading && <Loading>加载中...</Loading>}
            {!props.hasMore && '没有更多了'}
          </List.Placeholder>
        </List>
      </ScrollView>
    </View>
  )
}
export default EventList
