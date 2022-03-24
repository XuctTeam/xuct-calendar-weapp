/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-28 11:42:57
 * @LastEditTime: 2022-03-24 09:01:46
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useCallback } from 'react'
import { Button, Cell, Empty, SwipeCell } from '@taroify/core'
import { IGroup } from '~/../@types/group'
import { useModal } from 'taro-hooks'

interface IPageOption {
  groups: Array<IGroup>
  applyAgree: (gid: string, mid: string) => void
  applyRefuse: (gid: string, mid: string) => void
}

const ApplyMine: FunctionComponent<IPageOption> = (props) => {
  const [show] = useModal({
    title: '提示',
    content: '确定同意么？'
  })

  const applyAgreeHandler = useCallback(
    (gid: string = '', mid: string = '') => {
      if (!gid || !mid) return
      show().then((res) => {
        if (res.cancel) return
        props.applyAgree(gid, mid)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [show]
  )

  const applyRefuseHandler = useCallback(
    (gid: string = '', mid: string = '') => {
      if (!gid || !mid) return
      show({
        content: '确定拒绝么？'
      }).then((res) => {
        if (res.cancel) return
        props.applyRefuse(gid, mid)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [show]
  )

  return (
    <Fragment>
      {props.groups.length === 0 ? (
        <Empty>
          <Empty.Image />
          <Empty.Description>暂无数据</Empty.Description>
        </Empty>
      ) : (
        props.groups.map((item, key) => {
          return (
            <SwipeCell key={key}>
              <Cell bordered={false} title={`组名:${item.name}`}>
                {item.createMemberName}
              </Cell>
              <SwipeCell.Actions side='right'>
                <Button variant='contained' shape='square' color='danger' onClick={() => applyRefuseHandler(item.id, item.memberId)}>
                  拒绝
                </Button>
                <Button variant='contained' shape='square' color='primary' onClick={() => applyAgreeHandler(item.id, item.memberId)}>
                  同意
                </Button>
              </SwipeCell.Actions>
            </SwipeCell>
          )
        })
      )}
    </Fragment>
  )
}

export default ApplyMine
