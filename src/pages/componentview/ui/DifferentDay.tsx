/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-18 18:24:40
 * @LastEditTime: 2022-01-19 11:05:28
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { formatRepeatTime } from '@/utils/utils'

interface IPageState {
  dtstart: Date
  dtend: Date
  fullDay: number
  repeatStatus?: string
  repeatType?: string
  repeatByday?: string
  repeatBymonth?: string
  repeatBymonthday?: string
  repeatInterval?: number
  repeatUntil?: string
}

const DifferentDay: React.FC<IPageState> = (props) => {
  const {
    repeatStatus = '0',
    repeatType = '',
    repeatByday = '',
    repeatBymonth = '',
    repeatBymonthday = '',
    repeatInterval = 1,
    repeatUntil = dayjs().toDate()
  } = props

  const formatDay = (type: number): string => {
    if (type === 1) {
      return dayjs(props.dtstart).format(props.fullDay === 0 ? 'YYYY年MM月DD日 HH:mm' : 'YYYY年MM月DD日') + ' 开始'
    }
    return dayjs(props.dtend).format(props.fullDay === 0 ? 'YYYY年MM月DD日 HH:mm' : 'YYYY年MM月DD日') + ' 结束'
  }

  return (
    <View className='date-time'>
      <View className='cell'>{formatDay(1)}</View>
      <View className='cell'>{formatDay(2)}</View>
      {repeatStatus !== '0' && (
        <View className='cell'>
          {formatRepeatTime(repeatType, repeatStatus, repeatByday, repeatBymonth, repeatBymonthday, repeatInterval) +
            ',至 ' +
            dayjs(repeatUntil).format('YYYY-MM-DD')}
        </View>
      )}
    </View>
  )
}

export default DifferentDay
