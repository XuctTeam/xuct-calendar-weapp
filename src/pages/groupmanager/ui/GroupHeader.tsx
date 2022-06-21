/*
 * @Author: Derek Xu
 * @Date: 2022-06-20 18:04:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-06-21 21:46:11
 * @FilePath: \xuct-calendar-weapp\src\pages\groupmanager\ui\GroupHeader.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent } from 'react'
import { throttle } from 'lodash/function'
import Router from 'tarojs-router-next'
import { Cell, FixedView, Image, Flex } from '@taroify/core'
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
    <FixedView position='bottom' className='group-header'>
      <Flex gutter={10}>
        <Flex.Item span={12}>
          <Cell className='box' clickable onClick={() => to(1)}>
            <Image round style={{ width: '32px', height: '32px' }} src={Images.GROUP_ADD} />
          </Cell>
        </Flex.Item>
        <Flex.Item span={12}>
          <Cell className='box' clickable onClick={() => to(2)}>
            <Image round style={{ width: '30px', height: '30px' }} src={Images.GROUP_SEARCH} />
          </Cell>
        </Flex.Item>
      </Flex>
    </FixedView>
  )
}

export default GroupHeader
