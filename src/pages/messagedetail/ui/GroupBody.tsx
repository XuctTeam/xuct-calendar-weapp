/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-26 08:41:18
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-04 20:57:09
 */
import { Fragment, FunctionComponent } from 'react'
import { Cell } from '@taroify/core'

interface IPageOption {
  status: number
  operation: number
  content: JSON | null
}

const GroupBody: FunctionComponent<IPageOption> = (props) => {
  const getType = () => {
    switch (props.operation) {
      case 0:
        return '申请入组'
      case 1:
        return '申请同意'
      case 2:
        return '申请拒绝'
      case 3:
        return '群组删除'
      default:
        return '未知'
    }
  }

  const convert = () => {
    switch (props.operation) {
      case 3:
        return <Cell title='群组名称'>{props.content && props.content['groupName']}</Cell>
    }
  }

  return (
    <Fragment>
      <Cell title='分类'>群组消息</Cell>
      <Cell title='类型'>{getType()}</Cell>
      <Cell title='状态'>{props.status === 0 ? '未读' : '已读'}</Cell>
      <Fragment>{convert()}</Fragment>
    </Fragment>
  )
}

export default GroupBody
