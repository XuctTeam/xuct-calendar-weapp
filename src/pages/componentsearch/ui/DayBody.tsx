/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-24 15:26:05
 * @LastEditTime: 2022-01-28 15:20:02
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { Cell } from '@taroify/core'
import { IDavComponent } from '~/../@types/calendar'
import dayjs from 'dayjs'
import { formatWeek } from '@/utils/utils'
import ComponentBody from './ComponentBody'

interface IPageStateProps {
  day: string
  components: Array<IDavComponent>
  viewComponent: (component: IDavComponent) => void
}

const DayBody: React.FC<IPageStateProps> = (props) => {
  const formatDay = (): string => {
    return dayjs(props.day).format('MM-DD') + ' ' + formatWeek(dayjs(props.day).get('day'))
  }

  return (
    <Cell.Group title={formatDay()}>
      {props.components.map((item) => {
        return <ComponentBody key={item.id} component={item} viewComponent={props.viewComponent}></ComponentBody>
      })}
    </Cell.Group>
  )
}

export default DayBody
