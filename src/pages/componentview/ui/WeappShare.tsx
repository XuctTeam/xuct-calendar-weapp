/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-04 15:50:51
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-05 20:23:00
 */
import { FunctionComponent } from 'react'
import { Dialog } from '@taroify/core'
import { Button, View } from '@tarojs/components'
import { useShareAppMessage } from '@tarojs/taro'

interface IPageStateProps {
  open: boolean
  componentTitle: string
  componentId: string
  onClose: () => void
}

const WeappShare: FunctionComponent<IPageStateProps> = (props) => {
  useShareAppMessage((res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      props.onClose()
    }
    return {
      title: props.componentTitle,
      path: '/page/user?id=123',
      imageUrl: 'http://images.xuct.com.cn/login_default.png'
    }
  })

  return (
    <View className='vi-component-view-weapp-share-wrapper'>
      <Dialog open={props.open} onClose={props.onClose}>
        <Dialog.Header>分享朋友圈</Dialog.Header>
        <Dialog.Content>
          <Button openType='share' type='warn'>
            微信分享
          </Button>
        </Dialog.Content>
      </Dialog>
    </View>
  )
}

export default WeappShare