/*
 * @Author: Derek Xu
 * @Date: 2022-04-20 13:27:42
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-20 17:21:30
 * @FilePath: \xuct-calendar-weapp\src\pages\componentshareview\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent, useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { Button, Tag } from '@taroify/core'
import { ClockOutlined, FriendsOutlined } from '@taroify/icons'
import CommonMain from '@/components/mixin'
import { IDavComponent } from '~/../@types/calendar'
import { SameDay, DifferentDay } from './ui'

import './index.scss'

const defaultComponent: IDavComponent = {
  id: '',
  calendarId: '',
  creatorMemberId: '',
  location: '',
  fullDay: 0,
  dtstart: dayjs().toDate(),
  dtend: dayjs().toDate(),
  description: '',
  summary: '',
  status: '',
  alarmType: '0',
  color: 'fff',
  calendarName: '',
  attendStatus: 0
}

const ComponentShareView: FunctionComponent = () => {
  const [component, setComponent] = useState<IDavComponent>(defaultComponent)

  useEffect(() => {
    const params = Router.getParams()
    if (!params) return
    const { componentId } = params
    console.log(componentId)
  }, [])

  return (
    <CommonMain left={false} title='日程邀请' fixed className='vi-component-share-warpper'>
      <View className='vi-component-share-warpper_contarin'>
        <View className='event-body'>
          <View className='event-summary'>sdfsdf</View>
          <View className='cell-item'>
            <View className='event-icon'>
              <ClockOutlined size={20} />
            </View>
            <View className='event-content'>
              {dayjs(component.dtstart).isSame(component.dtend, 'date') ? (
                <SameDay dtstart={component.dtstart} dtend={component.dtend} fullDay={component.fullDay}></SameDay>
              ) : (
                <DifferentDay
                  dtstart={component.dtstart}
                  dtend={component.dtend}
                  fullDay={component.fullDay}
                  repeatStatus={component.repeatStatus}
                  repeatType={component.repeatType}
                  repeatByday={component.repeatByday}
                  repeatBymonth={component.repeatBymonth}
                  repeatBymonthday={component.repeatBymonthday}
                  repeatInterval={component.repeatInterval}
                ></DifferentDay>
              )}
            </View>
          </View>
          <View className='cell-item'>
            <View className='event-icon'>
              <FriendsOutlined size={20} />
            </View>
            <View className='event-content'>水电费水电费</View>
          </View>
          <View className='cell-item'>
            <View className='event-icon'>
              <FriendsOutlined size={20} />
            </View>
            <View className='event-content'>
              水电费水电费
              <Tag color='primary' className='user-tag '>
                组织者
              </Tag>
            </View>
          </View>
        </View>
      </View>
      <View className='vi-component-share-warpper_button'>
        <Button color='primary' block>
          接受邀请
        </Button>
      </View>
    </CommonMain>
  )
}

export default ComponentShareView
