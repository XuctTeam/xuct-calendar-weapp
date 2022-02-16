/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-28 18:54:31
 * @LastEditTime: 2022-02-16 18:12:50
 * @LastEditors: Derek Xu
 */

import { View } from '@tarojs/components'
import { Component, Fragment } from 'react'
import Router, { NavigateType } from 'tarojs-router-next'
import { Cell, ActionSheet, Button } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { ActionSheetActionObject } from '@taroify/core/action-sheet/action-sheet.shared'
import dayjs from 'dayjs'
import { back } from '@/utils/taro'
import { Weekly, Monthly, IntervalPicker } from './ui'

import './index.scss'

type PageDvaProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type IProps = PageDvaProps & PageDispatchProps & PageOwnProps

type PageStateProps = {
  repeatTypeOpen: boolean
  intervalOpen: boolean
  selectedDate: Date
  repeatType: string
  repeatInterval: number
  selectedWeek: Array<string>
  selectedMonthDay: string
}

interface ScheduleCustRepeat {
  props: IProps
  state: PageStateProps
}

const formatType = (type: string): string => {
  switch (type) {
    case 'DAILY':
      return '天'
    case 'WEEKLY':
      return '周'
    case 'MONTHLY':
      return '月'
    default:
      return '年'
  }
}

const selectedView = (
  type: string,
  selectedDate: Date,
  selectedWeek: Array<string>,
  selectedMonthDay: string,
  weekSelected: (values: Array<string>) => void,
  monthDaySelected: (name: string) => void
): JSX.Element => {
  switch (type) {
    case 'DAILY':
      return <></>
    case 'WEEKLY':
      return <Weekly defaultValues={selectedWeek} weekSelected={weekSelected}></Weekly>
    case 'MONTHLY':
      return <Monthly selectedDate={selectedDate} selectedMonthDay={selectedMonthDay} monthDaySelected={monthDaySelected}></Monthly>
  }
  return <></>
}

class ScheduleCustRepeat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repeatTypeOpen: false,
      intervalOpen: false,
      selectedDate: dayjs().toDate(),
      repeatType: 'DAILY',
      repeatInterval: 1,
      selectedWeek: [],
      selectedMonthDay: '1'
    }
  }

  componentDidMount() {
    let data = Router.getData()
    if (!data) {
      Router.toComponentcreate({ type: NavigateType.redirectTo })
      return
    }
    const { repeatType, repeatInterval, repeatByday, repeatBymonth, repeatBymonthday } = data
    const updateData = {
      repeatType: 'DAILY',
      repeatInterval: repeatInterval,
      selectedWeek: [],
      selectedMonthDay: '1'
    }
    if (repeatType) {
      updateData.repeatType = repeatType
      if (data.repeatType === 'WEEKLY') {
        updateData.selectedWeek = repeatByday.split(',').map((i) => {
          return i.split(':')[1]
        })
      } else if (data.repeatType === 'MONTHLY') {
        if (!repeatBymonth && !repeatBymonthday && repeatByday) {
          updateData.selectedMonthDay = '2'
        }
      } else if (data.repeatType === 'YEARLY') {
      }
    }
    this.setState({ ...updateData })
  }

  intervalOpen = () => {
    this.setState({
      intervalOpen: true
    })
  }

  intervalClose = () => {
    this.setState({
      intervalOpen: false
    })
  }

  intervalSelected = (values: Array<string>) => {
    this.setState({
      repeatInterval: values[0],
      intervalOpen: false
    })
  }

  repeatOpen = (open: boolean) => {
    this.setState({
      repeatTypeOpen: open
    })
  }

  repeatSelected = (event: ActionSheetActionObject) => {
    this.setState({
      repeatType: event.value,
      repeatTypeOpen: false
    })
  }

  weekSelected = (values: Array<string>) => {
    this.setState({
      selectedWeek: values
    })
  }

  monthDaySelected = (name: string) => {
    this.setState({
      selectedMonthDay: name
    })
  }

  /**
   * 保存
   */
  saveCustRepeat = () => {
    back(1, {
      repeatType: this.state.repeatType,
      repeatInterval: this.state.repeatInterval,
      selectedWeek: this.state.selectedWeek.sort((n1, n2) => Number.parseInt(n1) - Number.parseInt(n2)),
      selectedMonthDay: this.state.selectedMonthDay
    })
  }

  render() {
    return (
      <Fragment>
        <CommonMain className='vi-schedulecustrepeat-wrapper' title='自定义重复' to={1} fixed={false} left>
          <View className='vi-schedulecustrepeat-wrapper_content'>
            <Cell title='频率' clickable onClick={this.repeatOpen.bind(this, true)}>
              {formatType(this.state.repeatType)}
            </Cell>
            <Cell title='每' clickable onClick={this.intervalOpen.bind(this)}>
              {this.state.repeatInterval + formatType(this.state.repeatType)}
            </Cell>
            <View>
              {selectedView(
                this.state.repeatType,
                this.state.selectedDate,
                this.state.selectedWeek,
                this.state.selectedMonthDay,
                this.weekSelected.bind(this),
                this.monthDaySelected.bind(this)
              )}
            </View>
          </View>
          <View className='vi-schedulecustrepeat-wrapper_button'>
            <Button color='success' block onClick={this.saveCustRepeat.bind(this)}>
              保存
            </Button>
          </View>
        </CommonMain>

        <ActionSheet open={this.state.repeatTypeOpen} onClose={this.repeatOpen.bind(this, false)} onSelect={this.repeatSelected.bind(this)}>
          <ActionSheet.Action name='天' value='DAILY'></ActionSheet.Action>
          <ActionSheet.Action name='周' value='WEEKLY'></ActionSheet.Action>
          <ActionSheet.Action name='月' value='MONTHLY'></ActionSheet.Action>
          <ActionSheet.Action name='年' value='YEARLY'></ActionSheet.Action>
        </ActionSheet>
        <IntervalPicker
          open={this.state.intervalOpen}
          type={this.state.repeatType}
          repeatInterval={this.state.repeatInterval}
          closeHandler={this.intervalClose.bind(this)}
          intervalSelected={this.intervalSelected.bind(this)}
        ></IntervalPicker>
      </Fragment>
    )
  }
}

export default ScheduleCustRepeat
