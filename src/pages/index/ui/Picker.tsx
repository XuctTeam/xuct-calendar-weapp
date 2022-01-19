/*
 * @Description:首页日历
 * @Author: Derek Xu
 * @Date: 2021-10-26 12:54:02
 * @LastEditTime: 2021-12-07 10:48:06
 * @LastEditors: Derek Xu
 */
import { forwardRef } from 'react'
import CalendarTypes from '@/components/calendar/types/calendar'
import AtCalendar from '@/components/calendar'

type PageOwenProps = {
  ref: any
  currentDay: string
  marks: Array<CalendarTypes.Mark>
  selectDayClick: (item: { value: CalendarTypes.SelectedDate }) => void
  selectMonthChage: (value: string) => void
  selectDayLongClick: (item: { value: string }) => void
}

const CalendarRef: React.FC<PageOwenProps> = forwardRef((props, ref: any) => (
  <AtCalendar
    ref={ref}
    currentDate={props.currentDay}
    marks={props.marks}
    isSwiper={false}
    onSelectDate={props.selectDayClick}
    onMonthChange={props.selectMonthChage}
    onDayLongClick={props.selectDayLongClick}
  ></AtCalendar>
))

const Picker = (props: PageOwenProps, ref) => {
  return (
    <CalendarRef
      ref={ref}
      marks={props.marks}
      currentDay={props.currentDay}
      selectDayClick={props.selectDayClick}
      selectMonthChage={props.selectMonthChage}
      selectDayLongClick={props.selectDayLongClick}
    ></CalendarRef>
  )
}

export default forwardRef(Picker)
