/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-04-23 19:48:46
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-31 15:27:18
 */

import { FunctionComponent } from 'react'
import IconFont from '@/components/iconfont'
import { View } from '@tarojs/components'

const NoticeMsg: FunctionComponent = () => {
  return (
    <View className='notice-message'>
      <IconFont name='ziyuan' size={60} />
      <View className='summary'>
        <View className='service'>
          <View>服务通知</View>
          <View className='time'>5月29日</View>
        </View>
        <View>订单完成</View>
      </View>
    </View>
  )
}

export default NoticeMsg
