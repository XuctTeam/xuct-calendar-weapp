/*
 * @Author: Derek Xu
 * @Date: 2022-07-14 11:13:20
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-14 13:40:16
 * @FilePath: \xuct-calendar-weapp\src\components\RefreshList\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { PullRefresh } from '@taroify/core'
import { usePageScroll } from '@tarojs/taro'
import { FC, ReactNode, useState } from 'react'
import './index.scss'

interface IPageOption {
  loading: boolean
  refresh: () => void
  children: ReactNode
}

const RefreshList: FC<IPageOption> = (props) => {
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  return (
    <PullRefresh
      loading={props.loading}
      reachTop={reachTop}
      onRefresh={() => {
        props.refresh()
      }}
    >
      {props.children}
    </PullRefresh>
  )
}

export default RefreshList
