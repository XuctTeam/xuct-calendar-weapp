/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-26 14:29:20
 * @LastEditTime: 2022-03-16 13:40:05
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useState } from 'react'
import { View, Navigator } from '@tarojs/components'
import { Button, Checkbox } from '@taroify/core'
import { toast } from '@/utils/taro'

type IPageOption = {
  code: string | null | undefined
  onGetUserInfo: () => void
  loginByPhone: () => void
}

const WechatForm: FunctionComponent<IPageOption> = (props) => {
  const [selfCheck, setSelfCheck] = useState(false)

  const getUserInfo = () => {
    if (!_check()) return
    props.onGetUserInfo()
  }

  const loginByPhoneHandle = () => {
    if (!_check()) return
    props.loginByPhone()
  }

  const _check = (): boolean => {
    if (!selfCheck) {
      toast({ title: '请勾选隐私协议' })
      return false
    }
    return true
  }

  return (
    <View className='vi-login-wrapper_ui-form weapp-login'>
      <View className='wechat-checkbox'>
        <Checkbox size={16} checked={selfCheck} onChange={(e) => setSelfCheck(e)}>
          我已阅读并确认同意
        </Checkbox>
        <Navigator url='/pages/selfprivacy/index' openType='navigate'>
          《隐私保护政策》
        </Navigator>
      </View>
      <View className='button'>
        <Button color='success' block onClick={() => getUserInfo()}>
          微信登录
        </Button>
        <Button className='phone-login' color='info' block onClick={() => loginByPhoneHandle()}>
          账号密码登陆
        </Button>
      </View>
    </View>
  )
}
export default WechatForm
