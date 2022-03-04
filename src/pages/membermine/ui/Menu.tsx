/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-05 17:04:12
 * @LastEditTime: 2022-02-22 16:32:12
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Cell } from '@taroify/core'
import { Arrow, CalendarOutlined, ManagerOutlined, SettingOutlined, TvOutlined, UserCircleOutlined } from '@taroify/icons'
import { IUserInfo } from '../../../../@types/user'
import '../index.scss'

interface PageOwerStateProps {}

export interface ISettingProps {
  user: IUserInfo
}

type SettingProps = ISettingProps & PageOwerStateProps

const Setting: FunctionComponent<SettingProps> = (props) => {
  /**
   * 列表点击
   */
  const atListItemClickHandle = (params) => {
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
  }

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