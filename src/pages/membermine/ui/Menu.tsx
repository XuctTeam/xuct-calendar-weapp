/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-05 17:04:12
 * @LastEditTime: 2022-04-28 11:22:12
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Cell } from '@taroify/core'
import { IDvaCommonProps } from '~/../@types/dva'
import { throttle } from 'lodash/function'
import { useRequestSubscribeMessage, useEnv, useToast } from 'taro-hooks'
import { Arrow, CalendarOutlined, ManagerOutlined, SettingOutlined, TvOutlined, UserCircleOutlined, BulbOutlined } from '@taroify/icons'
import '../index.scss'

const Setting: FunctionComponent = () => {
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const env = useEnv()
  const [requestSubscribeMessage] = useRequestSubscribeMessage()
  const [toast] = useToast({
    mask: true,
    duration: 1000,
    title: 'initial title',
    icon: 'success'
  })

  /**
   * 列表点击
   */
  const atListItemClickHandle = throttle(
    (params) => {
      if (params === 1) {
        Router.toCalendarmanager()
      } else if (params === 2) {
        Router.toSystemsetting()
      } else if (params === 3) {
        _copy()
      } else if (params === 4) {
        Router.toCustomerservice()
      } else if (params === 5) {
        Router.toMemberinfo()
      } else if (params === 6) {
        _submessageClickHandle()
      }
    },
    800,
    {
      trailing: false
    }
  )

  const _submessageClickHandle = useCallback(async () => {
    if (!accessToken || env !== 'WEAPP') {
      toast({
        title: '请先登陆',
        icon: 'error'
      })
      return
    }
    let content = '订阅失败！'
    let flag = false
    //@ts-ignore
    const subscribeIds = WX_TEMPLATE_ID.IDS
    try {
      const { [subscribeIds]: result } = await requestSubscribeMessage(subscribeIds)
      if (result === 'accept') {
        content = '订阅成功！'
        flag = true
      }
    } catch (e) {
      console.log(e)
      content = '订阅失败！'
    }
    toast({
      title: content,
      icon: flag ? 'success' : 'error'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestSubscribeMessage, toast])

  const _copy = () => {
    Taro.setClipboardData({
      data: 'xuct.com.cn',
      success: function () {
        Taro.showToast({
          title: '已复制网址',
          icon: 'success'
        })
      }
    })
  }

  return (
    <View className='vi-aboutme-wrapper_setting'>
      {env === 'WEAPP' && <Cell icon={<BulbOutlined />} title='消息订阅' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 6)}></Cell>}
      <Cell icon={<CalendarOutlined />} title='我的日历' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 1)}></Cell>
      <Cell icon={<SettingOutlined />} title='账号设置' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 2)}></Cell>
      <Cell icon={<TvOutlined />} title='电脑版' clickable onClick={atListItemClickHandle.bind(this, 3)}>
        xuct.com.cn
      </Cell>
      <Cell icon={<ManagerOutlined />} title='在线客服' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 4)}></Cell>
      <Cell icon={<UserCircleOutlined />} title='账号与安全' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 5)}></Cell>
    </View>
  )
}

export default Setting
