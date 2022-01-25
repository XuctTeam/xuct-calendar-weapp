/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-26 14:29:20
 * @LastEditTime: 2022-01-25 14:52:51
 * @LastEditors: Derek Xu
 */
import { useState } from 'react'
import { View } from '@tarojs/components'
import { Button, Checkbox } from '@taroify/core'
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
        <View>
          <Checkbox size={16} checked={selfCheck} onChange={(e) => setSelfCheck(e)}>
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
        <Button color='success' block onClick={() => getUserInfo()}>
          微信授权登录
        </Button>
      </View>
    </>
  )
}
