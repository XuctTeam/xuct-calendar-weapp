/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-28 09:13:40
 * @LastEditTime: 2022-03-01 14:36:48
 * @LastEditors: Derek Xu
 */
import { DatetimePicker, Popup } from '@taroify/core'
import React, { useState } from 'react'

interface IPageOption {
  selectedDate: Date | null
  open: boolean
  minDate: Date
  closeHanler: () => void
  confirmHandler: (date: Date) => void
}

const RepeatPicker: React.FC<IPageOption> = (props) => {
  const [maxDate] = useState(new Date(2030, 10, 1))
  const [defaultValue] = useState(new Date())

  return (
    <Popup placement='bottom' open={props.open} style={{ height: '60%' }} onClose={props.closeHanler}>
      <DatetimePicker
        value={props.selectedDate ? props.selectedDate : defaultValue}
        onCancel={props.closeHanler}
        onConfirm={props.confirmHandler}
        type='date'
        min={props.minDate}
        max={maxDate}
        formatter={(type, val) => {
          if (type === 'year') {
            return val + '年'
          }
          if (type === 'month') {
            return val + '月'
          }
          if (type === 'day') {
            return val + '日'
          }
          return val
        }}
      >
        <DatetimePicker.Toolbar>
          <DatetimePicker.Button>取消</DatetimePicker.Button>
          <DatetimePicker.Title>时间选择</DatetimePicker.Title>
          <DatetimePicker.Button>确认</DatetimePicker.Button>
        </DatetimePicker.Toolbar>
      </DatetimePicker>
    </Popup>
  )
}

export default RepeatPicker
