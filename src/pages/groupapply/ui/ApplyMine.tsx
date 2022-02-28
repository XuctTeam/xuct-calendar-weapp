/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-28 11:42:57
 * @LastEditTime: 2022-02-28 14:28:58
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Button, Cell, SwipeCell } from '@taroify/core'
import { IGroup } from '~/../@types/group'

interface IPageProps {
  groups: Array<IGroup>
  applyAgree: (gid: string, mid: string) => void
  applyRefuse: (gid: string, mid: string) => void
}

const ApplyMine: FunctionComponent<IPageProps> = (props) => {
  const applyAgreeHandler = (gid: string = '', mid: string = '') => {
    if (!gid || !mid) return
    Taro.showModal({
      title: '提示',
      content: '确定同意么？',
      success: function (res) {
        if (res.confirm) {
          props.applyAgree(gid, mid)
        } else if (res.cancel) {
          console.log('用户取消')
        }
      }
    })
  }

  const applyRefuseHandler = (gid: string = '', mid: string = '') => {
    if (!gid || !mid) return
    Taro.showModal({
      title: '提示',
      content: '确定拒绝么？',
      success: function (res) {
        if (res.confirm) {
          props.applyRefuse(gid, mid)
        } else if (res.cancel) {
          console.log('用户取消')
        }
      }
    })
  }

  return (
    <Fragment>
      {props.groups.length === 0 ? (
        <View>暂无数据</View>
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
