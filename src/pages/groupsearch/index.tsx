/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-14 22:47:02
 * @LastEditors: Derek Xu
 */
import Taro from '@tarojs/taro'
import { FunctionComponent, useRef, useState } from 'react'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import { Button, Cell, Form, Input, Uploader } from '@taroify/core'
import CommonHeader from '@/components/mixin'
import { Toast, Search } from '@taroify/core'
import { FormItemInstance } from '@taroify/core/form'
import { showToast, getStorage, back } from '@/utils/taro'
import { upload, addGroup } from '@/api/group'

import './index.scss'

const GroupSearch: FunctionComponent = () => {
  const [value, setValue] = useState('')

  return (
    <View className='vi-group-search-warpper'>
      <CommonHeader title='加入群组' fixed to={4} left></CommonHeader>
      <Search value={value} placeholder='请输入搜索关键词' action onChange={(e) => setValue(e.detail.value)} onCancel={() => setValue('')} />
    </View>
  )
}

export default GroupSearch
