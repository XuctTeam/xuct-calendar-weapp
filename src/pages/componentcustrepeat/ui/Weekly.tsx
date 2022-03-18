/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-30 11:18:24
 * @LastEditTime: 2022-03-18 12:14:32
 * @LastEditors: Derek Xu
 */
import React, { Fragment } from 'react'
import { formatWeek } from '@/utils/utils'
import { Cell, Checkbox } from '@taroify/core'

interface IPageOption {
  defaultValues: Array<string>
  weekSelected: (weeks: Array<string>) => void
}

const Weekly: React.FC<IPageOption> = (props) => {
  return (
    <Checkbox.Group defaultValue={props.defaultValues} onChange={props.weekSelected}>
      <Cell.Group clickable>
        {Array.from([1, 2, 3, 4, 5, 6, 0], (k) => k).map((i) => {
          return (
            <Cell key={i} title={formatWeek(i)}>
              <Checkbox name={`${i}`} />
            </Cell>
          )
        })}
      </Cell.Group>
    </Checkbox.Group>
  )
}

export default Weekly
