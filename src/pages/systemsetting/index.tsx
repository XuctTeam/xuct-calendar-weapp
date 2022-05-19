/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-05-19 17:12:48
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { Cell, Input, Picker, Popup, Switch } from '@taroify/core'
import { ClusterOutlined, Description, ManagerOutlined, CalendarOutlined, StarOutlined } from '@taroify/icons'
import Router from 'tarojs-router-next'
import { IDvaCommonProps } from '~/../@types/dva'
import CommonMain from '@/components/mixin'

const SystemSetting: FunctionComponent = () => {
  const dispatch = useDispatch()
  const lunar = useSelector<IDvaCommonProps>((state) => state.common.lunar)
  const monday = useSelector<IDvaCommonProps>((state) => state.common.monday)
  const [lunarCheck, setLunarCheck] = useState<boolean>(false)
  const [mondayCheck, setMondayCheck] = useState<number>(0)
  const [openPicker, setOpenPicker] = useState(false)

  useEffect(() => {
    setLunarCheck(!!lunar)
    setMondayCheck(!!monday ? 1 : 0)
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
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
        }
      })
    } else if (type === 2) {
      Router.toSelfprivacy()
    } else if (type === 3) {
      setOpenPicker(true)
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

  return (
    <Fragment>
      <CommonMain className='vi-system-setting-warpper' title='账号设置' fixed={false} to={4} left>
        {process.env.TARO_ENV === 'weapp' && <Cell icon={<ManagerOutlined />} title='权限管理' clickable onClick={() => menuClick(1)}></Cell>}
        <Cell icon={<Description />} title='隐私协议' clickable onClick={() => menuClick(2)}></Cell>
        <Cell icon={<ClusterOutlined />} title='当前版本'>
          {getVersion()}
        </Cell>
        <Cell icon={<CalendarOutlined />} title='显示农历'>
          <Switch checked={lunarCheck} size={20} onChange={(e) => onLunarCheck(e)}></Switch>
        </Cell>
        <Cell icon={<StarOutlined />} title='每周第一天' clickable onClick={() => menuClick(3)}>
          <Input readonly value={mondayCheck ? '周一' : '周日'} />
        </Cell>
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
            <Picker.Title>日期选择</Picker.Title>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option value={0}>周日</Picker.Option>
            <Picker.Option value={1}>周一</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>
    </Fragment>
  )
}

export default SystemSetting
