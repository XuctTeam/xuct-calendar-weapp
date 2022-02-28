/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-28 11:40:50
 * @LastEditTime: 2022-02-28 14:40:05
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, SwipeCell } from '@taroify/core'
import { IGroup } from '~/../@types/group'

interface IPageProps {
  groups: Array<IGroup>
}

const MineApply: FunctionComponent<IPageProps> = (props) => {
  return (
    <Fragment>
      {props.groups.length === 0 ? (
        <View>暂无数据</View>
      ) : (
        props.groups.map((item, key) => {
          return (
            <SwipeCell key={key}>
              <SwipeCell.Actions side='left'>
                <Button variant='contained' shape='square' color='primary'>
                  选择
                </Button>
              </SwipeCell.Actions>
              <Cell bordered={false} title='单元格'>
                内容
              </Cell>
              <SwipeCell.Actions side='right'>
                <Button variant='contained' shape='square' color='danger'>
                  删除
                </Button>
                <Button variant='contained' shape='square' color='primary'>
                  收藏
                </Button>
              </SwipeCell.Actions>
            </SwipeCell>
          )
        })
      )}
    </Fragment>
  )
}

export default MineApply
