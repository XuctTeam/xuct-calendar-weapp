/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-21 21:16:30
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-09 21:52:49
 */
import Taro from '@tarojs/taro'
import { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import dayjs, { Dayjs } from 'dayjs'
import { View } from '@tarojs/components'
import Router, { NavigateType } from 'tarojs-router-next'
import { Cell, Switch, Button, Grid, Textarea } from '@taroify/core'
import { Arrow, ClockOutlined, FriendsOutlined, LocationOutlined, BulbOutlined, PhotoOutlined, Replay, Description, Cross } from '@taroify/icons'

import { DvaProps } from '~/../@types/dva'
import { DatetimePickerType } from '@taroify/core/datetime-picker/datetime-picker.shared'
import { IDavCalendar, IDavComponent } from '~/../@types/calendar'
import { add, getById } from '@/api/component'
import { toast, back } from '@/utils/taro'
import { formatRepeatTime, fiveMinutes, formatAlarmText, alarmTypeToCode } from '@/utils/utils'

import CommonMain from '@/components/mixin'
import IconFont from '@/components/iconfont'
import { SelectCalendar, Picker, Time, CalendarAction, RepeatPicker } from './ui'
import { action } from './actionCreater'

import './index.scss'

interface ModelProps extends DvaProps {
  calendars: Array<IDavCalendar>
}

type PageDispatchProps = {
  listSync: () => Promise<any>
  refreshTime: (time: number) => void
}

type PageOwnProps = {}

type PageStateProps = {
  edit: boolean
  id?: string
  title: string
  summary: string
  location: string
  description: string
  selectedCalendarOpen: boolean
  selectedCalendar: IDavCalendar | null
  dtstart: Date
  dtend: Date
  fullDay: number
  pickDtStartOpen: boolean
  pickDtEndOpen: boolean
  pickDateType: DatetimePickerType
  repeatStatus: string
  repeatType: string
  repeatByday: string
  repeatBymonth: string
  repeatBymonthday: string
  repeatInterval: number
  repeatPickerOpen: boolean
  repeatUntil: Date | null
  alarmType: string
  alarmTimes: Array<string>
  memberIds: Array<string>
}

type IProps = ModelProps & PageDispatchProps & PageOwnProps

interface Components {
  props: IProps
  state: PageStateProps
}

const today = dayjs().toDate()

const connects: Function = connect

@connects(
  ({ calendar }) => ({
    calendars: calendar.calendars
  }),
  (dispatch) => bindActionCreators(action, dispatch)
)
class Components extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      id: '',
      title: '新建日程',
      summary: '',
      location: '',
      fullDay: 0,
      description: '',
      selectedCalendarOpen: false,
      selectedCalendar: null,
      dtstart: today,
      dtend: dayjs(today).add(1, 'hour').toDate(),
      pickDtStartOpen: false,
      pickDtEndOpen: false,
      pickDateType: 'date-minute',
      repeatStatus: '0',
      repeatType: '',
      repeatByday: '',
      repeatBymonth: '',
      repeatBymonthday: '',
      repeatPickerOpen: false,
      repeatInterval: 1,
      repeatUntil: null,
      alarmType: '0',
      alarmTimes: [],
      memberIds: []
    }
  }

  componentDidMount() {
    const { component, selectedDay } = Router.getData() || { component: undefined }
    const { paramEdit, componentId } = Router.getParams()
    //编辑
    if (paramEdit && componentId) {
      this._updateComponent(componentId, component)
      return
    }
    this._createComponent(this.props.calendars, selectedDay)
    return
  }

  /**
   * @description 更新日程
   * @param componentId
   * @param component
   */
  _updateComponent = async (componentId: string, component: IDavComponent | null) => {
    if (component) {
      this._setUpdateComponent(this.props.calendars, component)
      return
    }
    let calendars = this.props.calendars
    if (calendars.length === 0) {
      calendars = await this.props.listSync()
    }
    getById(componentId).then((res) => {
      this._setUpdateComponent(calendars, res as any as IDavComponent)
    })
    return
  }

  /**
   * @description 新增日程时显示
   * @param calendars
   * @param selectedDay
   */
  _createComponent = async (calendars: Array<IDavCalendar>, selectedDay: Date) => {
    if (!selectedDay) {
      selectedDay = dayjs().toDate()
    }
    selectedDay = fiveMinutes(selectedDay)
    if (calendars.length === 0) {
      calendars = await this.props.listSync()
    }
    const majorCalendar = calendars.find((i) => i.major === 1)
    const data = {
      selectedCalendar: majorCalendar,
      dtstart: dayjs(selectedDay).toDate(),
      dtend: dayjs(selectedDay).add(1, 'hour').toDate(),
      alarmType: this.state.alarmType,
      alarmTimes: this.state.alarmTimes
    }
    if (majorCalendar) {
      data.alarmType = majorCalendar.alarmType + ''
      data.alarmTimes.push(majorCalendar.alarmTime + '')
    }
    this.setState(data)
  }

  /**
   * @description 编辑日程时显示
   * @param calendars
   * @param component
   */
  _setUpdateComponent = async (calendars: Array<IDavCalendar>, component: IDavComponent) => {
    Taro.setNavigationBarTitle({
      title: '日程编辑'
    })
    if (calendars.length === 0) {
      calendars = await this.props.listSync()
    }
    const majorCalendar = calendars.find((i) => i.calendarId === component.calendarId)

    this.setState({
      ...component,
      dtstart: dayjs(component.dtstart).toDate(),
      dtend: dayjs(component.dtend).toDate(),
      selectedCalendar: majorCalendar,
      title: '日程编辑',
      alarmType: alarmTypeToCode(component.alarmType),
      alarmTimes: component.alarmTimes ? component.alarmTimes.split(',') : [],
      pickDateType: component.fullDay === 1 ? 'date' : 'date-minute',
      repeatStatus: component.repeatStatus + '',
      repeatUntil: component.repeatUntil ? dayjs(component.repeatUntil).toDate() : null,
      edit: true
    })
  }

  summaryChage = (value: string) => {
    this.setState({
      summary: value
    })
  }

  openChooseLocation = async () => {
    try {
      const result = await Router.toComponentlocation()
      if (result) {
        this.setState({ location: result.location })
      }
    } catch (err) {
      console.log(err)
    }
  }

  locationChage = () => {
    this.setState({
      location: ''
    })
  }

  descritionChage = () => {
    this.setState({
      description: ''
    })
  }

  fullDayChage = (value: boolean) => {
    this.setState({
      fullDay: value ? 1 : 0,
      pickDateType: value ? 'date' : 'date-minute'
    })
  }

  pickerClickHandler = (type: number) => {
    if (type === 1) {
      this.setState({
        pickDtStartOpen: true
      })
      return
    }
    this.setState({
      pickDtEndOpen: true
    })
  }

  pickCloseHandler = (type: number) => {
    if (type === 1) {
      this.setState({
        pickDtStartOpen: false
      })
      return
    }
    this.setState({
      pickDtEndOpen: false
    })
  }

  pickSelectedHandler = (type: number, date: Date) => {
    if (type === 1) {
      this.setState({
        dtstart: date,
        pickDtStartOpen: false,
        dtend: dayjs(this.state.dtend).isBefore(dayjs(date)) ? dayjs(date).add(1, 'hour').toDate() : this.state.dtend
      })
      return
    }
    this.setState({
      dtstart: dayjs(this.state.dtstart).isAfter(dayjs(date)) ? dayjs(date).subtract(1, 'hour').toDate() : this.state.dtstart,
      dtend: date,
      pickDtEndOpen: false
    })
  }

  /**
   * 选择日历关闭
   */
  selectedCalendarCloseHandler = () => {
    debugger
  }

  /**
   * 选择日历回调
   * @param id
   */
  selectdCalendarSelectHandler = (id: string) => {
    const calendar = this.props.calendars.find((i) => i.id === id)
    this.setState({
      selectedCalendar: calendar,
      selectedCalendarOpen: false,
      alarmType: calendar ? calendar.alarmType + '' : '0',
      alarmTimes: calendar ? [calendar.alarmTime + ''] : []
    })
  }

  /**
   * 选择描述
   */
  openDesc = async () => {
    try {
      const result = await Router.toComponentdesc()
      if (result) {
        this.setState({
          description: result.description
        })
      }
    } catch (err) {
      console.log(err)
      Router.toIndex({ type: NavigateType.switchTab })
    }
  }

  /**
   * 选择循环
   */
  openRepet = async () => {
    try {
      const result = await Router.toComponentrepeat({
        data: {
          selectedDate: this.state.dtstart,
          repeatStatus: this.state.repeatStatus,
          repeatType: this.state.repeatType,
          repeatInterval: this.state.repeatInterval,
          repeatByday: this.state.repeatByday,
          repeatBymonth: this.state.repeatBymonth,
          repeatBymonthday: this.state.repeatBymonthday
        }
      })
      if (result) {
        this.setState({ ...result })
      }
    } catch (err) {
      console.log(err)
      Router.toIndex({ type: NavigateType.switchTab })
    }
  }

  /**
   * 重置循环时间
   */
  closeRepeat = () => {
    this.setState({
      repeatStatus: '0',
      repeatInterval: 1,
      repeatType: '',
      repeatByday: '',
      repeatBymonth: '',
      repeatBymonthday: ''
    })
  }

  /**
   * 循环时间的过期时间
   */
  openRepeatUntil = () => {
    this.setState({
      repeatPickerOpen: true
    })
  }

  repeatPickClose = () => {
    this.setState({
      repeatPickerOpen: false
    })
  }

  repeatUntilChage = (date: Date) => {
    this.setState({
      repeatUntil: date,
      repeatPickerOpen: false
    })
  }

  cleanRepeatUntil = () => {
    this.setState({
      repeatUntil: null
    })
  }

  /**
   * 打开提醒配置
   */
  alarmChage = async () => {
    try {
      const result = await Router.toComponentalarm({
        data: {
          alarmType: this.state.alarmType,
          alarmTimes: this.state.alarmTimes
        }
      })
      if (!result) return
      const { alarmType, alarmTimes } = result
      this.setState({
        alarmType,
        alarmTimes
      })
    } catch (err) {
      console.log(err)
    }
  }

  addComponent = () => {
    if (!this.state.summary) {
      toast({ title: '标题不能为空' })
      return
    }
    if (!this.state.selectedCalendar) {
      toast({ title: '选择日历不能为空' })
      return
    }

    if (this.state.repeatStatus !== '0' && !this.state.repeatUntil) {
      toast({ title: '循环日期不能为空' })
      return
    }
    const start: Dayjs = dayjs(this.state.dtstart)
    const end: Dayjs = dayjs(this.state.dtend)
    if (end.isBefore(start)) {
      toast({ title: '结束时间小于开始时间' })
      return
    }
    if (end.diff(start) < 3600) {
      toast({ title: '时间范围应大于1小时' })
      return
    }
    const that = this
    const addOrUpdateComponent = {
      id: this.state.id,
      summary: this.state.summary,
      calendarId: this.state.selectedCalendar.calendarId,
      location: this.state.location,
      description: this.state.description,
      dtstart: this.state.dtstart,
      dtend: this.state.dtend,
      fullDay: this.state.fullDay,
      repeatStatus: this.state.repeatStatus,
      repeatType: this.state.repeatType,
      repeatInterval: this.state.repeatInterval,
      repeatByday: this.state.repeatByday,
      repeatBymonth: this.state.repeatBymonth,
      repeatBymonthday: this.state.repeatBymonthday,
      repeatUntil: this.state.repeatUntil,
      alarmType: this.state.alarmType,
      alarmTimes: this.state.alarmTimes
    }
    add(addOrUpdateComponent)
      .then((res) => {
        addOrUpdateComponent.id = res as any as string
        //要刷新首页列表
        this.props.refreshTime(dayjs().unix())
        that.routeToBack(addOrUpdateComponent)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  routeToBack = (data) => {
    Taro.showToast({
      title: this.state.edit ? '编辑成功' : '新增成功',
      icon: 'success',
      duration: 2000
    })

    if (this.state.edit) {
      back({ to: 1, data: { ...data, color: this.state.selectedCalendar?.color, calendarName: this.state.selectedCalendar?.name, edit: true } })
      return
    }
    Router.navigate({ url: '/pages/componentview/index' }, { type: NavigateType.redirectTo, params: { componentId: data.id } })
  }

  /**
   * 选择参会者
   */
  selectedMembers = async () => {
    try {
      const result = await Router.toComponentmembers({
        data: {
          memberIds: this.state.memberIds
        }
      })
      if (!result) return
      const memberIds = { result }
      this.setState({
        memberIds: memberIds
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <Fragment>
        <CommonMain className='vi-component-wrapper' title={this.state.title} to={this.state.edit ? 3 : 1} fixed left data={{ componentId: this.state.id }}>
          <View className='vi-component-wrapper_container'>
            <View className='summary'>
              <Textarea
                placeholder='输入日程标题'
                maxlength={120}
                value={this.state.summary}
                style={{ width: '100%', height: '40px' }}
                limit={120}
                autoFocus
                onInput={(e) => this.summaryChage(e.detail.value)}
              />
            </View>
            <View className='content'>
              <View className='item'>
                <Cell icon={<ClockOutlined />} bordered={false} align='center' title='全天' size='large'>
                  <Switch size={24} checked={this.state.fullDay === 1} onChange={this.fullDayChage.bind(this)} />
                </Cell>
                <Cell className='picker'>
                  <View className='cell' onClick={this.pickerClickHandler.bind(this, 1)}>
                    <Time time={this.state.dtstart} fullDay={this.state.fullDay}></Time>
                  </View>
                  <View>
                    <IconFont name='jiantou' size={60}></IconFont>
                  </View>
                  <View className='cell' onClick={this.pickerClickHandler.bind(this, 2)}>
                    <Time time={this.state.dtend} fullDay={this.state.fullDay}></Time>
                  </View>
                </Cell>
                {this.state.location ? (
                  <Cell icon={<LocationOutlined />} rightIcon={<Cross onClick={this.locationChage.bind(this)} />} clickable>
                    {this.state.location}
                  </Cell>
                ) : (
                  <></>
                )}
                <Cell icon={<FriendsOutlined />} title='添加参与者' clickable size='large' onClick={this.selectedMembers.bind(this)}></Cell>
                {this.state.repeatStatus !== '0' ? (
                  <>
                    <Cell
                      size='large'
                      icon={<Replay></Replay>}
                      onClick={this.openRepet.bind(this)}
                      rightIcon={
                        <Cross
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            this.closeRepeat()
                          }}
                        />
                      }
                    >
                      {formatRepeatTime(
                        this.state.repeatType,
                        this.state.repeatStatus,
                        this.state.repeatByday,
                        this.state.repeatBymonth,
                        this.state.repeatBymonthday,
                        this.state.repeatInterval
                      )}
                    </Cell>
                    <Cell
                      size='large'
                      className='vi-component-wrapper_repeat-until'
                      clickable
                      title={!this.state.repeatUntil ? '选择结束时间' : ''}
                      onClick={this.openRepeatUntil.bind(this)}
                      rightIcon={
                        <Cross
                          onClick={(e) => {
                            e.stopPropagation()
                            this.cleanRepeatUntil()
                          }}
                        />
                      }
                    >
                      {this.state.repeatUntil ? dayjs(this.state.repeatUntil).format('YYYY年MM月DD日') + ' 结束重复' : ''}
                    </Cell>
                  </>
                ) : (
                  <></>
                )}
                <Cell icon={<BulbOutlined />} rightIcon={<Arrow />} size='large' clickable onClick={this.alarmChage.bind(this)}>
                  {formatAlarmText(this.state.alarmType, this.state.alarmTimes)}
                </Cell>
                {this.state.description ? (
                  <Cell size='large' icon={<Description />} rightIcon={<Cross onClick={this.descritionChage.bind(this)} />} clickable>
                    {this.state.description}
                  </Cell>
                ) : (
                  <></>
                )}
              </View>
              <View className='calendar'>
                <Cell rightIcon={<Arrow />} size='large' clickable onClick={() => this.setState({ selectedCalendarOpen: true })}>
                  <SelectCalendar
                    color={this.state.selectedCalendar ? this.state.selectedCalendar.color : '2eb82e'}
                    title={this.state.selectedCalendar ? this.state.selectedCalendar.name : '无日历'}
                  ></SelectCalendar>
                </Cell>
              </View>
              <View>
                <Grid columns={4} square>
                  {this.state.repeatStatus === '0' ? <Grid.Item icon={<Replay />} text='重复' onClick={this.openRepet.bind(this)} /> : <></>}
                  {!this.state.location ? <Grid.Item icon={<LocationOutlined />} text='地点' onClick={this.openChooseLocation.bind(this)} /> : <></>}
                  {!this.state.description ? <Grid.Item icon={<Description />} text='备注' onClick={this.openDesc.bind(this)} /> : <></>}
                  <Grid.Item icon={<PhotoOutlined />} text='附件' />
                </Grid>
              </View>
            </View>
          </View>
          <View className='vi-component-wrapper_button'>
            <Button color='success' block onClick={this.addComponent.bind(this)}>
              保存
            </Button>
          </View>
        </CommonMain>

        <Picker
          title='开始时间'
          type={1}
          dataType={this.state.pickDateType}
          selected={this.state.dtstart}
          open={this.state.pickDtStartOpen}
          pickSelectedHandler={this.pickSelectedHandler.bind(this)}
          closeHandler={this.pickCloseHandler.bind(this)}
        ></Picker>

        <Picker
          title='结束时间'
          type={2}
          open={this.state.pickDtEndOpen}
          dataType={this.state.pickDateType}
          selected={this.state.dtend}
          minDate={this.state.dtstart}
          pickSelectedHandler={this.pickSelectedHandler.bind(this)}
          closeHandler={this.pickCloseHandler.bind(this)}
        ></Picker>

        <CalendarAction
          open={this.state.selectedCalendarOpen}
          calendars={this.props.calendars}
          selectedHandler={this.selectdCalendarSelectHandler.bind(this)}
          closeHandler={() => {
            this.setState({
              selectedCalendarOpen: false
            })
          }}
        ></CalendarAction>

        <RepeatPicker
          open={this.state.repeatPickerOpen}
          selectedDate={this.state.repeatUntil}
          closeHanler={this.repeatPickClose.bind(this)}
          confirmHandler={this.repeatUntilChage.bind(this)}
          minDate={this.state.dtend}
        ></RepeatPicker>
      </Fragment>
    )
  }
}

export default Components
