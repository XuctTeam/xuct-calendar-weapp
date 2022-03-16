/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 08:40:11
 * @LastEditTime: 2022-03-16 14:12:06
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { View, Image, Navigator } from '@tarojs/components'
import { ArrowLeft } from '@taroify/icons'
import { toast, back, useEnv, useLogin, useUserInfo } from '@/utils/taro'
import { IUserInfo } from '@/utils/taro/useUserInfo'
import { wechatLogin, phoneLogin, usernameLogin } from '@/api/token'
import { WebForm, WechatForm } from './ui'

import './index.scss'

type ICode = {
  code: string
  ts: number
}

const Login: FunctionComponent = () => {
  const [icode, setIcode] = useState<ICode | null>(null)
  const dispatch = useDispatch()
  const env = useEnv()
  const [login] = useLogin()
  const [, { getUserProfile }] = useUserInfo()
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (env === 'WEAPP') {
      handleLogin()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [env])

  const handleLogin = useCallback(() => {
    login(true)
      .then((code: string) => setIcode({ code: code, ts: dayjs().valueOf() }))
      .catch(() => {
        toast({ title: '获取code失败' })
      })
  }, [login])

  /**
   * 微信授权登录
   * @param res
   * @returns
   */
  const loginByCode = async () => {
    if (!icode) {
      toast({ title: '微信登录失败' })
      return
    }
    if (icode.ts - dayjs().valueOf() > 1000 * 60 * 5) {
      toast({ title: '请在规定时间内完成授权' })
      return
    }
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    const code: string = icode.code

    getUserProfile({ lang: 'zh_CN', desc: '用于完善会员资料' })
      .then((res) => {
        const { iv, encryptedData } = res as any as IUserInfo
        if (!iv || !encryptedData) {
          toast({ title: '微信登陆失败' })
          return
        }
        wechatLogin(code, iv, encryptedData)
          .then((rs) => {
            _saveTokenToCache(rs.access_token, rs.refresh_token)
            back({ to: 4 })
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**
   * 使用手机号登录
   * @param phone
   * @param smsCode
   */
  const loginByPhoneOrUsername = async (phone: string, smsCode: string, username: string, password: string, type: boolean) => {
    /* 电话登录 */
    if (type) {
      return _phoneLogin(phone, smsCode)
    }
    return _usernameLogin(username, password)
  }

  const wechatLoginByPhone = () => {
    setShow(true)
  }

  const _phoneLogin = async (phone: string, smsCode: string): Promise<boolean> => {
    return await phoneLogin(phone, smsCode)
      .then((res) => {
        _saveTokenToCache(res.access_token, res.refresh_token)
        return true
      })
      .catch((error) => {
        console.log(error)
        return false
      })
  }

  const _usernameLogin = async (username: string, password: string): Promise<boolean> => {
    return await usernameLogin(username, password)
      .then((res) => {
        _saveTokenToCache(res.access_token, res.refresh_token)
        return true
      })
      .catch((error) => {
        console.log(error)
        return false
      })
  }

  const _saveTokenToCache = (accessToken: string, refreshToken: string) => {
    dispatch({
      type: 'common/saveStorageSync',
      payload: {
        accessToken: 'Bearer ' + accessToken,
        refreshToken: 'Bearer ' + refreshToken
      }
    })
  }

  return (
    <Fragment>
      <View className='vi-login-wrapper'>
        <View className='section'>
          {env !== 'WEAPP' && (
            <View className='back-btn' onClick={() => back({ to: 4, data: { isLogin: true } })}>
              <ArrowLeft />
            </View>
          )}
          <View className='right-top-sign' />
          <View className='vi-login-wrapper_logo'>
            <Image src='http://images.xuct.com.cn/login_default.png' mode='aspectFit'></Image>
          </View>
          <View className='wrapper'>
            {env === 'WEAPP' ? (
              <WechatForm code={icode?.code} onGetUserInfo={loginByCode} loginByPhone={wechatLoginByPhone} />
            ) : (
              <WebForm loginByPhoneOrUsername={loginByPhoneOrUsername} />
            )}
          </View>
        </View>
        <View className='footer'>
          <View className='left-bottom-sign'></View>
          <View className='register'>
            还没账号?
            <Navigator url='/pages/memberregister/index' openType='navigate'>
              去注册
            </Navigator>
          </View>
        </View>
      </View>
    </Fragment>
  )
}

export default Login
