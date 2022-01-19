/*
 * @Description: 日程详情
 * @Author: Derek Xu
 * @Date: 2022-01-10 18:00:51
 * @LastEditTime: 2022-01-19 14:23:21
 * @LastEditors: Derek Xu
 */
import { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { ActionSheet, Button, Flex, Backdrop, Loading } from '@taroify/core'
import { Ellipsis, ClockOutlined, BulbOutlined } from '@taroify/icons'
import dayjs from 'dayjs'
import { IDavAlarm, IDavComponent } from '~/../@types/calendar'
import CommonHeader from '@/components/mixin'
import { getById, deleteById } from '@/api/component'
import { list as alarmlist } from '@/api/alarm'
import { formatAlarmText } from '@/utils/utils'
import { back } from '@/utils/taro'
import { SameDay, DifferentDay } from './ui'

import './index.scss'

interface IPageStateProps {
  open: boolean
  component: IDavComponent
  refreshTime: (time: number) => void
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
const Componentview: React.FC<IPageStateProps> = (props) => {
  const [open, setOpen] = useState(false)
  const [alarm, setAlarm] = useState<IDavAlarm>({
    alarmType: '0',
    alarmTime: ['15']
  })
  const [component, setComponent] = useState<IDavComponent>(defaultComponent)
  const [delLoading, setDelLoading] = useState(false)

  useEffect(() => {
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
    if (comp.alarmType !== '0') {
      alarmlist(comp.id)
        .then((res) => {
          setAlarm(res as any as IDavAlarm)
        })
        .catch((err) => {
          console.log(err)
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
        component: component,
        alarm: alarm
      }
    })
    if (result && result.edit) {
      _setComponent(result)
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
            props.refreshTime(dayjs().unix())
            window.setTimeout(() => {
              setDelLoading(false)
              back(1)
            }, 300)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  return (
    <Fragment>
      <View className='vi-component-view-wrapper'>
        <CommonHeader title='事项详情' to={1} fixed={false} left></CommonHeader>
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
            <View className='event-content'>{formatAlarmText(alarm)}</View>
          </View>
        </View>
        <View className='vi-component-view-wrapper_button'>
          <Flex gutter={10}>
            <Flex.Item span={12}>
              <Button color='warning' size='large' onClick={() => componentEdit()}>
                编辑
              </Button>
            </Flex.Item>
            <Flex.Item span={12}>
              <Button color='default' size='large'>
                主要按钮
              </Button>
            </Flex.Item>
          </Flex>
        </View>
      </View>
      <ActionSheet open={open} onSelect={() => componentDelete()} onCancel={() => setOpen(false)}>
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
    </Fragment>
  )
}

export default connect(
  () => {},
  (dispatch) => {
    return {
      refreshTime: (time: number) => dispatch({ type: 'component/refreshTime', payload: time })
    }
  }
)(Componentview)
