/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-30 14:05:22
 * @FilePath: \xuct-calendar-weapp\src\components\mixin\index.tsx
 * @LastEditTime: 2022-07-13 19:12:21
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react'
import { Navbar } from '@taroify/core'

import { useBack } from '@/utils/taro'
import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import classnames from 'classnames'
import { get as getGlobalData } from '@/utils/global'
import './index.scss'

interface IHeaderProps extends ViewProps {
  title: string
  className: string
  to?: number
  left: boolean
  data?: any
  fixed: boolean
  right?: ReactNode
  rightClick?: () => void
  children: ReactNode
  delta?: number
}

const CommonMain: FunctionComponent<IHeaderProps> = (props) => {
  const [back] = useBack({})
  const wxRef = useRef<boolean>(getGlobalData('wxBrowser'))

  const routerToBack = () => {
    if (!props.to) props.to = 1
    back({
      to: props.to,
      data: props.data,
      delta: props.delta
    })
  }

  /**
   * 右侧按钮点击
   */
  const rightClient = () => {
    if (props.rightClick && props.rightClick instanceof Function) {
      props.rightClick()
    }
  }

  return (
    <View className={classnames(props.className, 'vi-main', { 'vi-main-padding': process.env.TARO_ENV === 'h5' && props.fixed && !wxRef.current })}>
      {process.env.TARO_ENV === 'h5' && !wxRef.current && (
        <Navbar title={props.title} fixed={props.fixed} placeholder={false}>
          {props.left && <Navbar.NavLeft onClick={routerToBack}>返回</Navbar.NavLeft>}
          {props.right && (
            <Navbar.NavRight
              icon={props.right}
              onClick={(e) => {
                e.preventDefault()
                rightClient()
              }}
            ></Navbar.NavRight>
          )}
        </Navbar>
      )}
      {props.children}
    </View>
  )
}
export default CommonMain
