/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-30 14:05:22
 * @FilePath: \react-lesson-20\src\utils\mixin.ts
 * @LastEditTime: 2022-02-16 17:59:29
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, ReactNode } from 'react'
import { Navbar } from '@taroify/core'
import { back } from '@/utils/taro'
import { View } from '@tarojs/components'
import { ViewProps } from '@tarojs/components/types/View'
import classnames from 'classnames'
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
}

const CommonMain: FunctionComponent<IHeaderProps> = (props) => {
  const routerToBack = () => {
    if (!props.to) props.to = 1
    back(props.to, props.data)
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
    <View
      className={classnames(props.className, 'common')}
      style={{ height: '100%', paddingTop: process.env.TARO_ENV === 'h5' && props.fixed ? '50px' : '0px' }}
    >
      {process.env.TARO_ENV === 'h5' && (
        <Navbar title={props.title} fixed={props.fixed}>
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
