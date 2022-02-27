/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-26 08:48:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-26 08:48:25
 */
import { Fragment, FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Cell } from '@taroify/core'

interface IPageStateprops {}

const SystemBody: FunctionComponent<IPageStateprops> = (props) => {
  return (
    <Fragment>
      <Cell title='单元格' brief='描述信息'>
        内容
      </Cell>
      <Cell title='单元格' brief='描述信息'>
        内容
      </Cell>
    </Fragment>
  )
}

export default SystemBody
