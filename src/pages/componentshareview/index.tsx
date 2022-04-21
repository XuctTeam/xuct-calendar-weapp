/*
 * @Author: Derek Xu
 * @Date: 2022-04-20 13:27:42
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-21 16:49:25
 * @FilePath: \xuct-calendar-weapp\src\pages\componentshareview\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Router, { NavigateType } from 'tarojs-router-next'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { Backdrop, Button, Loading, Tag, Flex, Skeleton, WhiteSpace } from '@taroify/core'
import { ClockOutlined, UserOutlined, LocationOutlined } from '@taroify/icons'
import CommonMain from '@/components/mixin'
import { getShareInfo, getAttendStatus } from '@/api/component'
import { IDavComponent } from '~/../@types/calendar'
import { IDvaCommonProps } from '~/../@types/dva'
import { SameDay, DifferentDay } from './ui'

import './index.scss'

interface IShareComponent extends IDavComponent {
  attend: boolean
  createMemberName: string
}

const ComponentShareView: FunctionComponent = () => {
  const [component, setComponent] = useState<IShareComponent>()
  const [loading, setLoading] = useState<boolean>(false)
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)

  useEffect(() => {
    const params = Router.getParams()
    if (!params) return
    const { componentId } = params
    if (!component) {
      _getInfo(componentId || '')
      return
    }
    if (accessToken) {
      _getAttend()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

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

  const toIndex = () => {
    return Router.navigate({ url: '/pages/index/index' }, { type: NavigateType.redirectTo })
  }

  const _getAttend = () => {
    if (!component || !component.id) return
    getAttendStatus(component.id)
      .then((res) => {
        const flag = res as any as number
        if (flag === 1) {
          setComponent({ ...component, attend: true })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Fragment>
      <CommonMain left={false} title='日程邀请' fixed className='vi-component-share-warpper'>
        <View className='vi-component-share-warpper_contarin'>
          {!component ? (
            <View className='event-body'>
              <Skeleton />
              <WhiteSpace />
              <Skeleton animation={false} />
              <WhiteSpace />
              <Skeleton animation='wave' />
              <WhiteSpace />
              <Skeleton animation='wave' />
            </View>
          ) : (
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
          )}
        </View>
        <View className='vi-component-share-warpper_button'>
          {!accessToken ? (
            <Button color='primary' block onClick={() => Router.toLogin()}>
              去登录
            </Button>
          ) : (
            <Flex gutter={10}>
              <Flex.Item span={12}>
                <Button color='primary' block onClick={toIndex}>
                  去首页
                </Button>
              </Flex.Item>
              {!loading && component && !component.attend && (
                <Flex.Item span={12}>
                  <Button color='danger' block>
                    接受邀请
                  </Button>
                </Flex.Item>
              )}
            </Flex>
          )}
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
