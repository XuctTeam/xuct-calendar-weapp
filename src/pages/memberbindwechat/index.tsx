/*
 * @Author: Derek Xu
 * @Date: 2022-04-13 17:12:20
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-18 15:06:44
 * @FilePath: \xuct-calendar-weapp\src\pages\memberbindwechat\index.tsx
 * @Description: 绑定微信
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Cell, Avatar, Button, Empty } from '@taroify/core'
import { IDvaCommonProps, IUserAuth } from '~/../@types/dva'
import { useEnv, useUserInfo, useLogin, useToast } from 'taro-hooks'
import { getWechatAuth, bindWx, auths, updateWxInfo, baseUserInfo } from '@/api/user'
import { useBack } from '@/utils/taro'
import { IUserInfo } from 'taro-hooks/dist/useUserInfo'

import './index.scss'

const MemberBindWechat: FunctionComponent = () => {
  const dispatch = useDispatch()
  const [memberId, setMemberId] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [code, setCode] = useState<string>()
  const env = useEnv()
  const [, { getUserProfile }] = useUserInfo()
  const loadingEffect = useSelector<IDvaCommonProps, any>((state) => state.loading)
  const saveLoading = loadingEffect.effects['common/saveStorageSync']
  const [login] = useLogin()
  const [toast] = useToast({
    icon: 'error'
  })
  const [back] = useBack()

  useEffect(() => {
    _getData()
    if (env === 'WEAPP') {
      _login()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [env])

  if (saveLoading) {
    back({ to: 4 })
  }

  const _getData = () => {
    const data = Router.getData()
    console.log(data)
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { username, avatar, memberId } = data
      setAvatar(avatar)
      setUsername(username)
      setMemberId(memberId)
      return
    }

    setLoading(true)
    getWechatAuth()
      .then((res) => {
        setLoading(false)
        if (!res) return
        const auth = res as any as IUserAuth
        setAvatar(auth.avatar)
        setUsername(auth.nickName)
        setMemberId(auth.memberId)
        return
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const handleGetUserInfo = () => {
    getUserProfile({ lang: 'zh_CN', desc: '用于完善会员资料' })
      .then((res) => {
        const { iv, encryptedData } = res as any as IUserInfo
        if (!iv || !encryptedData) {
          toast({ title: '微信登陆失败' })
          return
        }
        _bindWx(encryptedData, iv)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const _login = useCallback(() => {
    login(true)
      .then((res) => {
        setCode(res)
      })
      .catch((err) => {
        console.log(err)
        login(false)
          .then((rs) => {
            setCode(rs as any as string)
          })
          .catch((er) => {
            console.log(er)
            toast({
              title: '获取微信Code失败'
            })
          })
      })
  }, [toast, login])

  const modifyMemberNameAndAvatar = () => {
    updateWxInfo().then(() => {
      dispatch({
        type: 'calendar/updateCalendarMemberName',
        payload: {
          createMemberId: memberId,
          createMemberName: username
        }
      })
      _updateMemberInfo()
    })
  }

  /**
   * @description: 微信绑定
   * @param {string} encryptedData
   * @param {string} iv
   * @return {*}
   */
  const _bindWx = (encryptedData: string, iv: string) => {
    if (!code) return
    bindWx(code, encryptedData, iv)
      .then(() => {
        _back()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _back = () => {
    toast({
      title: '操作成功',
      icon: 'success'
    })
    auths()
      .then((res) => {
        dispatch({
          type: 'common/saveStorageSync',
          payload: {
            auths: res as any as Array<IUserAuth>
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _updateMemberInfo = () => {
    baseUserInfo()
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { id, name, avatar } = res
        dispatch({
          type: 'common/saveStorageSync',
          payload: {
            userInfo: {
              id,
              name,
              avatar
            }
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonMain className='vi-member-bind-wechat-warpper' title='微信绑定' to={4} fixed={false} left>
      {!username ? (
        <Empty>
          <Empty.Image />
          <Empty.Description>{loading ? '加载中' : '暂未绑定'}</Empty.Description>
          {env === 'WEAPP' && (
            <Button shape='round' color='danger' className='bottom-button' onClick={handleGetUserInfo}>
              绑定
            </Button>
          )}
        </Empty>
      ) : (
        <Fragment>
          <View className='vi-member-bind-wechat-warpper_container'>
            <Cell title='头像' className='avatar'>
              <Avatar src={avatar} />
            </Cell>
            <Cell title='昵称'>{username}</Cell>
          </View>
          <View className='vi-member-bind-wechat-warpper_button'>
            <Button color='warning' block onClick={modifyMemberNameAndAvatar}>
              使用昵称头像
            </Button>
          </View>
        </Fragment>
      )}
    </CommonMain>
  )
}

export default MemberBindWechat
