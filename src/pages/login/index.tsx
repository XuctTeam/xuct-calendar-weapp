/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 08:40:11
 * @LastEditTime: 2022-06-20 16:45:29
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Router from 'tarojs-router-next'
import { Button, Cell, Checkbox, Field, Input, Image } from '@taroify/core'
import dayjs from 'dayjs'
import { View, Navigator } from '@tarojs/components'
import { ArrowLeft } from '@taroify/icons'
import { toast, back } from '@/utils/taro'
import { useEnv, useLogin, useUserInfo } from 'taro-hooks'
import { IUserAuth, IUserInfo as IMemberInfo } from '~/../@types/dva'
import { checkMobile } from '@/utils/utils'
import { IUserInfo } from 'taro-hooks/dist/useUserInfo'
import { wechatLogin, phoneLogin, usernameLogin } from '@/api/login'
import { sendSmsCode, userInfo } from '@/api/user'
import Images from '@/constants/images'

import './index.scss'

type ICode = {
  code: string
  ts: number
}

const Login: FunctionComponent = () => {
  const smsBtnLoadingTime: number = 120
  const [icode, setIcode] = useState<ICode | null>(null)
  const dispatch = useDispatch()
  const env = useEnv()
  const [login] = useLogin()
  const [, { getUserProfile }] = useUserInfo()
  const [self, setSelf] = useState<boolean>()
  const [phoneForm, setPhoneForm] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [smsCode, setSmsCode] = useState<string>('')
  const [smsText, setSmsText] = useState<string>('发送短信')
  const [smsLoading, setSmsLoading] = useState<boolean>(false)
  const timerRef = useRef<number>(0)

  useEffect(() => {
    if (env === 'WEAPP') {
      handleLogin()
    }
    return () => {
      if (timerRef.current > 0) {
        _stopSmsCode()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [env])

  const handleLogin = useCallback(() => {
    login(true)
      .then((code: string) => setIcode({ code: code, ts: dayjs().valueOf() }))
      .catch(() => {
        login(false)
          .then((code: string) => {
            setIcode({ code: code, ts: dayjs().valueOf() })
          })
          .catch((err) => {
            toast({ title: '获取code失败' })
            console.log(err)
          })
      })
  }, [login])

  /**
   * 发送短信验证码
   */
  const pushCode = () => {
    if (!checkMobile(phone)) {
      toast({ title: '手机号错误' })
      return
    }
    _startSmsCode()
    sendSmsCode(phone)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
        _stopSmsCode()
      })
  }

  /**
   * 微信授权登录
   * @param res
   * @returns
   */
  const loginByCode = async () => {
    if (!self) {
      toast({ title: '请先勾选协议' })
      return
    }
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
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        toast({ title: '授权失败' })
        console.log(err)
      })
  }

  /**
   * 使用手机号登录
   * @param phone
   * @param smsCode
   */
  const loginByPhoneOrUsername = async () => {
    if (!self) {
      toast({ title: '请先勾选协议' })
      return
    }
    /* 电话登录 */
    if (phoneForm) {
      if (!phone) {
        toast({ title: '手机号码不能为空' })
        return
      }
      if (!smsCode) {
        toast({ title: '验证码不能为空' })
        return
      }
      _phoneLogin()
      return
    }
    if (!username) {
      toast({ title: '账号不能为空' })
      return
    }
    if (!password) {
      toast({ title: '验证码不能为空' })
      return
    }
    _usernameLogin()
  }

  const _phoneLogin = () => {
    return phoneLogin(phone, smsCode)
      .then((res) => {
        _saveTokenToCache(res.access_token, res.refresh_token)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const _usernameLogin = () => {
    return usernameLogin(username, password)
      .then((res) => {
        _saveTokenToCache(res.access_token, res.refresh_token)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const _saveTokenToCache = (accessToken: string, refreshToken: string) => {
    dispatch({
      type: 'common/saveStorageSync',
      payload: {
        accessToken: 'Bearer ' + accessToken,
        refreshToken: 'Bearer ' + refreshToken
      },
      cb: () => {
        _getUserInfo()
      }
    })
  }

  const _startSmsCode = () => {
    setSmsLoading(true)
    _setTimeOut(smsBtnLoadingTime - 1)
  }

  const _stopSmsCode = () => {
    setSmsText('发送短信')
    setSmsLoading(false)
    if (timerRef.current > 0) {
      window.clearTimeout(timerRef.current)
      timerRef.current = 0
    }
  }

  const _setTimeOut = (sec: number) => {
    if (sec === 0) {
      _stopSmsCode()
      return
    }
    setSmsText('重发(' + sec + ')')
    timerRef.current = window.setTimeout(() => {
      _setTimeOut(sec - 1)
    }, 1000)
  }

  const _getUserInfo = () => {
    userInfo()
      .then((res) => {
        const { member, auths } = res
        const m: IMemberInfo = member as any as IMemberInfo
        dispatch({
          type: 'common/saveStorageSync',
          payload: {
            userInfo: {
              id: m.id,
              name: m.name,
              avatar: m.avatar
            },
            auths: auths as any as Array<IUserAuth>
          },
          cb: () => {
            back({ to: 4 })
          }
        })
      })
      .catch((err) => {
        console.log(err)
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
            <Image src={Images.DEFAULT_LOG_IMAGE} style={{ width: '140px', height: '120px' }}></Image>
          </View>
          <View className='vi-login-wrapper_form'>
            <View className='form'>
              {!phoneForm ? (
                <Cell.Group>
                  <Field label='账号'>
                    <Input placeholder='支持账号/邮箱/手机号' value={username} onChange={(e) => setUsername(e.detail.value)} />
                  </Field>
                  <Field label='密码'>
                    <Input password placeholder='请输入密码' value={password} onChange={(e) => setPassword(e.detail.value)} />
                    <Button size='small' variant='text' color='primary' onClick={() => Router.toMemberforgetpassword()}>
                      忘记密码
                    </Button>
                  </Field>
                </Cell.Group>
              ) : (
                <Cell.Group>
                  <Field label='手机号'>
                    <Input placeholder='请输入手机号' value={phone} maxlength={11} type='number' onChange={(e) => setPhone(e.detail.value)} />
                  </Field>
                  <Field label='验证码'>
                    <Input placeholder='请输入验证码' maxlength={4} type='number' value={smsCode} onChange={(e) => setSmsCode(e.detail.value)} />
                    <Button size='small' variant='text' color='primary' disabled={smsLoading} onClick={pushCode}>
                      {smsText}
                    </Button>
                  </Field>
                </Cell.Group>
              )}
              <View className='btn'>
                <View onClick={() => setPhoneForm(!phoneForm)}>{phoneForm ? '账号密码登录' : '验证码登录'}</View>
                <View onClick={() => Router.toMemberregister()}>立即注册</View>
              </View>
            </View>

            <Button color='danger' block onClick={loginByPhoneOrUsername}>
              登录
            </Button>
          </View>
          <View className='vi-login-wrapper_self'>
            <Checkbox className='custom-color' onChange={(e) => setSelf(e)}>
              登录即已同意
              {env === 'WEAPP' ? (
                <Navigator url='/pages/selfprivacy/index'>《隐私保护政策》</Navigator>
              ) : (
                <a
                  href='#!'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    Router.toSelfprivacy()
                  }}
                >
                  《隐私保护政策》
                </a>
              )}
            </Checkbox>
          </View>
        </View>
        <View className='footer'>
          {env === 'WEAPP' && (
            <View className='btn' onClick={loginByCode}>
              <Image src={Images.DEFAULT_WECHAT_IMAGE} style={{ width: '36px', height: '36px' }} mode='aspectFill' />
              <View className='label'>微信</View>
            </View>
          )}
        </View>
      </View>
    </Fragment>
  )
}

export default Login
