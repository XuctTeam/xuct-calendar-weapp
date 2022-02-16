/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-16 14:35:53
 * @LastEditTime: 2022-02-16 15:25:58
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { Button, Cell, SwipeCell } from '@taroify/core'
import { IGroup } from '~/../@types/group'

interface IPageStateProps {
  group: IGroup
}

const GroupBody: FunctionComponent<IPageStateProps> = (props) => {
  const { name, createMemberName } = props.group

  return (
    <SwipeCell>
      <Cell bordered={false} title={name}>
        {createMemberName}
      </Cell>
      <SwipeCell.Actions side='right'>
        <Button variant='contained' shape='square' color='danger'>
          加入
        </Button>
      </SwipeCell.Actions>
    </SwipeCell>
  )
}

export default GroupBody
