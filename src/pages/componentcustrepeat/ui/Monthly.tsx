/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-31 02:24:12
 * @LastEditTime: 2021-12-31 15:19:41
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { Cell, Radio } from '@taroify/core'
import dayjs from 'dayjs'

interface IPageStateProps {
  selectedDate: Date
  selectedMonthDay: string
  monthDaySelected: (name: string) => void
}

const Monthly: React.FC<IPageStateProps> = (props) => {
  return (
    <>
      <Radio.Group defaultValue={props.selectedMonthDay} onChange={props.monthDaySelected}>
        <Cell.Group clickable>
          <Cell title={`每月` + dayjs(props.selectedDate).format('（DD日）')}>
            <Radio name='1' />
          </Cell>
          <Cell title={`每月` + '（第' + Math.ceil(props.selectedDate.getDate() / 7) + '个' + dayjs(props.selectedDate).format('ddd') + '）'}>
            <Radio name='2' />
          </Cell>
        </Cell.Group>
      </Radio.Group>
    </>
  )
}

export default Monthly
