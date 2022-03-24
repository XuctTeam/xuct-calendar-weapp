/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-26 08:48:25
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-24 09:39:26
 */
import { Fragment, FunctionComponent, useCallback } from 'react'
import { View } from '@tarojs/components'
import { Cell } from '@taroify/core'

interface IPageOption {
  status: number
  operation: number
  content: JSON | null
}

const SystemBody: FunctionComponent<IPageOption> = (props) => {
  const getTitle = () => {
    switch (props.operation) {
      case 0:
        return '系统消息'
      default:
        return '未知'
    }
  }

  const getType = () => {
    if (props.operation === 0) return '注册消息'
    return ''
  }

  const getContent = useCallback(() => {
    if (!props.content) return
    if (props.operation === 0) {
      return props.content['user_name']
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.content])

  return (
    <Fragment>
      <Cell title='分类'> {getTitle()}</Cell>
      <Cell title='类型'>{getType()}</Cell>
      <Cell title='状态'>{props.status === 0 ? '未读' : '已读'}</Cell>
      <Cell title='消息内容'> {getContent()}</Cell>
    </Fragment>
  )
}

export default SystemBody
