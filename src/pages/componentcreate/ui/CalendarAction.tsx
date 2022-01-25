/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-24 11:31:41
 * @LastEditTime: 2022-01-25 21:03:43
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { View } from '@tarojs/components'
import { ActionSheet } from '@taroify/core'
import { IDavCalendar } from '~/../@types/calendar'
import { ActionSheetActionObject } from '@taroify/core/action-sheet/action-sheet.shared'

type PageStateProps = {
  open: boolean
  calendars: Array<IDavCalendar>
  closeHandler: () => void
  selectedHandler: (id: any) => void
}

const CalendarAction: React.FC<PageStateProps> = (props) => {
  const selected = (data: ActionSheetActionObject) => {
    props.selectedHandler(data.value)
  }

  return (
    <View className='vi-schedule-wrapper_calendar-action'>
      <ActionSheet open={props.open} onSelect={selected} onClose={props.closeHandler} onCancel={props.closeHandler}>
        <ActionSheet.Header>日历选择</ActionSheet.Header>
        {props.calendars.map((item, i) => {
          return <ActionSheet.Action key={i} style={{ color: `#${item.color}` }} name={item.name} value={item.id}></ActionSheet.Action>
        })}

        <ActionSheet.Button>取消</ActionSheet.Button>
      </ActionSheet>
    </View>
  )
}

export default CalendarAction
