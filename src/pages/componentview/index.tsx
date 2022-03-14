/*
 * @Description: 日程详情
 * @Author: Derek Xu
 * @Date: 2022-01-10 18:00:51
 * @LastEditTime: 2022-03-14 22:31:19
 * @LastEditors: Derek Xu
 */
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { ActionSheet, Button, Backdrop, Loading, Cell } from '@taroify/core'
import { Ellipsis, ClockOutlined, BulbOutlined, FriendsOutlined, ManagerOutlined } from '@taroify/icons'
import { IDavComponent } from '~/../@types/calendar'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import CommonMain from '@/components/mixin'
import ButtonGroup, { ButtonOption } from '@/components/buttongroup'
import { getById, deleteById, queryComponentMemberIds } from '@/api/component'
import { getName } from '@/api/user'
import { formatSameDayTime, formateSameDayDuration, formatDifferentDayTime, formatAlarmText, alarmTypeToCode, alarmCodeToType } from '@/utils/utils'
import { back, useSystemInfo, useModal, useClipboardData, useToast } from '@/utils/taro'
import { SameDay, DifferentDay, ShareUser, Qrcode, WeappShare } from './ui'

import './index.scss'

interface IPageStateProps {
  open: boolean
  component: IDavComponent
}

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
  calendarName: ''
}
const Componentview: React.FC<IPageStateProps> = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const systemInfo = useSystemInfo() || { screenWidth: 0, screenHeight: 0 }
  const [open, setOpen] = useState(false)
  const [alarmType, setAlarmType] = useState('0')
  const [memberName, setMemberName] = useState<string>('')
  const [alarmTimes, setAlarmTimes] = useState<string[]>([])
  const [component, setComponent] = useState<IDavComponent>(defaultComponent)
  const [delLoading, setDelLoading] = useState(false)
  const [expire, setExpire] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [weappShareOpen, setWeappShareOpen] = useState(false)
  const [, { set }] = useClipboardData()
  const [toast] = useToast({
    title: '复制完成'
  })
  const [show] = useModal({
    title: '提示',
    content: '确定删除吗？'
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const data: any = Router.getData()
    if (data) {
      _queryMemberIds(data.component)
      return
    }
    const { componentId } = Router.getParams()
    if (!componentId) return
    getById(componentId).then((res) => {
      _queryMemberIds(res as any as IDavComponent)
      return
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 加载邀请人
   * @param id
   */
  const _queryMemberIds = (comp: IDavComponent) => {
    queryComponentMemberIds(comp.id)
      .then((res) => {
        comp.memberIds = res as any as Array<string>
        _setComponent(comp)
      })
      .catch((err) => {
        console.log(err)
        _setComponent(comp)
      })
  }

  const _setComponent = (comp: IDavComponent) => {
    setComponent(comp)
    if (comp.alarmType) {
      setAlarmType(alarmTypeToCode(comp.alarmType))
    }
    if (comp.alarmTimes) {
      setAlarmTimes(comp.alarmTimes.split(','))
    }
    if (comp.endTime && dayjs(Number.parseInt(comp.endTime)).isBefore(dayjs())) {
      setExpire(true)
    }
    /** 加载组织者姓名 */
    if (comp.memberIds?.length !== 0) {
      if (comp.creatorMemberId === userInfo.id) {
        setMemberName(userInfo.name)
        return
      }
      getName(comp.creatorMemberId).then((res) => {
        setMemberName(res as any as string)
      })
    }
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

  const componentDelete = useCallback(() => {
    setOpen(false)
    show()
      .then((res) => {
        if (res.cancel) return
        setDelLoading(true)
        deleteById(component.id).then(() => {
          dispatch({
            type: 'component/refreshTime',
            payload: dayjs().unix()
          })
          window.setTimeout(() => {
            setDelLoading(false)
            back({ to: 1 })
          }, 300)
        })
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  /**
   * 分享好友
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

  const shareButtonClickHandler = (val: ButtonOption) => {
    console.log(val)
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
        actived={2}
        buttons={[
          { name: '待定', value: '1' },
          { name: '接受', value: '2' },
          { name: '拒绝', value: '3' }
        ]}
        onClick={shareButtonClickHandler}
      ></ButtonGroup>
    )
  }

  return (
    <Fragment>
      <CommonMain className='vi-component-view-wrapper' title='事项详情' to={1} fixed={false} left>
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
              <ClockOutlined size={20} />
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
              <Cell className='attend' icon={<FriendsOutlined size={20} />} title={`共邀请（${component.memberIds.length}）人`} clickable size='large'></Cell>
            </Fragment>
          )}

          <View className='divider'></View>
          <View className='cell-item event-item remind taroify-hairline--bottom'>
            <View className='event-icon'>
              <BulbOutlined size={24}></BulbOutlined>
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
      <ActionSheet open={open} onSelect={() => componentDelete()} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} rounded={false}>
        <ActionSheet.Action value='1' name='删除' />
        <ActionSheet.Button type='cancel'>取消</ActionSheet.Button>
      </ActionSheet>
      <Backdrop open={delLoading} closeable onClose={() => setDelLoading(false)}>
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
        componentId={component.id}
        width={systemInfo.screenWidth - 60}
        height={systemInfo.screenHeight - 160}
      ></Qrcode>
      <WeappShare open={weappShareOpen} onClose={() => setWeappShareOpen(false)} componentTitle={component.summary} componentId={component.id}></WeappShare>
    </Fragment>
  )
}

export default Componentview
