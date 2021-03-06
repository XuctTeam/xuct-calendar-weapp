/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-01 08:40:11
 * @LastEditTime: 2022-05-05 17:14:54
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Router, { NavigateType } from 'tarojs-router-next'
import { Cell, ActionSheet, Button } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { ActionSheetActionObject } from '@taroify/core/action-sheet/action-sheet.shared'
import dayjs from 'dayjs'
import { back } from '@/utils/taro'
import { Weekly, Monthly, IntervalPicker } from './ui'
import './index.scss'

const ComponentCustRepeat: FunctionComponent = () => {
  const [repeatTypeOpen, setRepeatTypeOpen] = useState<boolean>(false)
  const [intervalOpen, setIntervalOpen] = useState<boolean>(false)
  const [repeatType, setRepeatType] = useState<string>('DAILY')
  const [repeatInterval, setRepeatInterval] = useState<number>(1)
  const [selectedWeek, setSelectedWeek] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(dayjs().toDate())
  const [selectedMonthDay, setSelectedMonthDay] = useState<string>('1')

  useEffect(() => {
    let data = Router.getData()
    if (!data) {
      Router.toComponentcreate({ type: NavigateType.redirectTo })
      return
    }
    if (!data.repeatType) return
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { repeatByday, repeatBymonth, repeatBymonthday, repeatInterval } = data
    setSelectedDate(data.selectedDate)
    setRepeatType(data.repeatType)
    setRepeatInterval(repeatInterval)
    if (data.repeatType === 'WEEKLY') {
      setSelectedWeek(
        repeatByday.split(',').map((i) => {
          return i.split(':')[1]
        })
      )
    } else if (data.repeatType === 'MONTHLY') {
      if (!repeatBymonth && !repeatBymonthday && repeatByday) {
        setSelectedMonthDay('2')
      }
    }
  }, [])

  const formatType = (type: string): string => {
    switch (type) {
      case 'DAILY':
        return '???'
      case 'WEEKLY':
        return '???'
      case 'MONTHLY':
        return '???'
      default:
        return '???'
    }
  }

  const intervalSelected = (values: Array<string>) => {
    setRepeatInterval(Number.parseInt(values[0]))
    setIntervalOpen(false)
  }

  const repeatSelected = (event: ActionSheetActionObject) => {
    setRepeatType(event.value)
    setRepeatTypeOpen(false)
  }

  const weekSelected = (values: Array<string>) => {
    setSelectedWeek(values)
  }

  const monthDaySelected = (name: string) => {
    setSelectedMonthDay(name)
  }

  /**
   * ??????
   */
  const saveCustRepeat = () => {
    back({
      to: 1,
      data: {
        repeatType: repeatType,
        repeatInterval: repeatInterval,
        selectedWeek: selectedWeek.sort((n1, n2) => Number.parseInt(n1) - Number.parseInt(n2)),
        selectedMonthDay: selectedMonthDay
      }
    })
  }

  return (
    <Fragment>
      <CommonMain className='vi-schedulecustrepeat-wrapper' title='???????????????' to={1} fixed={false} left>
        <View className='vi-schedulecustrepeat-wrapper_content'>
          <Cell title='??????' clickable onClick={() => setRepeatTypeOpen(true)}>
            {formatType(repeatType)}
          </Cell>
          <Cell title='???' clickable onClick={() => setIntervalOpen(true)}>
            {repeatInterval + formatType(repeatType)}
          </Cell>
          {repeatType === 'WEEKLY' ? (
            <Weekly defaultValues={selectedWeek} weekSelected={weekSelected}></Weekly>
          ) : repeatType === 'MONTHLY' ? (
            <Monthly selectedDate={selectedDate} selectedMonthDay={selectedMonthDay} monthDaySelected={monthDaySelected}></Monthly>
          ) : (
            <></>
          )}
        </View>
        <View className='vi-schedulecustrepeat-wrapper_button'>
          <Button color='success' block onClick={saveCustRepeat}>
            ??????
          </Button>
        </View>
      </CommonMain>

      <ActionSheet open={repeatTypeOpen} onClose={() => setRepeatTypeOpen(false)} onSelect={repeatSelected}>
        <ActionSheet.Header>????????????</ActionSheet.Header>
        <ActionSheet.Action name='???' value='DAILY'></ActionSheet.Action>
        <ActionSheet.Action name='???' value='WEEKLY'></ActionSheet.Action>
        <ActionSheet.Action name='???' value='MONTHLY'></ActionSheet.Action>
        <ActionSheet.Action name='???' value='YEARLY'></ActionSheet.Action>
        <ActionSheet.Button type='cancel'>??????</ActionSheet.Button>
      </ActionSheet>
      <IntervalPicker
        open={intervalOpen}
        type={repeatType}
        repeatInterval={repeatInterval}
        closeHandler={() => setIntervalOpen(false)}
        intervalSelected={intervalSelected}
      ></IntervalPicker>
    </Fragment>
  )
}

export default ComponentCustRepeat
