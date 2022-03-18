/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-05 17:04:12
 * @LastEditTime: 2022-03-18 08:56:14
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Cell } from '@taroify/core'
import { throttle } from 'lodash/function'
import { Arrow, CalendarOutlined, ManagerOutlined, SettingOutlined, TvOutlined, UserCircleOutlined } from '@taroify/icons'
import '../index.scss'

const Setting: FunctionComponent = () => {
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
      }
    },
    800,
    {
      trailing: false
    }
  )

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
