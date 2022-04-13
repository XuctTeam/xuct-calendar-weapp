/*
 * @Author: Derek Xu
 * @Date: 2022-04-13 17:12:20
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-13 21:59:50
 * @FilePath: \xuct-calendar-weapp\src\pages\memberbindwechat\index.tsx
 * @Description: 绑定微信
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent, useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Cell, Avatar, Button, Empty } from '@taroify/core'
import { IUserAuth } from '~/../@types/dva'
import { useEnv } from 'taro-hooks'
import { getWechatAuth } from '@/api/user'

import './index.scss'

const MemberBindWechat: FunctionComponent = () => {
  const [avatar, setAvatar] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [env] = useEnv()

  useEffect(() => {
    _getData()
  }, [])

  const _getData = () => {
    const data = Router.getData()
    console.log(data)
    if (!data) {
      setLoading(true)
      getWechatAuth()
        .then((res) => {
          setLoading(false)
          if (!res) return
          const auth = res as any as IUserAuth
          setAvatar(auth.avatar)
          setUsername(auth.nickName)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
  }

  return (
    <CommonMain className='vi-member-bind-wechat-warpper' title='微信绑定' to={4} fixed={false} left>
      {!username ? (
        <Empty>
          <Empty.Image />
          <Empty.Description>{loading ? '加载中' : '暂未绑定'}</Empty.Description>
          {env === 'WEAPP' && (
            <Button shape='round' color='danger' className='bottom-button'>
              绑定
            </Button>
          )}
        </Empty>
      ) : (
        <View className='vi-member-bind-wechat-warpper_container'>
          <Cell title='头像' className='avatar'>
            <Avatar src={avatar} />
          </Cell>
          <Cell title='昵称'>111</Cell>
        </View>
      )}
    </CommonMain>
  )
}

export default MemberBindWechat
