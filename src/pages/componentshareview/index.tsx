/*
 * @Author: Derek Xu
 * @Date: 2022-04-20 13:27:42
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-20 22:03:38
 * @FilePath: \xuct-calendar-weapp\src\pages\componentshareview\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { Backdrop, Button, Loading, Tag } from '@taroify/core'
import { ClockOutlined, UserOutlined, LocationOutlined } from '@taroify/icons'
import CommonMain from '@/components/mixin'
import { IDavComponent } from '~/../@types/calendar'
import { SameDay, DifferentDay } from './ui'
import { getShareInfo } from '@/api/component'

import './index.scss'

interface IShareComponent extends IDavComponent {
  attend: boolean
  createMemberName: string
}

const defaultComponent: IShareComponent = {
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
  attendStatus: 0,
  attend: false,
  createMemberName: ''
}

const ComponentShareView: FunctionComponent = () => {
  const [component, setComponent] = useState<IShareComponent>(defaultComponent)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const params = Router.getParams()
    if (!params) return
    const { componentId } = params
    _getInfo(componentId || '')
  }, [])

  const _getInfo = (componentId: string) => {
    if (!componentId) return
    setLoading(true)
    getShareInfo(componentId)
      .then((res) => {
        const shareComponent: IShareComponent = res as any as IShareComponent
        setComponent(shareComponent)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <Fragment>
      <CommonMain left={false} title='日程邀请' fixed className='vi-component-share-warpper'>
        <View className='vi-component-share-warpper_contarin'>
          <View className='event-body'>
            <View className='event-summary'>{component.summary}</View>
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
                <LocationOutlined size={20} />
              </View>
              <View className='event-content'>{component.location}</View>
            </View>
            <View className='cell-item'>
              <View className='event-icon'>
                <UserOutlined size={20} />
              </View>
              <View className='event-content'>
                {component.createMemberName}
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

      <Backdrop open={loading} closeable onClose={() => setLoading(false)}>
        <View className='content-block'>
          <Loading type='spinner'>加载中...</Loading>
        </View>
      </Backdrop>
    </Fragment>
  )
}

export default ComponentShareView
