/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-09 19:39:54
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-17 09:25:30
 */

import { Fragment, FunctionComponent } from 'react'
import { Cell, IndexList } from '@taroify/core'
import _ from 'lodash'

const UserList: FunctionComponent = () => {
  const indexList: string[] = []
  const charCodeOfA = 'A'.charCodeAt(0)

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i))
  }

  return (
    <IndexList>
      {_.map(indexList, (index) => {
        return (
          <Fragment key={index}>
            <IndexList.Anchor index={index} />
            <Cell title='文本' />
            <Cell title='文本' />
            <Cell title='文本' />
          </Fragment>
        )
      })}
    </IndexList>
  )
}

export default UserList
