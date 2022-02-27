/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-19 15:50:53
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-25 15:46:36
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Component } from 'react'
import { Cell, Field, Button, Input } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { useToast } from '@/utils/taro'
import { password } from '@/api/user'

import './index.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  password: string
  comfirmPassword: string
  loading: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Password {
  props: IProps
  state: PageState
}

class Password extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      comfirmPassword: '',
      loading: false
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  passwordChage = (val: string) => {
    this.setState({
      password: val
    })
  }

  comfirmPassword = (val: string) => {
    this.setState({
      comfirmPassword: val
    })
  }

  modifyPassword = () => {
    if (!this.state.password) {
      useToast('密码不能为空')
      return
    }
    if (!this.state.comfirmPassword) {
      useToast('确认密码不能为空')
      return
    }
    if (this.state.password !== this.state.comfirmPassword) {
      useToast('密码不一致')
      return
    }
    password(this.state.password)
      .then(() => {
        useToast('修改成功', true)
        window.setTimeout(() => {
          Taro.navigateBack({ delta: 1 })
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <CommonMain className='vi-password-wrapper' title='修改密码' to={4} data={{ data: '0' }} fixed={false} left>
        <Cell.Group className='vi-password-wrapper_form' inset>
          <Field label='密码' required>
            <Input
              password
              placeholder='请输入密码'
              maxlength={16}
              clearable
              value={this.state.password}
              onChange={(e) => this.passwordChage(e.detail.value)}
              onClear={() => this.passwordChage.bind(this, '')}
            />
          </Field>
          <Field label='确认密码' required>
            <Input
              password
              placeholder='请输入确认密码'
              maxlength={16}
              clearable
              value={this.state.comfirmPassword}
              onChange={(e) => this.comfirmPassword(e.detail.value)}
              onClear={() => this.comfirmPassword.bind(this, '')}
            />
          </Field>
        </Cell.Group>
        <View className='vi-password-wrapper_button'>
          <Button color='success' block disabled={this.state.loading} onClick={this.modifyPassword.bind(this)}>
            保存
          </Button>
        </View>
      </CommonMain>
    )
  }
}

export default Password
