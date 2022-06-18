/*
 * @Author: Derek Xu
 * @Date: 2022-06-18 18:27:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-06-18 18:50:45
 * @FilePath: \xuct-calendar-weapp\src\pages\contactmanager\ui\GroupHeader.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent } from 'react'
import Router from 'tarojs-router-next'
import { Flex } from '@taroify/core'
import { View } from '@tarojs/components'
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
          我的群组
        </View>
      </Flex.Item>
      <Flex.Item span={12}>
        <View className='box' onClick={applyHandler}>
          新的申请
        </View>
      </Flex.Item>
    </Flex>
  )
}

export default GroupHeader
