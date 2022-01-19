/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-18 18:02:45
 * @LastEditTime: 2022-01-18 18:18:58
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { formatWeek } from '@/utils/utils'

interface IPageState {
  dtstart: Date
  dtend: Date
  fullDay: number
}

const RepeatTime: React.FC<IPageState> = (props) => {
  const formatSameDayTime = (): string => {
    const day: string = dayjs(props.dtstart).format('YYYY年MM月DD日') + '(' + formatWeek(dayjs(props.dtstart).get('day')) + ')'
    if (props.fullDay === 1) return day
    return day + dayjs(props.dtstart).format('HH:mm') + '-' + dayjs(props.dtend).format('HH:mm')
  }

  const formateSameDayDuration = (): string => {
    if (props.fullDay === 1) return '全天'
    const day1 = dayjs(props.dtend)
    const day2 = dayjs(props.dtstart)
    const diff: number = day1.diff(day2, 'second')
    if (diff < 3600) return day1.diff(day2, 'minute') + '分钟'
    if (diff % 60 === 0) return diff / (60 * 60) + '小时'
    return day1.diff(day2, 'hour') + '小时' + diff / (60 * 60 * 1000) + '分钟'
  }

  return (
    <View className='date-time'>
      <View className='cell'>{formatSameDayTime()}</View>
      <View className='cell'>{formateSameDayDuration()}</View>
    </View>
  )
}

export default RepeatTime
