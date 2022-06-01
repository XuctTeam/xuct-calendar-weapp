/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-03 15:04:45
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-31 15:36:24
 */
import { Fragment, FunctionComponent, useState } from 'react'
import { View } from '@tarojs/components'
import { Button, Picker, Popup, Tabs } from '@taroify/core'
import CommonMain from '@/components/mixin'
import IconFont from '@/components/iconfont'
import { Search } from '@taroify/icons'
import { InternalMsg, NoticeMsg } from './ui'

import './index.scss'

const MessageManager: FunctionComponent = () => {
  const [value, setValue] = useState(0)
  const [openPicker, setOpenPicker] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(2)

  const statusPickerChage = (flag: boolean) => {
    setOpenPicker(flag)
  }

  const statusSelectedHandler = (values: any[]) => {
    setStatus(Number.parseInt(values[0]))
    setOpenPicker(false)
  }

  return (
    <Fragment>
      <CommonMain className='vi-message-manager-warpper' left={false} title='消息管理' fixed>
        <View className='message-header'>
          <View className='action'>
            <View className='all'>全部消息(4)</View>
            <View className='clean'>
              <IconFont name='zuixing-81' size={38} /> 清除未读
            </View>
          </View>
          <View className='search'>
            <Button variant='text' size='mini' color='primary' icon={<Search />}>
              高级查询
            </Button>
          </View>
        </View>
        <NoticeMsg></NoticeMsg>
        <View className='br'></View>
        <InternalMsg></InternalMsg>
        {/* <Tabs animated value={value} onChange={setValue}>
          <Tabs.TabPane title='站内信'>
            <InternalMsg status={status} statusPickerChage={statusPickerChage}></InternalMsg>
          </Tabs.TabPane>
          <Tabs.TabPane title='公告'>
            <NoticeMsg></NoticeMsg>
          </Tabs.TabPane>
        </Tabs> */}
      </CommonMain>
      {/* <Popup open={openPicker} rounded placement='bottom' onClose={setOpenPicker}>
        <Popup.Backdrop />
        <Picker
          style={{ height: '10%' }}
          onCancel={() => setOpenPicker(false)}
          value={status}
          onConfirm={(values) => {
            statusSelectedHandler(values)
          }}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Title>状态选择</Picker.Title>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option value={2}>全部</Picker.Option>
            <Picker.Option value={1}>已读</Picker.Option>
            <Picker.Option value={0}>未读</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup> */}
    </Fragment>
  )
}

export default MessageManager
