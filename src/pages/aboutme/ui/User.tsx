/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-05 13:27:57
 * @LastEditTime: 2022-03-01 17:41:14
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Avatar } from '@taroify/core'
import '../index.scss'

interface IPageOption {
  hasLogin: boolean
  nickname: string
  avatar?: string
}

const defaultAvatar = 'http://images.xuct.com.cn/avatar_default.png'

const User: FunctionComponent<IPageOption> = (props) => {
  return (
    <View className='vi-aboutme-wrapper_head'>
      <View className='top'>
        <View className='top-thumb'>
          <Avatar src={props.avatar ? props.avatar : defaultAvatar} size='large' />
        </View>
        {!props.hasLogin ? (
          <View className='top-info' onClick={() => Router.toLogin()}>
            <View className='top-info_need'>立即登录</View>
            <View className='top-info_text'>登录后才可以创建、管理日程</View>
          </View>
        ) : (
          <View className='top-user'>欢迎: {props.nickname}</View>
        )}
      </View>
    </View>
  )
}
export default User
