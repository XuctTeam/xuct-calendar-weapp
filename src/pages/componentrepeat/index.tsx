/*
 * @Description: 日程重复
 * @Author: Derek Xu
 * @Date: 2021-12-24 16:14:50
 * @LastEditTime: 2022-01-18 11:18:57
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import Router, { NavigateType } from 'tarojs-router-next'
import IconFont from '@/components/iconfont'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { Button, Cell, Radio } from '@taroify/core'
import CommonHeader from '@/components/mixin'
import { formatRepeatTime } from '@/utils/utils'
import { back } from '@/utils/taro'

import './index.scss'

type PageDvaProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type IProps = PageDvaProps & PageDispatchProps & PageOwnProps

type PageStateProps = {
  selectedDate: Date
  repeatStatus: string
  repeatInterval: 1
  repeatType: string
  repeatByday: string
  repeatBymonth: string
  repeatBymonthday: string
}

interface Schedulerepet {
  props: IProps
  state: PageStateProps
}

class Schedulerepet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: dayjs().toDate(),
      repeatStatus: '0',
      repeatInterval: 1,
      repeatType: '',
      repeatByday: '',
      repeatBymonth: '',
      repeatBymonthday: ''
    }
  }

  componentDidMount() {
    let data = Router.getData()
    if (data) {
      this.setState({ ...this.state, ...data })
    }
  }

  repetRaidoChage = (value: string) => {
    let repeatType: string = '',
      repeatByday: string = '',
      repeatBymonth: number = 0,
      repeatBymonthday: number = 0
    if (value === '1') {
      repeatType = 'DAILY'
    } else if (value === '2') {
      repeatType = 'WEEKLY'
      repeatByday = '0:1,0:2,0:3,0:4,0:5'
    } else if (value === '3') {
      repeatType = 'WEEKLY'
      repeatByday = '0:6,0:0'
    } else if (value === '4') {
      repeatType = 'WEEKLY'
      repeatByday = '0:6'
    } else if (value === '5') {
      repeatType = 'MONTHLY'
      repeatBymonthday = dayjs(this.state.selectedDate).get('date')
    } else if (value === '6') {
      repeatType = 'MONTHLY'
      repeatByday = Math.ceil(this.state.selectedDate.getDate() / 7) + ':' + dayjs(this.state.selectedDate).day()
    } else if (value === '7') {
      repeatType = 'YEARLY'
      repeatBymonth = dayjs(this.state.selectedDate).get('month') + 1
      repeatBymonthday = dayjs(this.state.selectedDate).get('date')
    }
    this.setState({
      repeatType: repeatType,
      repeatByday: repeatByday,
      repeatBymonth: repeatBymonth + '',
      repeatBymonthday: repeatBymonthday + '',
      repeatStatus: value,
      repeatInterval: 1
    })
  }

  openCustRepeat = async () => {
    try {
      const result = await Router.toComponentcustrepeat({
        data: {
          selectedDate: this.state.selectedDate,
          repeatInterval: this.state.repeatInterval,
          repeatType: this.state.repeatType,
          repeatByday: this.state.repeatByday,
          repeatBymonth: this.state.repeatBymonth,
          repeatBymonthday: this.state.repeatBymonthday
        }
      })
      if (!result) return
      const { repeatType, repeatInterval, selectedWeek, selectedMonthDay } = result
      if (repeatType === 'DAILY') {
        this._custDaySelect(repeatInterval)
        return
      }
      if (repeatType === 'WEEKLY') {
        this._custWeeklySelect(repeatInterval, selectedWeek)
        return
      }

      if (repeatType === 'MONTHLY') {
        this._custMonthlySelect(repeatInterval, selectedMonthDay)
        return
      }
      this._custYearlySelect(repeatInterval)
    } catch (err) {
      console.log(err)
      Router.toIndex({ type: NavigateType.switchTab })
    }
  }

  /**
   * 自定义天重复
   * @param repeatInterval
   */
  _custDaySelect = (repeatInterval: number) => {
    this.setState({
      repeatStatus: repeatInterval === 1 ? '1' : '8',
      repeatInterval: repeatInterval,
      repeatType: 'DAILY'
    })
  }

  /**
   * 自定义周重复
   * @param repeatInterval
   * @param selectedWeek
   */
  _custWeeklySelect = (repeatInterval: number, selectedWeek: Array<string>) => {
    if (selectedWeek.length === 0) {
      selectedWeek.push(dayjs(this.state.selectedDate).day() + '')
    }
    const updateData = {
      repeatStatus: '8',
      repeatInterval: repeatInterval,
      repeatType: 'WEEKLY',
      repeatByday: ''
    }

    const joinArray: Array<string> = selectedWeek.map((i) => {
      return '0:' + i
    })
    updateData.repeatByday = joinArray.join(',')
    if (repeatInterval === 1 && (selectedWeek.length === 1 || selectedWeek.length === 2 || selectedWeek.length === 5)) {
      if (selectedWeek.length === 1 && selectedWeek[0] === '6') {
        updateData.repeatStatus = '4'
      } else if (selectedWeek.length === 2 && selectedWeek[0] === '6' && selectedWeek[1] === '0') {
        updateData.repeatStatus = '3'
      } else if (selectedWeek.length === 5) {
        let weekDay = new Set(['1', '2', '3', '4', '5'])
        let selectedWeekDay = new Set(selectedWeek)
        let diff = new Set([...weekDay].filter((x) => !selectedWeekDay.has(x)))
        if (diff.size === 0) {
          updateData.repeatStatus = '2'
        }
      }
    }
    this.setState({ ...updateData })
  }

  /**
   * 自定义月重复
   * @param repeatInterval
   * @param selectedMonthDay
   */
  _custMonthlySelect = (repeatInterval: number, selectedMonthDay: string) => {
    const updateData = {
      repeatStatus: '8',
      repeatInterval: repeatInterval,
      repeatType: 'MONTHLY',
      repeatBymonthday: '',
      repeatByday: ''
    }
    if (selectedMonthDay) {
      if (selectedMonthDay === '1') {
        updateData.repeatBymonthday = dayjs(this.state.selectedDate).get('date') + ''
        if (repeatInterval === 1) {
          updateData.repeatStatus = '5'
        }
      } else {
        updateData.repeatByday = Math.ceil(this.state.selectedDate.getDate() / 7) + ':' + dayjs(this.state.selectedDate).day()
        if (repeatInterval === 1) {
          updateData.repeatStatus = '6'
        }
      }
    }
    this.setState({ ...updateData })
  }

  /**
   * 年自定义重复
   * @param repeatInterval
   */
  _custYearlySelect = (repeatInterval: number) => {
    const updateData = {
      repeatStatus: '8',
      repeatInterval: repeatInterval,
      repeatType: 'YEARLY',
      repeatBymonth: dayjs(this.state.selectedDate).get('month') + 1,
      repeatBymonthday: dayjs(this.state.selectedDate).get('date')
    }
    if (repeatInterval === 1) {
      updateData.repeatStatus = '7'
    }
    this.setState({ ...updateData })
  }

  repeatSave = () => {
    back(1, {
      repeatType: this.state.repeatType,
      repeatByday: this.state.repeatByday,
      repeatBymonth: this.state.repeatBymonth,
      repeatBymonthday: this.state.repeatBymonthday,
      repeatInterval: this.state.repeatInterval,
      repeatStatus: this.state.repeatStatus
    })
  }

  render() {
    return (
      <View className='vi-repet-wrapper'>
        <CommonHeader title='重复' to={1} fixed={false} left></CommonHeader>
        <Radio.Group className='vi-repet-wrapper_content' value={this.state.repeatStatus} onChange={this.repetRaidoChage.bind(this)}>
          <Cell.Group clickable>
            <Cell title='不重复' bordered={false} className='no-repet'>
              <Radio name='0' />
            </Cell>
            <Cell title='每天'>
              <Radio name='1' />
            </Cell>
            <Cell title='每周一至五'>
              <Radio name='2' />
            </Cell>
            <Cell title='每周六、周日'>
              <Radio name='3' />
            </Cell>
            <Cell title='每周（周六）'>
              <Radio name='4' />
            </Cell>
            <Cell title={`每月` + dayjs(this.state.selectedDate).format('（DD日）')}>
              <Radio name='5' />
            </Cell>
            <Cell title={`每月` + '（第' + Math.ceil(this.state.selectedDate.getDate() / 7) + '个' + dayjs(this.state.selectedDate).format('ddd') + '）'}>
              <Radio name='6' />
            </Cell>
            <Cell title={`每年（` + dayjs(this.state.selectedDate).format('MM月DD日）')}>
              <Radio name='7' />
            </Cell>
          </Cell.Group>
          <Cell
            className='cust'
            clickable
            title='自定义'
            onClick={this.openCustRepeat.bind(this)}
            brief={
              this.state.repeatStatus === '8'
                ? formatRepeatTime(
                    this.state.repeatType,
                    this.state.repeatStatus,
                    this.state.repeatByday,
                    this.state.repeatBymonth,
                    this.state.repeatBymonthday,
                    this.state.repeatInterval
                  )
                : ''
            }
          >
            {this.state.repeatStatus === '8' ? <IconFont name='duigou' size={50}></IconFont> : <></>}
          </Cell>
        </Radio.Group>
        <View className='vi-repet-wrapper_button'>
          <Button color='success' block onClick={this.repeatSave.bind(this)}>
            保存
          </Button>
        </View>
      </View>
    )
  }
}

export default Schedulerepet
