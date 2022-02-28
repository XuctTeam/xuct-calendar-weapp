/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-09 19:39:54
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-28 17:30:56
 */

import { Fragment, FunctionComponent, useState } from 'react'
import { Cell, IndexList, PullRefresh } from '@taroify/core'
import _ from 'lodash'
import { usePageScroll } from '@tarojs/taro'

const UserList: FunctionComponent = () => {
  const indexList: string[] = []
  const charCodeOfA = 'A'.charCodeAt(0)
  const [loading, setLoading] = useState(false)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i))
  }

  const refresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    // <PullRefresh
    //   style={{ height: '100%' }}
    //   loading={loading}
    //   reachTop={reachTop}
    //   onRefresh={() => {
    //     refresh()
    //   }}
    // >

    // </PullRefresh>
    <IndexList sticky stickyOffsetTop={120}>
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
