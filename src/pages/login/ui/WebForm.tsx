/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-26 14:28:54
 * @LastEditTime: 2022-02-28 21:52:03
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Cell, Field, Button, Flex, Input, Checkbox } from '@taroify/core'
import { checkMobile } from '@/utils/utils'
import { toast } from '@/utils/taro'
import { sendSmsCode } from '@/api/user'
import Router from 'tarojs-router-next'

type ModelProps = {}
type PageDispatchProps = {}
type PageOwnProps = {
  loginByPhoneOrUsername: (phone: string, smsCode: string, username: string, password: string, type: boolean) => Promise<any>
}
type IProps = ModelProps & PageDispatchProps & PageOwnProps

type PageStateProps = {
  phoneForm: boolean
  phone: string
  smsCode: string
  smsText: string
  smsLoading: boolean
  username: string
  password: string
  selfCheck: boolean
}
interface H5Form {
  props: IProps
  timeOutTimer: number
  state: PageStateProps
}

const smsBtnText: string = '发送验证码'
const smsBtnLoadingTime: number = 120

class H5Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneForm: true,
      phone: '',
      smsCode: '',
      smsText: smsBtnText,
      smsLoading: false,
      username: '',
      password: '',
      selfCheck: false
    }
    this.timeOutTimer = 0
  }

  componentWillUnmount() {
    if (this.timeOutTimer > 0) {
      window.clearTimeout(this.timeOutTimer)
    }
    this.setState = () => {
      return
    }
  }

  setPhoneForm = (val: boolean) => {
    this.setState({
      phoneForm: val
    })
  }

  setSmsCode = (val: string) => {
    this.setState({
      smsCode: val
    })
  }

  setSmsCodeLoading = (loadding: boolean) => {
    this.setState({
      smsLoading: loadding
    })
  }

  setPhone = (val: string) => {
    this.setState({
      phone: val
    })
  }

  setUserName = (val: string) => {
    this.setState({
      username: val
    })
  }

  setPassword = (val: string) => {
    this.setState({
      password: val
    })
  }

  /**
   * 发送短信验证码
   */
  pushCode = () => {
    if (!checkMobile(this.state.phone)) {
      toast({ title: '手机号错误' })
      return
    }
    this._startSmsCode()

    sendSmsCode(this.state.phone)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
        this._stopSmsCode()
      })
  }

  login = async () => {
    if (!this._checkParam()) return
    this.props
      .loginByPhoneOrUsername(this.state.phone, this.state.smsCode, this.state.username, this.state.password, this.state.phoneForm)
      .then((res) => {
        if (res) {
          Taro.navigateBack({ delta: 1 })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  _startSmsCode = () => {
    this.setSmsCodeLoading(true)
    this._setTimeOut(smsBtnLoadingTime - 1)
    this.timeOutTimer = 0
  }

  _stopSmsCode = () => {
    this.setState({
      smsText: smsBtnText,
      smsLoading: false
    })
    if (this.timeOutTimer > 0) {
      window.clearTimeout(this.timeOutTimer)
    }
  }

  _setTimeOut = (sec: number) => {
    const that = this
    if (sec === 0) {
      this._stopSmsCode()
      return
    }
    this.setState({
      smsText: '重发(' + sec + ')'
    })
    this.timeOutTimer = window.setTimeout(() => {
      that._setTimeOut(sec - 1)
    }, 1000)
  }

  _checkParam = (): boolean => {
    if (this.state.phoneForm) {
      if (!checkMobile(this.state.phone)) {
        toast({ title: '手机号错误' })
        return false
      }
      if (!this.state.smsCode) {
        toast({ title: '验证码不为空' })
        return false
      }
    } else {
      if (!this.state.username) {
        toast({ title: '用户名不为空' })
        return false
      }
      if (!this.state.password) {
        toast({ title: '密码不为空' })
        return false
      }
    }
    if (!this.state.selfCheck) {
      toast({ title: '请先勾选隐私协议' })
      return false
    }
    return true
  }

  render() {
    return (
      <View className='vi-login-wrapper_ui-form'>
        <Cell.Group inset>
          {this.state.phoneForm ? (
            <>
              <Field label='手机号' required>
                <Input placeholder='请输入手机号' type='number' value={this.state.phone} maxlength={11} onChange={(e) => this.setPhone(e.detail.value)} />
              </Field>
              <Field label='验证码' required>
                <View className='smsCode'>
                  <Input placeholder='请输入验证码' type='number' value={this.state.smsCode} maxlength={4} onChange={(e) => this.setSmsCode(e.detail.value)} />
                  <Button size='mini' color='primary' onClick={this.pushCode.bind(this)} disabled={this.state.smsLoading}>
                    {this.state.smsText}
                  </Button>
                </View>
              </Field>
            </>
          ) : (
            <>
              <Field label='账号' required>
                <Input placeholder='请输入账号' value={this.state.username} onChange={(e) => this.setUserName(e.detail.value)} />
              </Field>
              <Field label='密码' required>
                <Input placeholder='请输入密码' password value={this.state.password} onChange={(e) => this.setPassword(e.detail.value)} />
              </Field>
            </>
          )}
        </Cell.Group>

        <View className='self'>
          <Checkbox size={16} checked={this.state.selfCheck} onChange={(e) => this.setState({ selfCheck: e })}>
            已阅读并同意
            <a
              href='#!'
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                Router.toSelfprivacy()
              }}
            >
              《隐私协议》
            </a>
          </Checkbox>
        </View>

        <View className='btn'>
          <Button color='success' block onClick={this.login.bind(this)}>
            登录
          </Button>
        </View>
        <Flex justify='center' className='h5-login-type'>
          <Flex.Item span={12}>
            <a
              href='#!'
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                this.setPhoneForm(!this.state.phoneForm)
              }}
            >
              切换登录方式
            </a>
          </Flex.Item>
          <Flex.Item span={12}>
            <a href='#!'>忘记密码</a>
          </Flex.Item>
        </Flex>
      </View>
    )
  }
}

export default H5Form
