/*
 * @Author: Derek Xu
 * @Date: 2022-04-20 13:27:42
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-22 17:32:45
 * @FilePath: \xuct-calendar-weapp\src\pages\componentshareview\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router, { NavigateType } from 'tarojs-router-next'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { Backdrop, Button, Loading, Tag, Flex, Skeleton, WhiteSpace } from '@taroify/core'
import { ClockOutlined, UserOutlined, LocationOutlined } from '@taroify/icons'
import CommonMain from '@/components/mixin'
import { useModal } from 'taro-hooks'
import { getShareInfo, existsAttend, acceptAttend } from '@/api/component'
import { IDavComponent } from '~/../@types/calendar'
import { IDvaCommonProps } from '~/../@types/dva'

import { SameDay, DifferentDay } from './ui'

import './index.scss'

interface IShareComponent extends IDavComponent {
  attend: boolean
  createMemberName: string
}

const ComponentShareView: FunctionComponent = () => {
  const dispatch = useDispatch()
  const [component, setComponent] = useState<IShareComponent>()
  const [loading, setLoading] = useState<boolean>(false)
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false)
  const [show] = useModal({})

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

  const acctepAttendHandler = useCallback(
    (compt: IShareComponent) => {
      if (!compt || !compt.id) return
      show({
        title: '确定接受吗?'
      }).then((res) => {
        if (res.cancel) return
        _accept(compt)
        console.log(res)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [show]
  )

  const _getAttend = () => {
    if (!component || !component.id) return
    existsAttend(component.id)
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

  const _accept = (compt: IShareComponent) => {
    setAcceptLoading(true)
    acceptAttend(compt.id)
      .then(() => {
        setComponent({ ...compt, attend: true })
        dispatch({
          type: 'component/refreshTime',
          payload: dayjs().unix()
        })
        setAcceptLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setAcceptLoading(false)
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
                <View className='event-icon event-icon-padding-top'>
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
                <View className='event-content'>{component.location || '无描述'}</View>
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
              <Flex.Item span={component && component.attend ? 24 : 12}>
                <Button color='primary' block onClick={toIndex}>
                  去首页
                </Button>
              </Flex.Item>
              {!loading && component && !component.attend && (
                <Flex.Item span={12}>
                  <Button color='danger' block onClick={() => acctepAttendHandler(component)} disabled={acceptLoading} loading={acceptLoading}>
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
