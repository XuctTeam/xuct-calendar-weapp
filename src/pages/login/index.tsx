/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-07 10:37:58
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-01-19 13:58:46
 */
import { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import Router, { NavigateType } from 'tarojs-router-next'
import dayjs from 'dayjs'
import { bindActionCreators } from 'redux'
import { View, Image } from '@tarojs/components'
import { ArrowLeft } from '@taroify/icons'
import { showToast } from '@/utils/taro'
import { wechatLogin, phoneLogin, usernameLogin } from '@/api/token'
import { DvaProps } from '../../../@types/dva'
import { H5Form, WechatForm } from './ui'

import { action } from './actionCreater'

import './index.scss'

interface ModelProps extends DvaProps {}

type PageDispatchProps = {
  saveStorageSync: (payload) => void
}
type PageOwnProps = {}

type IProps = ModelProps & PageDispatchProps & PageOwnProps

type ICode = {
  code: string
  ts: number
}

type PageStateProps = {
  icode?: ICode | undefined | null
}

interface Login {
  props: IProps
  state: PageStateProps
}
const connects: Function = connect
const env: string = Taro.getEnv()

@connects(({}) => ({}), (dispatch) => bindActionCreators(action, dispatch))
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icode: null
    }
  }

  componentWillUnmount() {}

  componentDidShow() {
    const that = this
    if (env === 'WEAPP') {
      Taro.login({
        success(res) {
          if (res.code) {
            that.setState({
              // eslint-disable-next-line react/no-unused-state
              icode: { code: res.code, ts: dayjs().valueOf() }
            })
          }
        },
        fail(res) {
          showToast(res.errMsg)
        }
      })
    }
  }

  componentDidHide() {}

  /**
   * 微信授权登录
   * @param res
   * @returns
   */
  loginByCode = async () => {
    if (!this.state.icode) {
      showToast('微信登录失败')
      return
    }
    if (this.state.icode.ts - dayjs().valueOf() > 1000 * 60 * 5) {
      showToast('请在规定时间内完成授权')
      return
    }
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    const code: string = this.state.icode.code
    Taro.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wechatLogin(code, res.iv, res.encryptedData)
          .then((rs) => {
            this._saveTokenToCache(rs.access_token, rs.refresh_token)
            Taro.navigateBack({ delta: 1 })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  /**
   * 使用手机号登录
   * @param phone
   * @param smsCode
   */
  loginByPhoneOrUsername = async (phone: string, smsCode: string, username: string, password: string, type: boolean) => {
    /* 电话登录 */
    if (type) {
      return this._phoneLogin(phone, smsCode)
    }
    return this._usernameLogin(username, password)
  }

  _phoneLogin = async (phone: string, smsCode: string): Promise<boolean> => {
    return await phoneLogin(phone, smsCode)
      .then((res) => {
        this._saveTokenToCache(res.access_token, res.refresh_token)
        return true
      })
      .catch((error) => {
        console.log(error)
        return false
      })
  }

  _usernameLogin = async (username: string, password: string): Promise<boolean> => {
    return await usernameLogin(username, password)
      .then((res) => {
        this._saveTokenToCache(res.access_token, res.refresh_token)
        return true
      })
      .catch((error) => {
        console.log(error)
        showToast('账号或密码无效')
        return false
      })
  }

  _saveTokenToCache(accessToken: string, refreshToken: string): void {
    this.props.saveStorageSync({
      accessToken: 'Bearer ' + accessToken,
      refreshToken: 'Bearer ' + refreshToken
    })
  }

  back = () => {
    try {
      Router.back()
    } catch (err) {
      Router.navigate({ url: '/pages/aboutme/index' }, { type: NavigateType.reLaunch })
    }
  }

  render() {
    return (
      <View className='vi-login-wrapper'>
        <View className='back-btn' onClick={() => this.back()}>
          <ArrowLeft />
        </View>
        <View className='right-top-sign' />
        <View className='left-bottom-sign'></View>
        <View className='vi-login-wrapper_logo'>
          <Image src='http://images.xuct.com.cn/login_default.png' mode='aspectFit'></Image>
        </View>
        <View className='wrapper'>
          {process.env.TARO_ENV !== 'h5' ? (
            <WechatForm code={this.state.icode ? this.state.icode.code : ''} onGetUserInfo={this.loginByCode.bind(this)} />
          ) : (
            <H5Form loginByPhoneOrUsername={this.loginByPhoneOrUsername.bind(this)} />
          )}
        </View>
        <View className='register'>
          还没账号? <a href='javascript#;'>去注册</a>
        </View>
      </View>
    )
  }
}

export default Login
