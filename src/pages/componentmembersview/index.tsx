/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-15 15:34:01
 * @LastEditTime: 2022-03-15 15:48:48
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect } from 'react'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import './index.scss'

const ComponentAttendsView: FunctionComponent = () => {
  useEffect(() => {
    const { componentId } = Router.getParams()
    if (!componentId) return
  }, [])

  return (
    <CommonMain title='邀请者' left to={1} fixed className='vi-component-members-view-warpper'>
      <Fragment></Fragment>
    </CommonMain>
  )
}

export default ComponentAttendsView
