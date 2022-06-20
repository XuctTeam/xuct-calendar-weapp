/*
 * @Author: Derek Xu
 * @Date: 2022-06-18 18:27:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-06-20 17:42:24
 * @FilePath: \xuct-calendar-weapp\src\pages\contactmanager\ui\GroupHeader.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent } from 'react'
import Router from 'tarojs-router-next'
import { Flex, Image } from '@taroify/core'
import { View } from '@tarojs/components'
import Images from '@/constants/images'
import { throttle } from 'lodash/function'

interface IPageOption {
  mineClick: () => void
}

const GroupHeader: FunctionComponent<IPageOption> = (props) => {
  const applyHandler = throttle(
    () => {
      Router.toGroupapply()
    },
    800,
    { trailing: false }
  )

  return (
    <Flex className='group-header' gutter={10}>
      <Flex.Item span={12}>
        <View className='box' onClick={props.mineClick}>
          <Image round style={{ width: '40px', height: '40px' }} src={Images.DEFAULT_GROUP} />
          <View className='title'>
            <View className='label'>我的群组</View>
            <View className='desc'>我所属群组</View>
          </View>
        </View>
      </Flex.Item>
      <Flex.Item span={12}>
        <View className='box' onClick={applyHandler}>
          <Image round style={{ width: '40px', height: '40px' }} src={Images.DEFAULT_GROUP_APPLY} />
          <View className='title'>
            <View className='label'>新的申请</View>
            <View className='desc'>申请加入群组</View>
          </View>
        </View>
      </Flex.Item>
    </Flex>
  )
}

export default GroupHeader
