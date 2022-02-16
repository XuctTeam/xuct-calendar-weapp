/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-16 14:39:43
 * @LastEditTime: 2022-02-16 15:32:31
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent } from 'react'
import { Cell } from '@taroify/core'
import { IGroup } from '~/../@types/group'
import GroupBody from './GroupBody'

interface IPageStateProps {
  groups: Array<IGroup>
}

const GroupList: FunctionComponent<IPageStateProps> = (props) => {
  return (
    <Cell.Group title='搜索结果'>
      {props.groups.map((item, key) => {
        return <GroupBody group={item} key={key}></GroupBody>
      })}
    </Cell.Group>
  )
}

export default GroupList
