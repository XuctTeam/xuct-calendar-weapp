/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-30 14:05:22
 * @FilePath: \react-lesson-20\src\utils\mixin.ts
 * @LastEditTime: 2022-02-13 21:44:09
 * @LastEditors: Derek Xu
 */
import React, { Fragment, ReactNode } from 'react'
import { Navbar } from '@taroify/core'
import { back } from '@/utils/taro'

interface IHeaderProps {
  title: string
  to?: number
  left: boolean
  data?: any
  fixed: boolean
  right?: ReactNode
  rightClick?: () => void
}

const CommonHeader: React.FC<IHeaderProps> = (props) => {
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
    <Fragment>
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
    </Fragment>
  )
}
export default CommonHeader
