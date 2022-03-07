/*
 * @Description: 日程详情
 * @Author: Derek Xu
 * @Date: 2022-01-10 18:00:51
 * @LastEditTime: 2022-03-07 17:07:50
 * @LastEditors: Derek Xu
 */
import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { ActionSheet, Button, Flex, Backdrop, Loading } from '@taroify/core'
import { Ellipsis, ClockOutlined, BulbOutlined } from '@taroify/icons'
import dayjs from 'dayjs'
import { IDavComponent } from '~/../@types/calendar'
import CommonMain from '@/components/mixin'
import { getById, deleteById } from '@/api/component'
import { formatSameDayTime, formateSameDayDuration, formatDifferentDayTime, formatAlarmText, alarmTypeToCode, alarmCodeToType } from '@/utils/utils'
import { back } from '@/utils/taro'
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
  const [open, setOpen] = useState(false)
  const [alarmType, setAlarmType] = useState('0')
  const [alarmTimes, setAlarmTimes] = useState<string[]>([])
  const [component, setComponent] = useState<IDavComponent>(defaultComponent)
  const [delLoading, setDelLoading] = useState(false)
  const [expire, setExpire] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [weappShareOpen, setWeappShareOpen] = useState(false)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    const sys = Taro.getSystemInfoSync()
    setWidth(sys.screenWidth)
    setHeight(sys.screenHeight)

    const data: any = Router.getData()
    if (data) {
      _setComponent(data.component)
      return
    }
    const { componentId } = Router.getParams()
    if (!componentId) return
    getById(componentId).then((res) => {
      _setComponent(res as any as IDavComponent)
      return
    })
  }, [])

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

  const componentDelete = () => {
    setOpen(false)
    Taro.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

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
      Taro.setClipboardData({
        data: getShareTitle(),
        success: function () {
          Taro.showToast({
            title: '复制完成'
          })
        }
      })
    } else if (value === '1') {
      setWeappShareOpen(true)
    }
  }

  const shareClose = () => {
    setShareOpen(false)
  }

  const setQrOpenClose = () => {
    setQrOpen(false)
  }

  const setWeappShareClose = () => {
    setWeappShareOpen(false)
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
              <View>
                <Ellipsis onClick={() => setOpen(true)}></Ellipsis>
              </View>
            </View>
          </View>
          <View className='cell-item time-repeat'>
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
          <View className='divider'></View>
          <View className='cell-item event-item remind taroify-hairline--bottom'>
            <View className='event-icon'>
              <BulbOutlined size={24}></BulbOutlined>
            </View>
            <View className='event-content'>{formatAlarmText(alarmType, alarmTimes)}</View>
          </View>
        </View>
        <View className='vi-component-view-wrapper_button'>
          <Flex gutter={10}>
            <Flex.Item span={12}>
              <Button color='warning' size='large' disabled={expire} onClick={() => componentEdit()}>
                编辑
              </Button>
            </Flex.Item>
            <Flex.Item span={12}>
              <Button color='success' size='large' onClick={() => setShareOpen(true)}>
                分享好友
              </Button>
            </Flex.Item>
          </Flex>
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
      <ShareUser open={shareOpen} close={shareClose} selected={shareSelected}></ShareUser>
      <Qrcode open={qrOpen} close={setQrOpenClose} componentId={component.id} width={width - 60} height={height - 160}></Qrcode>
      <WeappShare open={weappShareOpen} onClose={setWeappShareClose} componentTitle={component.summary} componentId={component.id}></WeappShare>
    </Fragment>
  )
}

export default Componentview
