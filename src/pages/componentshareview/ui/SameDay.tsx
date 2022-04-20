/*
 * @Author: Derek Xu
 * @Date: 2022-04-20 16:06:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-20 16:06:07
 * @FilePath: \xuct-calendar-weapp\src\pages\componentshareview\ui\SameDay.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-18 18:02:45
 * @LastEditTime: 2022-03-01 14:35:47
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { View } from '@tarojs/components'
import { formatSameDayTime, formateSameDayDuration } from '@/utils/utils'

interface IPageOption {
  dtstart: Date
  dtend: Date
  fullDay: number
}

const RepeatTime: React.FC<IPageOption> = (props) => {
  return (
    <View className='date-time'>
      <View className='cell'>{formatSameDayTime(props.fullDay, props.dtstart, props.dtend)}</View>
      <View className='cell'>{formateSameDayDuration(props.fullDay, props.dtstart, props.dtend)}</View>
    </View>
  )
}

export default RepeatTime
