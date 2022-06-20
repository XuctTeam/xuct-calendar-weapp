/*
 * @Author: Derek Xu
 * @Date: 2022-05-25 09:26:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-06-20 16:44:46
 * @FilePath: \xuct-calendar-weapp\src\pages\aboutus\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */
import { FunctionComponent } from 'react'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { View, Navigator } from '@tarojs/components'
import { Image } from '@taroify/core'
import { useWebEnv } from '@/utils/taro'
import Images from '@/constants/images'

import './index.scss'

const AboutUs: FunctionComponent = () => {
  const env = useWebEnv()

  const getVersion = () => {
    //@ts-ignore
    return VERSION.version
  }

  return (
    <CommonMain title='关于我们' left className='vi-about-up-warpper' fixed to={4}>
      <View className='vi-about-up-warpper_contarin'>
        <Image src={Images.DEFAULT_LOG_IMAGE} style={{ width: '220px', height: '180px' }}></Image>
        <View className='title'>楚日历</View>
        <View className='version'>{'V' + getVersion()}</View>
      </View>
      <View className='vi-about-up-warpper_bottom'>
        {env ? (
          <a
            href='#!'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              Router.toSelfprivacy()
            }}
          >
            《隐私保护政策》
          </a>
        ) : (
          <Navigator url='/pages/selfprivacy/index'>《隐私保护政策》</Navigator>
        )}
        <View className='copyright'>
          <View>Copyright@2020-2022 楚恬商行.</View>
          <View>All Rights Reserved</View>
        </View>
      </View>
    </CommonMain>
  )
}

export default AboutUs
