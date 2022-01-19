/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-23 17:55:21
 * @LastEditTime: 2022-01-18 13:54:44
 * @LastEditors: Derek Xu
 */
import React, { useState } from 'react'
import { Popup, DatetimePicker } from '@taroify/core'
import { DatetimePickerType } from '@taroify/core/datetime-picker/datetime-picker.shared'

type PageStateProps = {
  open: boolean
  title: string
  minDate?: Date
  dataType: DatetimePickerType
  selected: Date
  type: number
  pickSelectedHandler: (type: number, date: Date) => void
  closeHandler: (type: number) => void
}

const Picker: React.FC<PageStateProps> = (props) => {
  const [maxDate] = useState(new Date(2030, 12, 31))

  const okClick = (date: Date) => {
    props.pickSelectedHandler(props.type, date)
  }

  const onCancleClick = () => {
    props.closeHandler(props.type)
  }

  console.log(props.selected)
  console.log('-----date ------')
  console.log(props.minDate)
  console.log('-----min ------')

  return (
    <Popup open={props.open} placement='bottom' style={{ height: '60%' }} onClose={onCancleClick}>
      <DatetimePicker
        onConfirm={okClick}
        onCancel={onCancleClick}
        type={props.dataType}
        min={props.minDate}
        max={maxDate}
        defaultValue={props.selected}
        filter={(type, options) => {
          if (type === 'minute') {
            return options.filter((option) => Number(option) % 5 === 0)
          }
          return options
        }}
        formatter={(type, val) => {
          if (type === 'year') {
            return `${val}年`
          }
          if (type === 'month') {
            return `${val}月`
          }
          if (type === 'day') {
            return `${val}日`
          }
          return val
        }}
      >
        <DatetimePicker.Toolbar>
          <DatetimePicker.Button>取消</DatetimePicker.Button>
          <DatetimePicker.Title>{props.title}</DatetimePicker.Title>
          <DatetimePicker.Button>确认</DatetimePicker.Button>
        </DatetimePicker.Toolbar>
      </DatetimePicker>
    </Popup>
  )
}
export default Picker
