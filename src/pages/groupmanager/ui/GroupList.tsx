/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-07 21:49:22
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-07 13:53:55
 */
import { FunctionComponent } from 'react'
import { IGroup } from '~/../@types/group'
import GroupBody from './GroupBody'

interface IPageStateProps {
  groups: Array<IGroup>
  groupClick: (id: string) => void
  groupView: (id: string) => void
}

const GroupList: FunctionComponent<IPageStateProps> = (props) => {
  return (
    <>
      {props.groups.map((item, i) => {
        return <GroupBody group={item} key={i} groupClick={props.groupClick} groupView={props.groupView}></GroupBody>
      })}
    </>
  )
}

export default GroupList
