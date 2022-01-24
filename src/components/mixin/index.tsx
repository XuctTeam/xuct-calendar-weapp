/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-30 14:05:22
 * @FilePath: \react-lesson-20\src\utils\mixin.ts
 * @LastEditTime: 2022-01-24 11:31:14
 * @LastEditors: Derek Xu
 */
import React, { Fragment } from 'react'
import { Navbar } from '@taroify/core'
import Router, { NavigateType } from 'tarojs-router-next'

interface IHeaderProps {
  title: string
  to?: number
  left: boolean
  data?: any
  fixed: boolean
}

const CommonHeader: React.FC<IHeaderProps> = (props) => {
  const routerToBack = () => {
    try {
      if (props.data) {
        Router.back(props.data)
        return
      }
      Router.back()
    } catch (err) {
      if (!props.to) return
      if (props.to === 1) {
        Router.toIndex({ type: NavigateType.switchTab })
      } else if (props.to === 2) {
        Router.toAboutme({ type: NavigateType.switchTab })
      } else if (props.to === 3) {
        Router.navigate({ url: '/pages/componentview/index' }, { type: NavigateType.redirectTo, params: props.data })
      }
    }
  }

  return (
    <Fragment>
      {process.env.TARO_ENV === 'h5' ? (
        <Navbar title={props.title} fixed={props.fixed}>
          {props.left && <Navbar.NavLeft onClick={routerToBack}>返回</Navbar.NavLeft>}
        </Navbar>
      ) : (
        <></>
      )}
    </Fragment>
  )
}
export default CommonHeader
