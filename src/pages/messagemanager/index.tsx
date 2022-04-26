/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-03 15:04:45
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-26 14:08:33
 */
import { Fragment, FunctionComponent, useState } from 'react'
import { Picker, Popup, Tabs } from '@taroify/core'
import CommonMain from '@/components/mixin'
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
        <Tabs animated value={value} onChange={setValue}>
          <Tabs.TabPane title='站内信'>
            <InternalMsg status={status} statusPickerChage={statusPickerChage}></InternalMsg>
          </Tabs.TabPane>
          <Tabs.TabPane title='公告'>
            <NoticeMsg></NoticeMsg>
          </Tabs.TabPane>
        </Tabs>
      </CommonMain>
      <Popup open={openPicker} rounded placement='bottom' onClose={setOpenPicker}>
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
            <Picker.Title>标题</Picker.Title>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option value={2}>全部</Picker.Option>
            <Picker.Option value={1}>已读</Picker.Option>
            <Picker.Option value={0}>未读</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>
    </Fragment>
  )
}

export default MessageManager
