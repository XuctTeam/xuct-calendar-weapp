/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 16:36:43
 * @FilePath: \react-lesson-20\src\pages\authorize\index.tsx
 * @LastEditTime: 2022-03-13 11:41:21
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import { IDvaCommonProps, IUserInfo, IUserAuth } from '~/../@types/dva'
import { baseUserInfo, auths } from '@/api/user'
import { DEFAULT_AVATAR } from '@/constants/index'
import { User, Menu } from './ui'

const MemberMine: FunctionComponent = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (accessToken && !userInfo) {
      refresh()
      queryAuths()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  const refresh = () => {
    setLoading(true)
    baseUserInfo()
      .then((res) => {
        const { id, name, avatar } = res
        dispatch({
          type: 'common/saveStorageSync',
          payload: {
            userInfo: {
              id,
              name,
              avatar
            }
          }
        })
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
  }

  const queryAuths = () => {
    auths()
      .then((res) => {
        dispatch({
          type: 'common/saveStorageSync',
          payload: {
            auths: res as any as Array<IUserAuth>
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <View className='vi-aboutme-wrapper'>
      <User
        hasLogin={!!accessToken}
        nickname={userInfo ? userInfo.name : ''}
        avatar={userInfo && userInfo.avatar ? userInfo.avatar : DEFAULT_AVATAR}
        refresh={refresh}
        loading={loading}
      ></User>
      <Menu></Menu>
    </View>
  )
}

export default MemberMine
