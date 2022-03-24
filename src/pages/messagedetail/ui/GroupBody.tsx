/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-26 08:41:18
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-24 09:12:13
 */
import { Fragment, FunctionComponent } from 'react'
import { Cell } from '@taroify/core'

interface IPageOption {
  status: number
  operation: number
  content: JSON | null
}

const GroupBody: FunctionComponent<IPageOption> = (props) => {
  const getTitle = () => {
    switch (props.operation) {
      case 0:
        return '注册消息'
      default:
        return '未知'
    }
  }

  return (
    <Fragment>
      <Cell title='群组消息'> {getTitle()}</Cell>
      <Cell title='状态'>{props.status === 0 ? '未读' : '已读'}</Cell>
    </Fragment>
  )
}

export default GroupBody
