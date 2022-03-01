/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-26 08:41:18
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 14:35:21
 */
import { Fragment, FunctionComponent } from 'react'
import { Cell } from '@taroify/core'

interface IPageOption {
  content: JSON | null
}

const GroupBody: FunctionComponent<IPageOption> = (props) => {
  return (
    <Fragment>
      <Cell title='类型'>群组消息</Cell>
      <Cell title='单元格' brief='描述信息'>
        内容
      </Cell>
    </Fragment>
  )
}

export default GroupBody
