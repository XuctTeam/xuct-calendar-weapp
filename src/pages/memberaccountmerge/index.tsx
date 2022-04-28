/*
 * @Author: Derek Xu
 * @Date: 2022-04-28 15:35:34
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-29 05:59:17
 * @FilePath: \xuct-calendar-weapp\src\pages\memberaccountmerge\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import { Button, Checkbox } from '@taroify/core'
import { Icon, View } from '@tarojs/components'
import { useToast } from 'taro-hooks'
import CommonMain from '@/components/mixin'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'

import './index.scss'

const MemberAccountMerge: FunctionComponent = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const [phone, setPhone] = useState<string>('')
  const [check, setCheck] = useState<boolean>(false)
  const [toast] = useToast()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { phone } = Router.getParams()
    if (!phone) return
    setPhone(phone)
    setPhone(phone)
  }, [phone])

  const mergeHandler = useCallback(
    (checkFlag: boolean) => {
      if (!checkFlag) {
        toast({
          title: '请勾选确认风险',
          icon: 'error'
        })
        return
      }
      if (!phone) {
        toast({
          title: '未获取手机号参数',
          icon: 'error'
        })
        return
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toast]
  )

  return (
    <Fragment>
      <CommonMain className='member-account-merge-wrapper ' title='账号合并' fixed={false} left to={4}>
        <View className='container'>
          <View className='alarm'>
            <View className='title'>亲爱的： {userInfo ? userInfo.name : ''} </View>
            <View>您的账号将合并至次微信授权下。合并之前，需要您确认如下信息：</View>
            <View className='alarm-item'>
              <View className='alarm-item-flex'>
                <View>1.</View>
                <View>账号合并后，原账号下所有数据将迁移至此账号。</View>
              </View>
              <View className='alarm-item-flex'>
                <View>2.</View>
                <View>账号合并后，原账号下所有数据将被清除。账号一旦被清除，数据将无法恢复。</View>
              </View>
              <View className='alarm-item-flex'>
                <View>3.</View>
                <View>账号合并时，如日历数量超过个人最大总数将无法合并。</View>
              </View>
              <View className='check'>
                <Checkbox
                  shape='square'
                  checked={check}
                  onChange={(e) => {
                    console.log(e)
                    setCheck(!check)
                  }}
                >
                  我已经了解合并风险
                </Checkbox>
              </View>
            </View>
          </View>
        </View>
        <View className='button'>
          <Button block color='success' onClick={() => mergeHandler(check)}>
            确定
          </Button>
        </View>
      </CommonMain>
    </Fragment>
  )
}

export default MemberAccountMerge
