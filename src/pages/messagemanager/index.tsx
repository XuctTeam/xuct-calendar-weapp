/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-03 15:04:45
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-23 19:58:47
 */
import { FunctionComponent, useState } from 'react'
import { Tabs } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { InternalMsg, NoticeMsg } from './ui'

import './index.scss'

const MessageManager: FunctionComponent = () => {
  const [value, setValue] = useState(0)

  return (
    <CommonMain className='vi-message-manager-warpper' left={false} title='消息管理' fixed>
      <Tabs animated value={value} onChange={setValue}>
        <Tabs.TabPane title='站内信'>
          <InternalMsg></InternalMsg>
        </Tabs.TabPane>
        <Tabs.TabPane title='公告'>
          <NoticeMsg></NoticeMsg>
        </Tabs.TabPane>
      </Tabs>
    </CommonMain>
  )
}

export default MessageManager
