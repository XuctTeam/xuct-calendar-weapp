/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-12 15:24:43
 * @LastEditTime: 2022-01-17 15:06:36
 * @LastEditors: Derek Xu
 */

import { alarmTimeTypes, alarmTypes } from '@/constants/index'
import { Radio } from '@taroify/core'

interface IPageState {
  type: 'alarmTime' | 'alarmType'
  defaultValue: string
  disable?: boolean
  onChange: (name: string) => void
}

const AlarmRadio: React.FC<IPageState> = (props) => {
  console.log(props.defaultValue)
  return (
    <Radio.Group value={props.defaultValue} direction='horizontal' disabled={props.disable} onChange={props.onChange}>
      {props.type === 'alarmTime'
        ? alarmTimeTypes.map((item, i) => {
            return (
              <Radio key={i} name={item.value}>
                {item.text}
              </Radio>
            )
          })
        : alarmTypes.map((item, i) => {
            return (
              <Radio key={i} name={item.value}>
                {item.text}
              </Radio>
            )
          })}
    </Radio.Group>
  )
}
export default AlarmRadio
