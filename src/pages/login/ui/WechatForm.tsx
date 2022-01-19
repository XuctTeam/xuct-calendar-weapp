/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-26 14:29:20
 * @LastEditTime: 2021-12-24 10:17:30
 * @LastEditors: Derek Xu
 */
import { View } from '@tarojs/components'
import { Button } from '@taroify/core'

type IPageStateProps = {
  code: string | null | undefined
  onGetUserInfo: () => void
}

export default function WechatForm(props: IPageStateProps) {
  return (
    <>
      <View className='vi-login-wrapper_ui-form'>
        <Button color='success' block onClick={props.onGetUserInfo}>
          微信授权登录
        </Button>
      </View>
    </>
  )
}
