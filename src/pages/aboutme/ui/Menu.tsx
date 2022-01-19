/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-05 17:04:12
 * @LastEditTime: 2022-01-17 14:15:13
 * @LastEditors: Derek Xu
 */
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Cell } from '@taroify/core'
import { Arrow, CalendarOutlined, ManagerOutlined, UserOutlined, SettingOutlined } from '@taroify/icons'
import { IUserInfo } from '../../../../@types/user'
import '../index.scss'
import Router from 'tarojs-router-next'

interface PageOwerStateProps {}

export interface ISettingProps {
  user: IUserInfo
}

type SettingProps = ISettingProps & PageOwerStateProps

export default function Setting(props: SettingProps) {
  /**
   * 列表点击
   */
  const atListItemClickHandle = (params) => {
    if (!props.user) {
      Router.toLogin()
      return
    }

    if (params === 1) {
      Router.toCalendarmanager()
    } else if (params === 5) {
      Router.toUserinfo()
    }
    console.log(props.user, params)
  }

  return (
    <View className='vi-aboutme-wrapper_setting'>
      <Cell size='large' icon={<CalendarOutlined />} title='我的日历' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 1)}></Cell>
      <Cell size='large' icon={<SettingOutlined />} title='日历设置' rightIcon={<Arrow />} clickable></Cell>
      <Cell size='large' icon={<ManagerOutlined />} title='在线客服' rightIcon={<Arrow />} clickable></Cell>
      <Cell size='large' icon={<UserOutlined />} title='账号与安全' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 5)}></Cell>
    </View>
  )
}
