/*
 * @Description: 日程详情
 * @Author: Derek Xu
 * @Date: 2022-01-10 18:00:51
 * @LastEditTime: 2022-04-18 17:06:18
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { throttle } from 'lodash/function'
import { ActionSheet, Button, Backdrop, Loading, Cell } from '@taroify/core'
import { Ellipsis, ClockOutlined, BulbOutlined, FriendsOutlined, ManagerOutlined } from '@taroify/icons'
import { IDavComponent } from '~/../@types/calendar'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import CommonMain from '@/components/mixin'
import ButtonGroup, { ButtonOption } from '@/components/buttongroup'
import { getById, deleteById, queryComponentMemberIds, getAttendStatus, updateAttendStatus, refuseAttend } from '@/api/component'
import { getName } from '@/api/user'
import { formatSameDayTime, formateSameDayDuration, formatDifferentDayTime, formatAlarmText, alarmTypeToCode, alarmCodeToType } from '@/utils/utils'
import { back } from '@/utils/taro'
import { useSystemInfo, useModal, useClipboardData, useToast } from 'taro-hooks'
import { SameDay, DifferentDay, ShareUser, Qrcode, WeappShare } from './ui'

import './index.scss'

const defaultComponent: IDavComponent = {
  id: '',
  calendarId: '',
  creatorMemberId: '',
  location: '',
  fullDay: 0,
  dtstart: dayjs().toDate(),
  dtend: dayjs().toDate(),
  description: '',
  summary: '',
  status: '',
  alarmType: '0',
  color: 'fff',
  calendarName: '',
  attendStatus: 0
}
const Componentview: FunctionComponent = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const dispatch = useDispatch()
  const systemInfo = useSystemInfo() || { screenWidth: 0, screenHeight: 0 }
  const [addFlag, setAddFlag] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(true)
  const [open, setOpen] = useState(false)
  const [alarmType, setAlarmType] = useState('0')
  const [memberName, setMemberName] = useState<string>('')
  const [alarmTimes, setAlarmTimes] = useState<string[]>([])
  const [component, setComponent] = useState<IDavComponent>(defaultComponent)
  const [expire, setExpire] = useState<boolean>(false)
  const [shareOpen, setShareOpen] = useState<boolean>(false)
  const [qrOpen, setQrOpen] = useState<boolean>(false)
  const [weappShareOpen, setWeappShareOpen] = useState<boolean>(false)
  const [attendStatus, setAttendStatus] = useState<number>(0)
  const [, { set }] = useClipboardData()
  const [toast] = useToast({
    title: '复制完成'
  })
  const [show] = useModal({
    title: '提示',
    content: '确定删除吗？'
  })

  useEffect(() => {
    const data: any = Router.getData()
    const { componentId, add } = Router.getParams()
    if (add) {
      setAddFlag(add as any as boolean)
    }
    if (data) {
      _queryMemberIds(data.component)
      return
    }

    if (!componentId) return
    getById(componentId)
      .then((res) => {
        _queryMemberIds(res as any as IDavComponent)
        return
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 加载邀请人
   * @param id
   */
  const _queryMemberIds = (comp: IDavComponent) => {
    setLoading(true)
    queryComponentMemberIds(comp.id)
      .then((res) => {
        comp.memberIds = res as any as Array<string>
        _setComponent(comp)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        _setComponent(comp)
        setLoading(false)
      })
  }

  const _setComponent = (comp: IDavComponent) => {
    setComponent({ ...comp })
    if (comp.alarmType) {
      setAlarmType(alarmTypeToCode(comp.alarmType))
    }
    if (comp.alarmTimes) {
      setAlarmTimes(comp.alarmTimes.split(','))
    }
    if (comp.endTime && dayjs(Number.parseInt(comp.endTime)).isBefore(dayjs())) {
      setExpire(true)
    }
    if (comp.creatorMemberId === userInfo.id) {
      setMemberName(userInfo.name)
      return
    }
    /**加载组织者 */
    if (comp.memberIds?.length !== 0) {
      getName(comp.creatorMemberId).then((res) => {
        setMemberName(res as any as string)
      })
    }
    /** 加载邀请状态 */
    getAttendStatus(comp.id)
      .then((res) => {
        setAttendStatus(res as any as number)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**
   * @description 编辑事件
   */
  const componentEdit = async () => {
    const result = await Router.toComponentcreate({
      params: {
        componentId: component.id,
        paramEdit: 1
      },
      data: {
        component: component
      }
    })
    if (result && result.edit) {
      _setComponent({ ...result, alarmType: alarmCodeToType(result.alarmType), alarmTimes: result.alarmTimes.join(',') })
    }
  }

  const componentDelete = useCallback(
    (id: string) => {
      setOpen(false)
      show().then((res) => {
        if (res.cancel) return
        _deleteComponent(1, id)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [show]
  )

  /**
   * 分享好友
   * @param data
   * @returns
   */
  const shareSelected = (data: any) => {
    setShareOpen(false)
    if (!data.value) return
    const { value } = data
    if (value === '3') {
      setQrOpen(true)
    } else if (value === '2') {
      set(getShareTitle()).then(() => {
        toast()
      })
    } else if (value === '1') {
      setWeappShareOpen(true)
    }
  }

  const getShareTitle = () => {
    const title =
      `【楚日历】日程邀请` +
      '\r' +
      `标题：` +
      component.summary +
      '\r' +
      `时间：` +
      (dayjs(component.dtstart).isSame(component.dtend, 'date')
        ? formatSameDayTime(component.fullDay, component.dtstart, component.dtend) +
          ' ' +
          formateSameDayDuration(component.fullDay, component.dtstart, component.dtend)
        : formatDifferentDayTime(1, component.fullDay, component.dtstart) + '\r' + formatDifferentDayTime(2, component.fullDay, component.dtend)) +
      '\r' +
      `点击加入日程`
    return title
  }

  /**
   * 更新邀请状态
   * @param val
   * @returns
   */
  const shareButtonClickHandler = (val: ButtonOption) => {
    if (val.value === '2') {
      show({
        content: '确定拒绝吗？'
      }).then((res) => {
        if (res.cancel) {
          setAttendStatus(attendStatus)
          return
        }
        _deleteComponent(2, component.id)
      })
      return
    }
    setAttendStatus(Number.parseInt(val.value))
    updateAttendStatus(component.id, Number.parseInt(val.value))
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const buttonViews = (): JSX.Element => {
    if (!component || !component.creatorMemberId) return <Fragment></Fragment>
    if (userInfo.id === component.creatorMemberId) {
      return (
        <Button color='warning' disabled={expire} onClick={() => componentEdit()}>
          编辑
        </Button>
      )
    }
    return (
      <ButtonGroup
        actived={attendStatus}
        buttons={[
          { name: '待定', value: '0' },
          { name: '接受', value: '1' },
          { name: '拒绝', value: '2' }
        ]}
        onClick={shareButtonClickHandler}
      ></ButtonGroup>
    )
  }

  const viewMembersHandler = throttle(
    () => {
      Router.toComponentmembersview({
        params: {
          componentId: component.id,
          creatorMemberId: component.creatorMemberId
        }
      })
    },
    800,
    { trailing: false }
  )

  /**
   * 删除事件
   */
  const _deleteComponent = (ty: number, id: string) => {
    setLoading(true)
    if (ty === 1) {
      deleteById(id)
        .then(() => {
          _deleteSuccess()
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
      return
    }
    refuseAttend(id)
      .then(() => {
        _deleteSuccess()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const _deleteSuccess = () => {
    setLoading(false)
    dispatch({
      type: 'component/refreshTime',
      payload: dayjs().unix()
    })
    window.setTimeout(() => {
      setLoading(false)
      back({ to: 1 })
    }, 500)
  }

  return (
    <Fragment>
      <CommonMain className='vi-component-view-wrapper' title='事项详情' to={1} fixed={false} left delta={addFlag ? 2 : 1}>
        <View className='vi-component-view-wrapper_content'>
          <View className='cell-item summary-calendar-more taroify-hairline--bottom'>
            <View className='event-label' style={{ color: `#${component.color}`, background: `#${component.color}` }}></View>
            <View className='event-content'>
              <View className='summary-calendar'>
                <View className='summary'>{component.summary}</View>
                <View className='calendar-source'>
                  <View className='calendar'>{component.calendarName}</View>
                </View>
              </View>
              {userInfo.id === component.creatorMemberId && (
                <Fragment>
                  <Ellipsis onClick={() => setOpen(true)}></Ellipsis>
                </Fragment>
              )}
            </View>
          </View>
          <View className='cell-item time-repeat taroify-hairline--bottom'>
            <View className='event-icon'>
              <ClockOutlined />
            </View>
            <View className='event-content'>
              {dayjs(component.dtstart).isSame(component.dtend, 'date') ? (
                <SameDay dtstart={component.dtstart} dtend={component.dtend} fullDay={component.fullDay}></SameDay>
              ) : (
                <DifferentDay
                  dtstart={component.dtstart}
                  dtend={component.dtend}
                  fullDay={component.fullDay}
                  repeatStatus={component.repeatStatus}
                  repeatType={component.repeatType}
                  repeatByday={component.repeatByday}
                  repeatBymonth={component.repeatBymonth}
                  repeatBymonthday={component.repeatBymonthday}
                  repeatInterval={component.repeatInterval}
                ></DifferentDay>
              )}
            </View>
          </View>
          {component.memberIds && component.memberIds.length !== 0 && (
            <Fragment>
              <Cell size='large' className='attend' title='组织者' icon={<ManagerOutlined size={20} />}>
                {memberName}
              </Cell>
              <Cell
                className='attend'
                icon={<FriendsOutlined size={20} />}
                title={`共邀请（${component.memberIds.length}）人`}
                clickable
                size='large'
                onClick={viewMembersHandler}
                bordered={false}
              ></Cell>
            </Fragment>
          )}
          <View className='divider'></View>
          <View className='cell-item event-item remind taroify-hairline--bottom'>
            <View className='event-icon'>
              <BulbOutlined size={20} />
            </View>
            <View className='event-content'>{formatAlarmText(alarmType, alarmTimes)}</View>
          </View>
        </View>
        <View className='vi-component-view-wrapper_button'>
          <View className='attend'>{buttonViews()}</View>
          <View className='share'>
            <Button color='success' onClick={() => setShareOpen(true)}>
              分享好友
            </Button>
          </View>
        </View>
      </CommonMain>
      <ActionSheet open={open} onSelect={() => componentDelete(component.id)} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} rounded={false}>
        <ActionSheet.Action value='1' name='删除' />
        <ActionSheet.Button type='cancel'>取消</ActionSheet.Button>
      </ActionSheet>
      <Backdrop open={loading} closeable onClose={() => setLoading(false)}>
        <View className='content-wrapper'>
          <View className='content-block'>
            <Loading type='spinner'>加载中...</Loading>
          </View>
        </View>
      </Backdrop>
      <ShareUser open={shareOpen} close={() => setShareOpen(false)} selected={shareSelected}></ShareUser>
      <Qrcode
        open={qrOpen}
        close={() => setQrOpen(false)}
        summary={component.summary}
        location={component.location}
        componentId={component.id}
        width={systemInfo.screenWidth - 60}
        height={systemInfo.screenHeight - 160}
      ></Qrcode>
      <WeappShare open={weappShareOpen} onClose={() => setWeappShareOpen(false)} componentTitle={component.summary} componentId={component.id}></WeappShare>
    </Fragment>
  )
}

export default Componentview
