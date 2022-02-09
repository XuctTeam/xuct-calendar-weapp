/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-26 14:29:20
 * @LastEditTime: 2022-02-05 21:05:51
 * @LastEditors: Derek Xu
 */
import { useState } from 'react'
import { View } from '@tarojs/components'
import { Button, Checkbox } from '@taroify/core'
import { Navigator } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { showToast } from '@/utils/taro'

type IPageStateProps = {
  code: string | null | undefined
  onGetUserInfo: () => void
}

export default function WechatForm(props: IPageStateProps) {
  const [selfCheck, setSelfCheck] = useState(false)

  const getUserInfo = () => {
    if (!selfCheck) {
      showToast('请勾选隐私协议')
      return
    }
    props.onGetUserInfo()
  }

  return (
    <>
      <View className='vi-login-wrapper_ui-form weapp-login'>
        <Button color='success' block onClick={() => getUserInfo()} >
          微信登录
        </Button>
        <View className='wechat-checkbox'>
          <Checkbox size={16} checked={selfCheck} onChange={(e) => setSelfCheck(e)}>
            我已阅读并确认同意
          </Checkbox>
          <Navigator url='/pages/selfprivacy/index' openType='navigate'>
            《隐私保护政策》
          </Navigator>
        </View>
      </View>
    </>
  )
}
