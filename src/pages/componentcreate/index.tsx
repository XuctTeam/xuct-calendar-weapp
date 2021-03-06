/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-21 21:16:30
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-02 20:33:59
 */
import Taro from '@tarojs/taro'
import { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import dayjs, { Dayjs } from 'dayjs'
import { View } from '@tarojs/components'
import Router, { NavigateType } from 'tarojs-router-next'
import { Cell, Switch, Button, Grid, Textarea } from '@taroify/core'
import {
  Arrow,
  ClockOutlined,
  FriendsOutlined,
  LocationOutlined,
  BulbOutlined,
  PhotoOutlined,
  Replay,
  Description,
  Cross,
  ManagerOutlined
} from '@taroify/icons'

import { DvaProps, IUserInfo } from '~/../@types/dva'
import { DatetimePickerType } from '@taroify/core/datetime-picker/datetime-picker.shared'
import { IDavCalendar, IDavComponent } from '~/../@types/calendar'
import { add, getById, queryComponentMemberIds } from '@/api/component'
import { toast, back } from '@/utils/taro'
import { formatRepeatTime, fiveMinutes, formatAlarmText, alarmTypeToCode } from '@/utils/utils'

import CommonMain from '@/components/mixin'
import IconFont from '@/components/iconfont'
import { SelectCalendar, Picker, Time, CalendarAction, RepeatPicker } from './ui'
import { action } from './actionCreater'

import './index.scss'

interface ModelProps extends DvaProps {
  calendars: Array<IDavCalendar>
  userInfo: IUserInfo
}

type PageDispatchProps = {
  listSync: (payload) => Promise<any>
  refreshTime: (time: number) => void
}

type PageOwnProps = {}

type PageStateProps = {
  edit: boolean
  id?: string
  title: string
  creatorMemberId: string
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
  ({ calendar, common }) => ({
    calendars: calendar.calendars,
    userInfo: common.userInfo
  }),
  (dispatch) => bindActionCreators(action, dispatch)
)
class Components extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      id: '',
      title: '????????????',
      summary: '',
      creatorMemberId: '',
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
    //??????
    if (paramEdit && componentId) {
      this._updateComponent(componentId, component)
      return
    }
    this._createComponent(this.props.calendars, selectedDay)
    return
  }

  /**
   * @description ????????????
   * @param componentId
   * @param component
   */
  _updateComponent = async (componentId: string, component: IDavComponent | null) => {
    if (component) {
      if (!component.memberIds) {
        component.memberIds = []
      }
      this._setUpdateComponent(this.props.calendars, component)
      return
    }
    getById(componentId).then((res) => {
      const comp: IDavComponent = res as any as IDavComponent
      if (!comp) return
      comp.memberIds = []
      queryComponentMemberIds(comp.id)
        .then((rs) => {
          comp.memberIds = rs as any as string[]
          this._setUpdateComponent(this.props.calendars, comp)
        })
        .catch((err) => {
          console.log(err)
          this._setUpdateComponent(this.props.calendars, comp)
        })
    })
  }

  /**
   * @description ?????????????????????
   * @param calendars
   * @param selectedDay
   */
  _createComponent = (calendars: Array<IDavCalendar>, selectedDay: Date) => {
    if (!selectedDay) {
      selectedDay = dayjs().toDate()
    }
    selectedDay = fiveMinutes(selectedDay)
    if (calendars.length === 0) {
      new Promise((resolve) => {
        this.props.listSync({ resolve })
      }).then((res) => {
        this._initCreateComponent(res as any as Array<IDavCalendar>, selectedDay)
      })
      return
    }
    this._initCreateComponent(calendars, selectedDay)
  }

  _initCreateComponent = (calendars: Array<IDavCalendar>, selectedDay: Date) => {
    const majorCalendar = calendars.find((i) => i.major === 1)
    const data = {
      selectedCalendar: majorCalendar,
      dtstart: dayjs(selectedDay).toDate(),
      dtend: dayjs(selectedDay).add(1, 'hour').toDate(),
      alarmType: this.state.alarmType,
      alarmTimes: this.state.alarmTimes,
      creatorMemberId: this.props.userInfo.id
    }
    if (majorCalendar) {
      data.alarmType = majorCalendar.alarmType + ''
      data.alarmTimes.push(majorCalendar.alarmTime + '')
    }
    this.setState(data)
  }

  /**
   * @description ?????????????????????
   * @param calendars
   * @param component
   */
  _setUpdateComponent = async (calendars: Array<IDavCalendar>, component: IDavComponent) => {
    Taro.setNavigationBarTitle({
      title: '????????????'
    })
    if (calendars.length === 0) {
      new Promise((resolve) => {
        this.props.listSync({ resolve })
      }).then((res) => {
        this._initUpdateComponent(res as any as Array<IDavCalendar>, component)
      })
      return
    }
    this._initUpdateComponent(calendars, component)
  }

  _initUpdateComponent = (calendars: Array<IDavCalendar>, component: IDavComponent) => {
    const majorCalendar = calendars.find((i) => i.calendarId === component.calendarId)
    this.setState({
      ...component,
      dtstart: dayjs(component.dtstart).toDate(),
      dtend: dayjs(component.dtend).toDate(),
      selectedCalendar: majorCalendar,
      title: '????????????',
      alarmType: alarmTypeToCode(component.alarmType),
      alarmTimes: component.alarmTimes ? component.alarmTimes.split(',') : [],
      pickDateType: component.fullDay === 1 ? 'date' : 'date-minute',
      repeatStatus: component.repeatStatus + '',
      repeatUntil: component.repeatUntil ? dayjs(component.repeatUntil).toDate() : null,
      edit: true
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
   * ??????????????????
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
   * ????????????
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
   * ????????????
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
   * ??????????????????
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

  repeatUntilChage = (date: Date) => {
    this.setState({
      repeatUntil: date,
      repeatPickerOpen: false
    })
  }

  /**
   * ??????????????????
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
      if (!alarmType || !alarmTimes) return
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
      toast({ title: '??????????????????' })
      return
    }
    if (!this.state.selectedCalendar) {
      toast({ title: '????????????????????????' })
      return
    }

    if (this.state.repeatStatus !== '0' && !this.state.repeatUntil) {
      toast({ title: '????????????????????????' })
      return
    }
    const start: Dayjs = dayjs(this.state.dtstart)
    const end: Dayjs = dayjs(this.state.dtend)
    if (end.isBefore(start)) {
      toast({ title: '??????????????????????????????' })
      return
    }
    if (end.diff(start) < 3600) {
      toast({ title: '?????????????????????1??????' })
      return
    }
    const that = this
    const addOrUpdateComponent = {
      id: this.state.id,
      summary: this.state.summary,
      calendarId: this.state.selectedCalendar.calendarId,
      creatorMemberId: this.state.creatorMemberId,
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
      alarmTimes: this.state.alarmTimes,
      memberIds: this.state.memberIds
    }
    add(addOrUpdateComponent)
      .then((res) => {
        addOrUpdateComponent.id = res as any as string
        //?????????????????????
        this.props.refreshTime(dayjs().unix())
        that.routeToBack(addOrUpdateComponent)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  routeToBack = (data) => {
    Taro.showToast({
      title: this.state.edit ? '????????????' : '????????????',
      icon: 'success',
      duration: 2000
    })

    if (this.state.edit) {
      back({ to: 1, data: { ...data, color: this.state.selectedCalendar?.color, calendarName: this.state.selectedCalendar?.name, edit: true } })
      return
    }
    Router.toComponentview({
      params: {
        componentId: data.id,
        add: true
      }
    })
  }

  /**
   * ???????????????
   */
  selectedMembers = async () => {
    try {
      const result = await Router.toComponentmembers({
        data: {
          memberIds: this.state.memberIds
        }
      })
      if (!result) return
      const { memberIds } = result
      if (!memberIds) return
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
        <CommonMain className='vi-component-wrapper' title={this.state.title} to={this.state.edit ? 5 : 1} fixed left data={{ componentId: this.state.id }}>
          <View className='vi-component-wrapper_container'>
            <View className='summary'>
              <Textarea
                placeholder='??????????????????'
                maxlength={120}
                value={this.state.summary}
                style={{ width: '100%', height: '40px' }}
                limit={120}
                autoFocus
                onInput={(e) =>
                  this.setState({
                    summary: e.detail.value
                  })
                }
              />
            </View>
            <View className='content'>
              <View className='item'>
                <Cell icon={<ClockOutlined />} bordered={false} align='center' title='??????' size='large'>
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
                  <Cell icon={<LocationOutlined />} rightIcon={<Cross onClick={() => this.setState({ location: '' })} />} clickable>
                    {this.state.location}
                  </Cell>
                ) : (
                  <></>
                )}
                {this.state.memberIds.length !== 0 ? (
                  <Cell icon={<ManagerOutlined />} title='?????????'>
                    {this.props.userInfo ? this.props.userInfo.name : '1111'}
                  </Cell>
                ) : (
                  <Fragment></Fragment>
                )}
                <Cell
                  icon={<FriendsOutlined />}
                  title={this.state.memberIds.length !== 0 ? `????????????${this.state.memberIds.length}??????` : '???????????????'}
                  clickable
                  size='large'
                  onClick={this.selectedMembers.bind(this)}
                ></Cell>
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
                      title={!this.state.repeatUntil ? '??????????????????' : ''}
                      onClick={() => {
                        this.setState({
                          repeatPickerOpen: true
                        })
                      }}
                      rightIcon={
                        <Cross
                          onClick={(e) => {
                            e.stopPropagation()
                            this.setState({
                              repeatUntil: null
                            })
                          }}
                        />
                      }
                    >
                      {this.state.repeatUntil ? dayjs(this.state.repeatUntil).format('YYYY???MM???DD???') + ' ????????????' : ''}
                    </Cell>
                  </>
                ) : (
                  <></>
                )}
                <Cell icon={<BulbOutlined />} rightIcon={<Arrow />} size='large' clickable onClick={this.alarmChage.bind(this)}>
                  {formatAlarmText(this.state.alarmType, this.state.alarmTimes)}
                </Cell>
                {this.state.description ? (
                  <Cell size='large' icon={<Description />} rightIcon={<Cross onClick={() => this.setState({ description: '' })} />} clickable>
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
                    title={this.state.selectedCalendar ? this.state.selectedCalendar.name : '?????????'}
                  ></SelectCalendar>
                </Cell>
              </View>
              <View>
                <Grid columns={4} square>
                  {this.state.repeatStatus === '0' ? <Grid.Item icon={<Replay />} text='??????' onClick={this.openRepet.bind(this)} /> : <></>}
                  {!this.state.location ? <Grid.Item icon={<LocationOutlined />} text='??????' onClick={this.openChooseLocation.bind(this)} /> : <></>}
                  {!this.state.description ? <Grid.Item icon={<Description />} text='??????' onClick={this.openDesc.bind(this)} /> : <></>}
                  <Grid.Item icon={<PhotoOutlined />} text='??????' />
                </Grid>
              </View>
            </View>
          </View>
          <View className='vi-component-wrapper_button'>
            <Button color='success' block onClick={this.addComponent.bind(this)}>
              ??????
            </Button>
          </View>
        </CommonMain>

        <Picker
          title='????????????'
          type={1}
          dataType={this.state.pickDateType}
          selected={this.state.dtstart}
          open={this.state.pickDtStartOpen}
          minDate={today}
          pickSelectedHandler={this.pickSelectedHandler.bind(this)}
          closeHandler={this.pickCloseHandler.bind(this)}
        ></Picker>

        <Picker
          title='????????????'
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
          calendars={this.props.calendars.filter((item) => item.createMemberId === this.props.userInfo.id)}
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
          closeHanler={() => {
            this.setState({
              repeatPickerOpen: false
            })
          }}
          confirmHandler={this.repeatUntilChage.bind(this)}
          minDate={this.state.dtend}
        ></RepeatPicker>
      </Fragment>
    )
  }
}

export default Components
