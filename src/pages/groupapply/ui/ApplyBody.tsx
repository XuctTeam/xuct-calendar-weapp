/*
 * @Author: Derek Xu
 * @Date: 2022-07-05 23:05:23
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-09 01:12:36
 * @FilePath: \xuct-calendar-weapp\src\pages\groupapply\ui\ApplyBody.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */
import { FC, Fragment } from 'react'
import { View } from '@tarojs/components'
import dayjs from 'dayjs'
import { Button } from '@taroify/core'

interface IPageOption {
  id: string
  type: number
  groupName: string
  groupCreateName: string
  memberName: string
  applyName: Date
  reject: (id: string) => void
  agree: (id: string) => void
  withdraw: (id: string) => void
}

const ApplyBody: FC<IPageOption> = (props) => {
  return (
    <View className='body'>
      <View className='flex name'>
        <View>{props.groupName}</View>
        <View>{dayjs(props.applyName).format('YYYY-MM-DD HH:mm:ss')}</View>
      </View>
      <View className='flex opt'>
        <View>申请人: {props.memberName}</View>
        <View className='button'>
          {props.type === 2 ? (
            <Fragment>
              <Button variant='text' color='success' size='mini' onClick={() => props.agree(props.id)}>
                同意
              </Button>
              <Button variant='text' color='danger' size='mini' onClick={() => props.reject(props.id)}>
                拒绝
              </Button>
            </Fragment>
          ) : (
            <Button variant='text' color='danger' size='mini' onClick={() => props.withdraw(props.id)}>
              撤回
            </Button>
          )}
        </View>
      </View>
    </View>
  )
}

export default ApplyBody
