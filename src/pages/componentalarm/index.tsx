/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-01-02 15:31:09
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-01-24 15:15:09
 */
import React, { useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import { Cell, Checkbox, Radio, Button } from '@taroify/core'
import CommonHeader from '@/components/mixin'
import { back } from '@/utils/taro'

import './index.scss'

interface IPageStateProps {
  openAlarm: string
  alarmTimes: Array<string>
  alarmType: string
}

const Componentalarm: React.FC<IPageStateProps> = () => {
  const [openAlarm, setOpenAlarm] = useState('0')
  const [alarmTime, setAlarmTime] = useState<string[]>([])
  const [alarmType, setAlarmType] = useState('1')

  useEffect(() => {
    const data = Router.getData()
    if (data) {
      if (data.alarmType === '0') {
        setOpenAlarm('1')
      } else {
        setAlarmType(data.alarmType)
        if (data.alarmTimes && data.alarmTimes.length !== 0) {
          setAlarmTime(
            data.alarmTimes.map((i) => {
              return i + ''
            })
          )
        }
      }
    }
  }, [])

  const alarmTimeChage = (names: Array<string>) => {
    setAlarmTime(names)
    if (names.length === 0) {
      setOpenAlarm('1')
    } else {
      setOpenAlarm('0')
    }
  }

  const openAlarmChage = (name: string) => {
    if (name) {
      setAlarmTime([])
      setOpenAlarm('1')
    }
  }

  const alarmTypeChage = (name: string) => {
    setAlarmType(name)
  }

  const saveAlarm = () => {
    const sortAlarmTime = alarmTime.sort((n1, n2) => {
      return Number.parseInt(n1) - Number.parseInt(n2)
    })
    back(1, {
      alarmType: openAlarm === '1' ? '0' : alarmType,
      alarmTimes: openAlarm === '1' ? [] : sortAlarmTime
    })
  }

  return (
    <View className='vi-schedulealarm-wrapper'>
      <CommonHeader title='日程提醒' to={1} fixed={false} left></CommonHeader>
      <View className='vi-schedulealarm-wrapper_content'>
        <Radio.Group value={openAlarm} onChange={(e) => openAlarmChage(e)}>
          <Cell.Group clickable>
            <Cell title='不提醒' className='no-alarm' bordered={false}>
              <Radio name='1' />
            </Cell>
          </Cell.Group>
        </Radio.Group>

        <Checkbox.Group value={alarmTime} onChange={(e) => alarmTimeChage(e)}>
          <Cell.Group clickable>
            <Cell title='15分钟前'>
              <Checkbox name='15' />
            </Cell>
            <Cell title='30分钟前'>
              <Checkbox name='30' />
            </Cell>
            <Cell title='1小时前'>
              <Checkbox name='60' />
            </Cell>
            <Cell title='1天前' className='alarm-time-border' bordered={false}>
              <Checkbox name='1440' />
            </Cell>
          </Cell.Group>
        </Checkbox.Group>
        <Cell.Group title='提醒方式'>
          <Cell align='center' className='alarm-type' bordered={false}>
            <Radio.Group defaultValue={alarmType} value={alarmType} direction='horizontal' onChange={(e) => alarmTypeChage(e)} disabled={openAlarm === '1'}>
              <Radio name='1'>站内信</Radio>
              <Radio name='2'>邮箱</Radio>
              <Radio name='3'>公众号</Radio>
            </Radio.Group>
          </Cell>
        </Cell.Group>
      </View>
      <View className='vi-schedulealarm-wrapper_button'>
        <Button color='success' block onClick={() => saveAlarm()}>
          保存
        </Button>
      </View>
    </View>
  )
}
export default Componentalarm
