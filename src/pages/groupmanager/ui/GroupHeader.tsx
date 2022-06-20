/*
 * @Author: Derek Xu
 * @Date: 2022-06-20 18:04:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-06-20 18:49:02
 * @FilePath: \xuct-calendar-weapp\src\pages\groupmanager\ui\GroupHeader.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { View } from '@tarojs/components'
import { FunctionComponent } from 'react'
import { throttle } from 'lodash/function'
import Router from 'tarojs-router-next'
import { Cell, Image } from '@taroify/core'
import Images from '@/constants/images'

interface IPageOption {
  list: () => void
}

const GroupHeader: FunctionComponent<IPageOption> = (props) => {
  const to = throttle(
    (ty: number) => {
      if (ty === 1) {
        addGroupHandler()
      } else if (ty == 2) {
        searchGroupHandler()
      }
    },
    800,
    { trailing: false }
  )

  const addGroupHandler = async () => {
    try {
      await Router.toGroupcreate()
      props.list()
    } catch (err) {
      Router.toContactmanager()
    }
  }

  const searchGroupHandler = async () => {
    try {
      await Router.toGroupsearch()
    } catch (err) {
      Router.toContactmanager()
    }
  }

  return (
    <View className='group-header'>
      <Cell className='box' clickable onClick={() => to(1)}>
        <Image round style={{ width: '20px', height: '20px' }} src={Images.GROUP_ADD} />
        新建
      </Cell>
      <Cell className='box' clickable onClick={() => to(2)}>
        <Image round style={{ width: '20px', height: '20px' }} src={Images.GROUP_SEARCH} />
        搜索
      </Cell>
    </View>
  )
}

export default GroupHeader
