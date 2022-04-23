/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-04-23 19:48:46
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-23 19:59:17
 */

import { Fragment, FunctionComponent } from 'react'
import { Empty } from '@taroify/core'

const NoticeMsg: FunctionComponent = () => {
  return (
    <Fragment>
      <Empty>
        <Empty.Image />
        <Empty.Description>暂无数据</Empty.Description>
      </Empty>
    </Fragment>
  )
}

export default NoticeMsg
