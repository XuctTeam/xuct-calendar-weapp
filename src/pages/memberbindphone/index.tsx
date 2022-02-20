/* eslint-disable react/no-children-prop */
/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-28 10:47:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-19 20:47:15
 */
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Router from 'tarojs-router-next'
import { View, Button as TaroButton } from '@tarojs/components'
import { showToast, back } from '@/utils/taro'
import { Cell, Button, Field, Input } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { checkMobile } from '@/utils/utils'
import { getPhoneNumber, bindPhoneSmsCode, logout, bindPhone, unbindPhone } from '@/api/user'
import { DvaProps } from '../../../@types/dva'
import { IUserInfo } from '../../../@types/user'
import { action } from './actionCreater'

import './index.scss'

interface ModelProps extends DvaProps {
  userInfo: IUserInfo
}

type PageDispatchProps = {
  remove: (payload) => void
}

type PageOwnProps = {}

type PageStateProps = {
  edit: boolean
  phone: string
  code: string
  disable: boolean
  smsText: string
}

type IProps = ModelProps & PageDispatchProps & PageOwnProps

interface Phone {
  props: IProps
  state: PageStateProps
  $instance: Taro.Current
  timer: number
}

const connects: Function = connect

@connects(({}) => ({}), (dispatch) => bindActionCreators(action, dispatch))
class Phone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      phone: '',
      code: '',
      disable: false,
      smsText: '发送短信'
    }
    this.$instance = getCurrentInstance()
    this.timer = 0
  }

  componentDidMount() {
    const data = Router.getData()
    if (data) {
      this.setState({
        phone: data,
        edit: true
      })
      return
    }
    this.setState({
      edit: false
    })
  }

  componentWillUnmount() {
    if (this.timer > 0) {
      window.clearTimeout(this.timer)
    }
  }

  onGetPhoneNumber = (e) => {
    if (e.detail.errMsg && e.detail.errMsg !== 'getPhoneNumber:ok') {
      showToast('获取手机失败')
      return
    }
    const that = this
    Taro.checkSession({
      success: function () {
        //获取手机号码
        that.getUserPhone(e.detail.encryptedData, e.detail.iv)
      },
      fail: function () {
        Taro.showModal({
          title: '提示',
          content: '微信登录已失效,是否重新登录?',
          success: function (res) {
            if (res.confirm) {
              that.toLogout()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  }

  phoneChage = (val: string) => {
    this.setState({
      phone: val
    })
  }

  /**
   * 获取用户手机号码
   * @param encryptedData
   * @param ivStr
   */
  getUserPhone(encryptedData: string, ivStr: string) {
    getPhoneNumber(encryptedData, ivStr)
      .then((res) => {
        this.setState({
          phone: res
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  bindSmsCode = () => {
    if (!this.state.phone) {
      showToast('手机号为空')
      return
    }
    if (!checkMobile(this.state.phone)) {
      showToast('手机号格式错误')
      return
    }
    this.setState({ disable: true })
    this.setSmsTextTime(30)
    bindPhoneSmsCode(this.state.edit, this.state.phone)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          disable: false
        })
      })
  }

  setSmsTextTime = (num: number) => {
    if (num === 0) {
      this.setState({
        disable: false,
        smsText: '发送短信'
      })
      if (this.timer > 0) {
        window.clearTimeout(this.timer)
      }
      return
    }
    this.setState({
      smsText: '重发(' + num + ')'
    })
    const that = this
    this.timer = window.setTimeout(() => {
      that.setSmsTextTime(num - 1)
    }, 1000)
  }

  /**
   * 登出并清理缓存
   */
  toLogout = () => {
    logout()
      .then(() => {
        this.cleanUserInfo()
        return
      })
      .catch((error) => {
        console.log(error)
        if (error.status === 401) {
          this.cleanUserInfo()
          return
        }
        showToast('退出失败')
      })
  }

  smsCodeChage = (val: string) => {
    this.setState({
      code: val
    })
  }

  cleanUserInfo() {
    this.props.remove({
      accessToken: '',
      refreshToken: '',
      userInfo: null
    })
    Taro.navigateBack({ delta: 1 })
  }

  openBindPhone = () => {
    if (!this.state.phone) {
      showToast('手机号为空')
      return
    }
    if (!checkMobile(this.state.phone)) {
      showToast('手机号格式错误')
      return
    }
    if (!this.state.code) {
      showToast('验证码为空')
      return
    }
    console.log(this.state.edit)
    /** 解绑 */
    if (this.state.edit) {
      /**绑定 */
      unbindPhone(this.state.code)
        .then(() => {
          this.optPhoneSuccess('解绑成功')
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      bindPhone(this.state.phone, this.state.code)
        .then(() => {
          this.optPhoneSuccess('绑定成功')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  optPhoneSuccess = (msg: string) => {
    Taro.showToast({
      title: msg,
      icon: 'success',
      duration: 800
    })
    back(2, {
      data: '1'
    })
  }

  render() {
    return (
      <CommonMain className='vi-phone-wrapper' title='手机号绑定' to={4} data={{ data: '0' }} fixed={false} left>
        <Cell.Group className='vi-phone-wrapper_form' inset>
          <Field label='手机号'>
            <Input type='text' readonly={this.state.edit} value={this.state.phone} onChange={(e) => this.phoneChage(e.detail.value)} maxlength={11} />
          </Field>
          <Field align='center' label='短信验证码'>
            <Input placeholder='请输入短信验证码' maxlength={6} type='number' value={this.state.code} onChange={(e) => this.smsCodeChage(e.detail.value)} />
            <Button size='small' color='primary' onClick={this.bindSmsCode.bind(this)} disabled={this.state.disable}>
              {this.state.smsText}
            </Button>
          </Field>
          <View className='warning'>解绑手机号后日程将无法同步~~</View>
        </Cell.Group>
        <View className='vi-phone-wrapper_button'>
          {process.env.TARO_ENV === 'weapp' && !this.state.edit ? (
            <View className='phone'>
              <TaroButton type='warn' openType='getPhoneNumber' onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}>
                获取本机号码
              </TaroButton>
            </View>
          ) : (
            <></>
          )}
          <TaroButton type='primary' onClick={this.openBindPhone.bind(this)}>
            {this.state.edit ? '解绑' : '绑定'}
          </TaroButton>
        </View>
      </CommonMain>
    )
  }
}

export default Phone
