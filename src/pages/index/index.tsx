/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 12:39:07
 * @FilePath: \react-lesson-20\src\pages\index\index.tsx
 * @LastEditTime: 2022-02-16 18:08:45
 * @LastEditors: Derek Xu
 */
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Taro from '@tarojs/taro'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import { Button, Collapse } from '@taroify/core'
import { Plus, Search } from '@taroify/icons'
import dayjs from 'dayjs'
import { DvaProps } from '~/../@types/dva'
import { ICurrentDay } from '~/../@types/date'
import { getToday } from '@/utils/utils'
import CalendarTypes from '@/components/calendar/types/calendar'
import { IDavCalendar, ICalendarComponent, IDavComponent } from '~/../@types/calendar'
import { componentsDaysById } from '@/api/component'
import CommonMain from '@/components/mixin'
import IconFont from '@/components/iconfont'
import { Picker, Event, CaldavList } from './ui'
import { action } from './actionCreater'

interface ModelProps extends DvaProps {
  accessToken: string
  calendars: Array<IDavCalendar>
  componentRefreshTime: number | null
}

type PageDispatchProps = {
  listSync: () => Promise<any>
  selected: (selectedIds: Array<string>) => void
  refreshTime: (time: number) => void
}
type PageOwnProps = {}
type IProps = ModelProps & PageDispatchProps & PageOwnProps

/** 页面state属性 */
type PageStateProps = {
  selectedDay: string
  popOpen: boolean
  marks: Array<CalendarTypes.Mark>
  componentLoading: boolean
  componentRefreshOpen: boolean
  componentRefreshLocalTime: number | null
  calendarComponents: Array<ICalendarComponent>
}

interface Index {
  props: IProps
  state: PageStateProps
  calRef: any
}

const connects: Function = connect
const day: ICurrentDay = getToday()

@connects(
  ({ common, calendar, component }) => ({
    accessToken: common.accessToken,
    calendars: calendar.calendars,
    componentRefreshTime: component.refreshTime
  }),
  (dispatch) => bindActionCreators(action, dispatch)
)
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: day.current,
      popOpen: false,
      marks: [],
      componentLoading: false,
      componentRefreshOpen: true,
      componentRefreshLocalTime: null,
      calendarComponents: []
    }
    this.calRef = React.createRef()
  }

  componentDidShow() {
    const start: string = dayjs(this.state.selectedDay).startOf('month').format('YYYY-MM-DD HH:mm:ss')
    const end: string = dayjs(this.state.selectedDay).endOf('month').format('YYYY-MM-DD HH:mm:ss')
    if (this.props.accessToken && this.props.calendars.length === 0) {
      this.props.listSync().then((res) => {
        this._queryComponent(res, start, end)
      })
      return
    }
    //本地刷新
    if (
      (!this.props.componentRefreshTime && !this.state.componentRefreshLocalTime) ||
      (!this.props.componentRefreshTime && this.state.componentRefreshLocalTime) ||
      (this.props.componentRefreshTime && !this.state.componentRefreshLocalTime) ||
      (this.props.componentRefreshTime && this.state.componentRefreshLocalTime && this.state.componentRefreshLocalTime < this.props.componentRefreshTime)
    ) {
      this._queryComponent(this.props.calendars, start, end)
    }
  }

  /**
   * 今日图标点击
   */
  currentClickHandle = () => {
    const today: string = day.current
    this.calRef.current.reset(today)
    this.setState({
      selectedDay: today
    })
  }

  selectDayClickHadnle = (item: { value: CalendarTypes.SelectedDate }) => {
    this.setState({
      selectedDay: item.value.start
    })
  }

  /**
   * 日期长按住
   * @param item
   * @returns
   */
  selectDayLongClick = (item: { value: string }): void => {
    console.log(item.value)
  }

  /**
   * 日历月份改变
   *
   * @param value
   */
  selectMonthChage = (value: string) => {
    if (!this.props.accessToken) return
    this._queryComponent(
      this.props.calendars,
      dayjs(value).startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      dayjs(value).endOf('month').format('YYYY-MM-DD HH:mm:ss')
    )
  }

  /**
   * @description 弹出日历列表
   */
  openPopup = () => {
    this.setState({
      popOpen: true
    })
  }

  /**
   * @description 管理日历列表
   */
  closePopup = () => {
    this.setState({
      popOpen: false
    })
  }

  /**
   * @description 日历点击
   * @param value
   */
  calendarSelected = (value: string[]) => {
    this.props.selected(value)
  }

  /**
   * @description 跳转通知页面
   */
  gotoNoticeHandle = () => {
    Taro.navigateTo({
      url: '/pages/notice/index'
    })
  }

  calendarAccordionChage = () => {
    this.setState({
      componentRefreshOpen: !this.state.componentRefreshOpen
    })
  }

  /**
   * @description 新增或修改日程
   */
  createComponent = () => {
    Router.toComponentcreate({
      data: {
        calendars: this.props.calendars,
        selectedDay: this.state.selectedDay + dayjs().format(' HH:mm')
      }
    })
  }

  /**
   * @description 日程列表刷新
   */
  componentRefresh = () => {
    this._queryComponent(
      this.props.calendars,
      dayjs(this.state.selectedDay).startOf('month').format('YYYY-MM-DD HH:mm:ss'),
      dayjs(this.state.selectedDay).endOf('month').format('YYYY-MM-DD HH:mm:ss')
    )
  }

  /**
   * @description 日程查看
   */
  viewComponent = async (component: IDavComponent) => {
    Router.toComponentview({
      params: {
        componentId: component.id
      },
      data: {
        component: component
      }
    })
  }

  /**
   * @description 日程搜索
   */
  searchComponent = () => {
    Router.toComponentsearch()
  }

  /**
   * @description 查询日历下所有日程
   *
   * @param calList
   * @param start
   * @param end
   */
  _queryComponent = (calList: Array<IDavCalendar>, start: string, end: string) => {
    this.setState({
      calendarComponents: [],
      componentLoading: true,
      marks: []
    })
    let pList: Array<Promise<any>> = []
    calList.forEach((calendar) => {
      pList.push(
        new Promise(function (resolve, reject) {
          componentsDaysById(calendar.calendarId, start, end)
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      )
    })
    const that = this
    let calendarComponents: Array<ICalendarComponent> = []
    Promise.all(
      pList.map((p) => {
        return p.catch((error) => error)
      })
    )
      .then((res) => {
        if (!(res instanceof Array)) return
        res.forEach((i) => (calendarComponents = calendarComponents.concat(i)))
        that._fillMarkDay(calendarComponents)
        const now: number = dayjs().unix()
        that.setState({
          calendarComponents: calendarComponents,
          componentLoading: false,
          componentRefreshLocalTime: now
        })
        this.props.refreshTime(now)
      })
      .catch((error) => {
        console.log(error, 'error')
        that.setState({
          componentLoading: false
        })
      })
  }

  /**
   * @description 补充日历上有日程的天
   *
   * @param components
   * @returns
   */
  _fillMarkDay = (components: Array<ICalendarComponent>) => {
    if (components.length === 0) return
    const daySet: Set<string> = new Set<string>([])
    components.forEach((comp) => {
      daySet.add(dayjs(comp.day).format('YYYY/MM/DD'))
    })
    const marks: Array<CalendarTypes.Mark> = Array.from(daySet).map((i) => {
      return { value: i }
    })
    this.setState({
      marks: marks
    })
  }

  render() {
    return (
      <Fragment>
        <CommonMain className='vi-index-wrapper' title='楚日历' fixed left={false}>
          <Collapse defaultValue={[0]} bordered onChange={this.calendarAccordionChage.bind(this)}>
            <Collapse.Item
              clickable={false}
              className='custom-collapse-item1'
              title={
                <View className='vi-index-wrapper_calendar'>
                  <View
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      this.openPopup()
                    }}
                  >
                    <IconFont name='rili' size={54} />
                  </View>
                  <View className='day'>{this.state.selectedDay}</View>
                </View>
              }
              extra={
                <>
                  <Search
                    size={18}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      this.searchComponent()
                    }}
                  />
                </>
              }
            >
              <Picker
                ref={this.calRef}
                currentDay={dayjs(this.state.selectedDay).format('YYYY/MM/DD')}
                marks={this.state.marks}
                selectMonthChage={this.selectMonthChage.bind(this)}
                selectDayLongClick={this.selectDayLongClick.bind(this)}
                selectDayClick={this.selectDayClickHadnle.bind(this)}
              ></Picker>
            </Collapse.Item>
          </Collapse>
          <Event
            loading={this.state.componentLoading}
            selectedDay={this.state.selectedDay}
            calendars={this.props.calendars}
            calendarComponents={this.state.calendarComponents}
            componentRefreshOpen={this.state.componentRefreshOpen}
            refreshComponent={this.componentRefresh.bind(this)}
            viewComponent={this.viewComponent.bind(this)}
          ></Event>
        </CommonMain>
        <View className='vi-index_home-fab' style={{ bottom: process.env.TARO_ENV === 'h5' ? '80px' : '20px' }}>
          {this.props.accessToken && <Button shape='round' variant='contained' color='primary' icon={<Plus />} onClick={this.createComponent.bind(this)} />}
        </View>
        <CaldavList
          hasLogin={!!this.props.accessToken}
          open={this.state.popOpen}
          closePopup={this.closePopup.bind(this)}
          calendars={this.props.calendars}
          selected={this.calendarSelected.bind(this)}
        ></CaldavList>

        {this.state.selectedDay !== day.current && (
          <View
            className='vi-index_today-icon'
            style={process.env.TARO_ENV === 'weapp' ? `bottom:10px` : `bottom: 80px`}
            onClick={this.currentClickHandle.bind(this)}
          >
            今
          </View>
        )}
      </Fragment>
    )
  }
}

export default Index
