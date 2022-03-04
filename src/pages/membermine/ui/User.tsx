/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-05 13:27:57
 * @LastEditTime: 2022-03-02 22:09:39
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Avatar } from '@taroify/core'
import IconFont from '@/components/iconfont'
import { DEFAULT_AVATAR } from '@/constants/index'
import '../index.scss'
import { Loading } from '@taroify/core'

interface IPageOption {
  hasLogin: boolean
  nickname: string
  avatar?: string
  loading: boolean
  refresh: () => void
}

const User: FunctionComponent<IPageOption> = (props) => {
  return (
    <View className='vi-aboutme-wrapper_head'>
      <View className='top'>
        <View className='top-thumb'>
          <Avatar src={props.avatar ? props.avatar : DEFAULT_AVATAR} size='large' />
        </View>
        {!props.hasLogin ? (
          <View className='top-info' onClick={() => Router.toLogin()}>
            <View className='top-info_need'>立即登录</View>
            <View className='top-info_text'>登录后才可以创建、管理日程</View>
          </View>
        ) : (
          <View className='top-refresh'>
            <View className='top-user'>你好: {props.nickname}</View>
            <View onClick={props.refresh}>{props.loading ? <Loading type='spinner' size={20} /> : <IconFont name='29Refresh_01' size={48} />}</View>
          </View>
        )}
      </View>
    </View>
  )
}
export default User
