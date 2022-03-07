/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-28 19:24:31
 * @LastEditTime: 2022-03-07 17:09:48
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { Popup, Picker } from '@taroify/core'

interface IPageOption {
  open: boolean
  type: string
  repeatInterval: number
  intervalSelected: (values: Array<string>) => void
  closeHandler: () => void
}

const IntervalPicker: React.FC<IPageOption> = (props) => {
  return (
    <Popup open={props.open} rounded placement='bottom' onClose={props.closeHandler}>
      <Picker defaultValue={props.repeatInterval} onCancel={props.closeHandler} onConfirm={props.intervalSelected}>
        <Picker.Toolbar>
          <Picker.Button>取消</Picker.Button>
          <Picker.Title>循环周期</Picker.Title>
          <Picker.Button>确认</Picker.Button>
        </Picker.Toolbar>
        <Picker.Column>
          {Array.from({ length: 100 }, (v, k) => k)
            .splice(1)
            .map((i) => {
              return <Picker.Option key={i}>{i}</Picker.Option>
            })}
        </Picker.Column>
      </Picker>
    </Popup>
  )
}

export default IntervalPicker
