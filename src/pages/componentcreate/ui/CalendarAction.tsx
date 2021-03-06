/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-24 11:31:41
 * @LastEditTime: 2022-03-13 16:23:48
 * @LastEditors: Derek Xu
 */
import React from 'react'
import { View } from '@tarojs/components'
import { ActionSheet } from '@taroify/core'
import { IDavCalendar } from '~/../@types/calendar'
import { ActionSheetActionObject } from '@taroify/core/action-sheet/action-sheet.shared'

type IPageOption = {
  open: boolean
  calendars: Array<IDavCalendar>
  closeHandler: () => void
  selectedHandler: (id: any) => void
}

const CalendarAction: React.FC<IPageOption> = (props) => {
  console.log(props.calendars)

  const selected = (data: ActionSheetActionObject) => {
    props.selectedHandler(data.value)
  }

  return (
    <View className='vi-component-wrapper_calendar-action'>
      <ActionSheet open={props.open} onSelect={selected} onClose={props.closeHandler} onCancel={props.closeHandler} rounded={false}>
        <ActionSheet.Header>日历选择</ActionSheet.Header>
        {props.calendars.map((item, i) => {
          return <ActionSheet.Action key={i} style={{ color: `#${item.color}` }} name={item.name} value={item.id}></ActionSheet.Action>
        })}
        <ActionSheet.Button type='cancel'>取消</ActionSheet.Button>
      </ActionSheet>
    </View>
  )
}

export default CalendarAction
