/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-01-31 15:58:16
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-28 11:13:56
 */
import { FunctionComponent } from 'react'
import { alarmTimeTypes, alarmTypes } from '@/constants/index'
import { Radio } from '@taroify/core'

interface IPageOption {
  type: 'alarmTime' | 'alarmType'
  defaultValue: string
  disable?: boolean
  onChange: (name: string) => void
}

const AlarmRadio: FunctionComponent<IPageOption> = (props) => {
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
