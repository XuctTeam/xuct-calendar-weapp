/*
 * @Author: Derek Xu
 * @Date: 2022-03-01 08:40:11
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-02 22:01:37
 * @FilePath: \xuct-calendar-weapp\src\pages\calendarcreate\index.tsx
 * @Description: 日历管理
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import Router from 'tarojs-router-next'
import { View, Textarea } from '@tarojs/components'
import { useToast, useModal } from 'taro-hooks'
import { Cell, Field, Button, Switch, Input } from '@taroify/core'
import { get, update, create, remove } from '@/api/calendar'
import CommonMain from '@/components/mixin'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { back } from '@/utils/taro'
import { ColorRadio, AlarmRadio } from './ui'
import './index.scss'

const CalendarCreate: FunctionComponent = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [createMemberId, setCreateMemberId] = useState<string>('')
  const [color, setColor] = useState<string>('ee0a24')
  const [calendarId, setCalendarId] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [major, setMajor] = useState<number>(0)
  const [display, setDisplay] = useState<number>(1)
  const [alarmType, setAlarmType] = useState<number>(1)
  const [alarmTime, setAlarmTime] = useState<number>(15)
  const [isShare, setIsShare] = useState<number>(0)
  const [memberId, setMemberId] = useState<string>('')
  const [show] = useToast({})
  const [modal] = useModal({
    title: '删除',
    content: '是否删除？'
  })

  useEffect(() => {
    const data = Router.getData()
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      _initData(data)
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { calendarId } = Router.getParams()
    if (!calendarId) {
      Taro.setNavigationBarTitle({ title: '日历新增' })
      setTitle('日历新增')
      return
    }
    get(calendarId)
      .then((res) => {
        _initData(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const _initData = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { id, name, createMemberId, color, calendarId, description, major, display, alarmType, alarmTime, isShare, memberId } = data
    setId(id)
    setName(name)
    setCreateMemberId(createMemberId)
    setColor(color)
    setCalendarId(calendarId)
    setDescription(description)
    setMajor(major)
    setDisplay(display)
    setAlarmType(alarmType)
    setAlarmTime(alarmTime)
    setIsShare(isShare)
    setMemberId(memberId)
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const title = '日历编辑'
    Taro.setNavigationBarTitle({ title: title })
    setTitle(title)
  }

  const commit = () => {
    if (!_checkForm(name, description)) {
      return
    }
    setLoading(true)
    const data = {
      id,
      name,
      createMemberId,
      color,
      calendarId,
      description,
      major,
      display,
      alarmTime,
      isShare,
      createMemberName: userInfo.name,
      memberId: memberId,
      alarmType: alarmType + ''
    }
    if (id) {
      update(data)
        .then(() => {
          _success('修改成功')
        })
        .catch((error) => {
          _error(error)
        })
      return
    }

    create({ ...data, id: '000' })
      .then(() => {
        _success('新增成功')
      })
      .catch((err) => {
        _error(err)
      })
  }

  const removeCalendar = () => {
    modal()
      .then((res) => {
        if (res.cancel) return
        remove(calendarId)
          .then(() => {
            _success('删除成功')
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _checkForm = useCallback(
    (_name: string, _description: string) => {
      if (!_name) {
        show({ title: '名称不能为空', icon: 'error' })
        return false
      }
      if (!_description) {
        show({ title: '描述不能为空', icon: 'error' })
        return false
      }
      return true
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [show]
  )

  const _success = useCallback(
    (msg: string) => {
      new Promise((resolve) => {
        dispatch({
          type: 'calendar/listSync',
          payload: {
            resolve
          }
        })
      })
        .then(() => {
          show({
            title: msg,
            icon: 'success'
          })
          setTimeout(() => {
            back({
              to: 4,
              data: {
                data: '1'
              }
            })
          }, 1500)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [show]
  )

  const _error = useCallback(
    (err: string) => {
      setLoading(false)
      show({
        title: err,
        icon: 'error'
      })
      return false
    },
    [show]
  )

  return (
    <CommonMain className='vi-calendar-wrapper' title={title} to={4} fixed left>
      <View className='vi-calendar-wrapper_container'>
        <Cell.Group title='颜色'>
          <Cell>
            <ColorRadio onChage={(e) => setColor(e)} defaultColor={color}></ColorRadio>
          </Cell>
        </Cell.Group>
        <Cell.Group title='名称'>
          <Cell>
            <Field required>
              <Input placeholder='请输入文本' maxlength={20} value={name} onChange={(e) => setName(e.detail.value)} />
            </Field>
          </Cell>
        </Cell.Group>
        <Cell.Group title='描述'>
          <Cell>
            <Textarea
              style={{ width: '100%', height: '40px' }}
              value={description}
              maxlength={200}
              onInput={(e) => {
                setDescription(e.detail.value)
              }}
            />
          </Cell>
        </Cell.Group>
        <Cell title='显示方式'>
          <Switch size={24} checked={display === 1} onChange={(e) => setDisplay(e ? 1 : 0)}></Switch>
        </Cell>

        <Cell title='共享方式'>
          <Switch size={24} checked={isShare === 1} onChange={(e) => setIsShare(e ? 1 : 0)} />
        </Cell>
        <Cell.Group title='提醒方式'>
          <Cell>
            <AlarmRadio type='alarmType' defaultValue={alarmType.toString()} onChange={(e) => setAlarmType(Number.parseInt(e))}></AlarmRadio>
          </Cell>
        </Cell.Group>
        <Cell.Group title='提醒时间'>
          <Cell>
            <AlarmRadio
              type='alarmTime'
              disable={alarmType === 0}
              defaultValue={alarmTime.toString()}
              onChange={(e) => setAlarmTime(Number.parseInt(e))}
            ></AlarmRadio>
          </Cell>
        </Cell.Group>
      </View>
      <View className='vi-calendar-wrapper_button'>
        {!!id && major !== 1 && createMemberId === userInfo.id && (
          <Button color='danger' block loading={loading} disabled={loading} onClick={removeCalendar}>
            删除
          </Button>
        )}
        <Button color='primary' block loading={loading} disabled={loading} onClick={commit}>
          保存
        </Button>
      </View>
    </CommonMain>
  )
}

export default CalendarCreate
