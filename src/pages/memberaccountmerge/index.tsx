/*
 * @Author: Derek Xu
 * @Date: 2022-04-28 15:35:34
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-06-18 18:30:18
 * @FilePath: \xuct-calendar-weapp\src\pages\memberaccountmerge\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import { Button, Checkbox } from '@taroify/core'
import { View } from '@tarojs/components'
import { useToast } from 'taro-hooks'
import CommonMain from '@/components/mixin'
import { useBack } from '@/utils/taro'
import { merge, logout } from '@/api/user'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'

import './index.scss'

const MemberAccountMerge: FunctionComponent = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const dispatch = useDispatch()
  const [phone, setPhone] = useState<string>('')
  const [check, setCheck] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [toast] = useToast()
  const [back] = useBack()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { phone } = Router.getParams()
    debugger
    if (!phone) return
    setPhone(phone)
  }, [phone])

  const mergeHandler = useCallback(
    (checkFlag: boolean, checkPhone: string) => {
      if (!checkFlag) {
        toast({
          title: '请勾选确认风险',
          icon: 'error'
        })
        return
      }
      if (!checkPhone) {
        toast({
          title: '未获取手机号参数',
          icon: 'error'
        })
        return
      }
      setLoading(true)
      merge(checkPhone)
        .then(() => {
          setLoading(false)
          toast({
            title: '合并完成，退出后重新登录',
            icon: 'success'
          })
          logout()
            .then(() => {
              cleanUserInfo()
              return
            })
            .catch((error) => {
              console.log(error)
              if (error.status === 401) {
                cleanUserInfo()
                return
              }
              toast({ title: '退出失败' })
            })
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toast]
  )

  const cleanUserInfo = () => {
    new Promise((resolve) => {
      dispatch({
        type: 'common/logoutSync',
        payload: {
          resolve
        }
      })
    })
      .then(() => {
        setTimeout(() => {
          back({ to: 4, delta: 3 })
        }, 800)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Fragment>
      <CommonMain className='member-account-merge-wrapper ' title='账号合并' fixed={false} left to={4}>
        <View className='container'>
          <View className='alarm'>
            <View className='title'>亲爱的： {userInfo ? userInfo.name : ''} </View>
            <View>您的手机号登录方式将合并至当前登录账号下。合并之前，需要您确认如下信息：</View>
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
          <Button block color='success' onClick={() => mergeHandler(check, phone)} disabled={loading} loading={loading}>
            确定
          </Button>
        </View>
      </CommonMain>
    </Fragment>
  )
}

export default MemberAccountMerge
