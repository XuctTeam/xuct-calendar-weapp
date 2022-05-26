/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-05-26 11:50:38
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { Cell, Input, Picker, Popup, Switch } from '@taroify/core'
import { ClusterOutlined, Exchange, ManagerOutlined, CalendarOutlined, StarOutlined } from '@taroify/icons'
import Router from 'tarojs-router-next'
import { IDvaCommonProps } from '~/../@types/dva'
import CommonMain from '@/components/mixin'

const SystemSetting: FunctionComponent = () => {
  const dispatch = useDispatch()
  const lunar = useSelector<IDvaCommonProps>((state) => state.common.lunar)
  const monday = useSelector<IDvaCommonProps>((state) => state.common.monday)
  const view = useSelector<IDvaCommonProps>((state) => state.common.view)
  const [lunarCheck, setLunarCheck] = useState<boolean>(false)
  const [mondayCheck, setMondayCheck] = useState<number>(0)
  const [openPicker, setOpenPicker] = useState<boolean>(false)
  const [viewOpenPicker, setViewOpenPicker] = useState<boolean>(false)
  const [viewSelect, setViewSelect] = useState<number>(0)

  useEffect(() => {
    setLunarCheck(!!lunar)
    setMondayCheck(!!monday ? 1 : 0)
    setViewSelect(view && view + '' === '1' ? 1 : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getVersion = () => {
    //@ts-ignore
    return VERSION.version
  }

  const menuClick = (type: number) => {
    if (type === 1) {
      Taro.openSetting({
        success: function (res) {
          console.log(res.authSetting)
        }
      })
    } else if (type === 2) {
      Router.toAboutus()
    }
  }

  const onLunarCheck = (e) => {
    dispatch({
      type: 'common/saveStorageSync',
      payload: {
        lunar: e
      },
      cb: () => {
        setLunarCheck(e)
      }
    })
  }

  const onMondaySelect = (e) => {
    dispatch({
      type: 'common/saveStorageSync',
      payload: {
        monday: e[0] === 1 ? true : false
      },
      cb: () => {
        setMondayCheck(Number.parseInt(e[0]))
        setOpenPicker(false)
      }
    })
  }

  const onViewSelect = (e) => {
    dispatch({
      type: 'common/saveStorageSync',
      payload: {
        view: e
      },
      cb: () => {
        setViewSelect(Number.parseInt(e[0]))
        setViewOpenPicker(false)
      }
    })
  }

  return (
    <Fragment>
      <CommonMain className='vi-system-setting-warpper' title='设置' fixed={false} to={4} left>
        <Cell.Group title='日历设置'>
          <Cell icon={<Exchange />} title='切换视图' clickable onClick={() => setViewOpenPicker(true)}>
            <Input readonly value={viewSelect === 1 ? '列表视图' : '日视图'} />
          </Cell>
          <Cell icon={<CalendarOutlined />} title='显示农历'>
            <Switch checked={lunarCheck} size={20} onChange={(e) => onLunarCheck(e)}></Switch>
          </Cell>
          <Cell icon={<StarOutlined />} title='星期开始于' clickable onClick={() => setOpenPicker(true)}>
            <Input readonly value={mondayCheck ? '周一' : '周日'} />
          </Cell>
        </Cell.Group>
        <Cell.Group title='系统设置'>
          {process.env.TARO_ENV === 'weapp' && <Cell icon={<ManagerOutlined />} title='权限管理' clickable onClick={() => menuClick(1)}></Cell>}
          <Cell icon={<ClusterOutlined />} title='关于我们' clickable onClick={() => menuClick(2)}>
            {'V' + getVersion()}
          </Cell>
        </Cell.Group>
      </CommonMain>
      <Popup open={openPicker} rounded placement='bottom' onClose={setOpenPicker}>
        <Popup.Backdrop />
        <Picker
          onCancel={() => setOpenPicker(false)}
          onConfirm={(values) => {
            onMondaySelect(values)
          }}
          value={mondayCheck ? 1 : 0}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Title>星期开始于</Picker.Title>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option value={0}>周日</Picker.Option>
            <Picker.Option value={1}>周一</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>
      <Popup open={viewOpenPicker} rounded placement='bottom' onClose={setViewOpenPicker}>
        <Popup.Backdrop />
        <Picker
          onCancel={() => setViewOpenPicker(false)}
          onConfirm={(values) => {
            onViewSelect(values)
          }}
          value={view}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Title>显示视图</Picker.Title>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option value={0}>日</Picker.Option>
            <Picker.Option value={1}>列表</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>
    </Fragment>
  )
}

export default SystemSetting
