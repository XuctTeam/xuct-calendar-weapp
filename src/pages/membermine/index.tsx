/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 16:36:43
 * @FilePath: \xuct-calendar-weapp\src\pages\membermine\index.tsx
 * @LastEditTime: 2022-06-20 16:46:02
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { baseUserInfo } from '@/api/user'
import Images from '@/constants/images'
import { User, Menu } from './ui'

const MemberMine: FunctionComponent = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector<IDvaCommonProps>((state) => state.common.accessToken)
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const [loading, setLoading] = useState<boolean>(false)

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

  return (
    <View className='vi-aboutme-wrapper'>
      <User
        hasLogin={!!accessToken}
        nickname={userInfo ? userInfo.name : ''}
        avatar={userInfo && userInfo.avatar ? userInfo.avatar : Images.DEFAULT_AVATAR}
        refresh={refresh}
        loading={loading}
      ></User>
      <Menu></Menu>
    </View>
  )
}

export default MemberMine
