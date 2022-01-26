/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-05 17:04:12
 * @LastEditTime: 2022-01-26 13:15:32
 * @LastEditors: Derek Xu
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Cell } from '@taroify/core'
import { Arrow, CalendarOutlined, ManagerOutlined, ClusterOutlined, SettingOutlined, TvOutlined, UserCircleOutlined } from '@taroify/icons'
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
    if (!props.user && params !== 3 && params !== 4) {
      Router.toLogin()
      return
    }

    if (params === 1) {
      Router.toCalendarmanager()
    } else if (params === 3) {
      _copy()
    } else if (params === 4) {
      Router.toCustomerservice()
    } else if (params === 5) {
      Router.toUserinfo()
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

  const getVersion = () => {
    //@ts-ignore
    return VERSION.version
  }

  return (
    <View className='vi-aboutme-wrapper_setting'>
      <Cell icon={<CalendarOutlined />} title='我的日历' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 1)}></Cell>
      <Cell icon={<SettingOutlined />} title='系统设置' rightIcon={<Arrow />} clickable></Cell>
      <Cell icon={<TvOutlined />} title='电脑版' clickable onClick={atListItemClickHandle.bind(this, 3)}>
        xuct.com.cn
      </Cell>
      <Cell icon={<ClusterOutlined />} title='当前版本'>
        {getVersion()}
      </Cell>
      <Cell icon={<ManagerOutlined />} title='在线客服' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 4)}></Cell>
      <Cell icon={<UserCircleOutlined />} title='账号与安全' rightIcon={<Arrow />} clickable onClick={atListItemClickHandle.bind(this, 5)}></Cell>
    </View>
  )
}
