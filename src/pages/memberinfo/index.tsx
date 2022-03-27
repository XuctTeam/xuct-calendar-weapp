/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-28 10:47:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-27 21:58:39
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import Router, { NavigateType } from 'tarojs-router-next'
import { View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Avatar, Button, Cell } from '@taroify/core'
import { ArrowRight } from '@taroify/icons'
import { throttle } from 'lodash/function'
import { DEFAULT_AVATAR, USER_LOGOUT_EVENT } from '@/constants/index'
import { useModal, useToast } from 'taro-hooks'
import { useBack } from '@/utils/taro'
import { IDvaCommonProps, IUserInfo, IUserAuth } from '~/../@types/dva'
import { updateName, baseUserInfo, logout, auths, updateAvatar } from '@/api/user'
import { ModifyName, UploadHeader } from './ui'

const MemberInfo: FunctionComponent = () => {
  const [nameOpen, setNameOpen] = useState<boolean>(false)
  const [headerOpen, setHeaderOpen] = useState<boolean>(false)
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo) || { name: '', avatar: DEFAULT_AVATAR }
  const userAuth: IUserAuth[] = useSelector<IDvaCommonProps, IUserAuth[]>((state) => state.common.auths)
  const loadingEffect = useSelector<IDvaCommonProps, any>((state) => state.loading)
  const dispatch = useDispatch()
  const removeLoading = loadingEffect.effects['common/removeStoreSync']
  const [back] = useBack()
  const [toast] = useToast()

  const [show] = useModal({
    title: '提示',
    content: '确定退出吗？'
  })

  useEffect(() => {
    if (removeLoading) {
      toast({ title: '退出成功', icon: 'success' })
      Taro.eventCenter.trigger(USER_LOGOUT_EVENT)
      back({ to: 4 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeLoading])

  const wxAuth = userAuth.find((i) => i.identityType === 'open_id')
  const phoneAuth: IUserAuth = userAuth.find((i) => i.identityType === 'phone') || {
    username: '',
    nickName: '',
    avatar: '',
    identityType: 'phone'
  }
  const userNameAuth: IUserAuth = userAuth.find((i) => i.identityType === 'user_name') || {
    username: '',
    nickName: '',
    avatar: '',
    identityType: 'user_name'
  }
  const emailAuth: IUserAuth = userAuth.find((i) => i.identityType === 'email') || {
    username: '',
    nickName: '',
    avatar: '',
    identityType: 'email'
  }

  const callLogout = useCallback(() => {
    show().then((res) => {
      if (res.cancel) return
      //@ts-ignore
      _logout()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const cleanUserInfo = () => {
    dispatch({
      type: 'common/removeStoreSync',
      payload: {
        accessToken: '',
        refreshToken: '',
        userInfo: null,
        auths: []
      }
    })
  }

  const toModifyPhone = async (phone: string) => {
    try {
      const result = await Router.toMemberbindphone({
        params: {
          phone
        },
        data: {
          phone
        }
      })
      if (result && result.data === '1') {
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
    } catch (error) {
      console.log(error)
      Router.toMembermine({ type: NavigateType.switchTab })
    }
  }

  const toModifyUserName = async (username: string) => {
    try {
      const result = await Router.toMemberbindusername({
        data: { username: username, edit: !username }
      })
      if (result && result.data === '1') {
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
    } catch (err) {
      console.log(err)
      Router.toMembermine({ type: NavigateType.switchTab })
    }
  }

  const modifyNameHandler = (name: string) => {
    if (!name) {
      toast({ title: '名称不能为空' })
      return
    }
    updateName(name)
      .then(() => {
        /** 刷新用户 */
        _updateUserInfo().then(() => {
          dispatch({
            type: 'calendar/updateCalendarMemberName',
            payload: {
              createMemberId: userInfo.id,
              createMemberName: name
            }
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
    setNameOpen(false)
  }

  const modiftAvatar = (avatar: string) => {
    updateAvatar(avatar)
      .then(() => {
        _updateUserInfo()
      })
      .catch((err) => {
        console.log(err)
      })
    setHeaderOpen(false)
  }

  const toModifyEmail = async (name: string) => {
    try {
      const result = Router.toMemberbindemail()
      if (!result) return
    } catch (err) {
      console.log(err)
    }
  }

  const _logout = () => {
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
  }

  const _updateUserInfo = (): Promise<any> => {
    return new Promise((resolve, reject) => {
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
          resolve(true)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  }

  const to = throttle(
    (ty: number) => {
      if (ty === 2) {
        toModifyUserName(userNameAuth.username)
      } else if (ty === 3) {
        toModifyPhone(phoneAuth.username)
      } else if (ty === 4) {
        Router.toMembermodifypassword()
      } else if (ty === 5) {
        toModifyEmail(emailAuth.username)
      }
    },
    800,
    {
      trailing: false
    }
  )

  return (
    <Fragment>
      <CommonMain className='vi-user-wrapper' title='我的' fixed={false} left to={4}>
        <View className='vi-user-wrapper_menu'>
          <Cell title='头像' align='center'>
            <Avatar src={userInfo.avatar || DEFAULT_AVATAR} onClick={() => setHeaderOpen(true)} />
          </Cell>
          <Cell title='名称' rightIcon={<ArrowRight />} clickable onClick={() => setNameOpen(true)}>
            {userInfo.name}
          </Cell>
          <Cell title='登录账号' rightIcon={<ArrowRight />} clickable onClick={() => to(2)}>
            {userNameAuth.username ? userNameAuth.username : '未绑定'}
          </Cell>
          <Cell title='手机号' rightIcon={<ArrowRight />} clickable onClick={() => to(3)}>
            {phoneAuth.username ? phoneAuth.username : '未绑定'}
          </Cell>
          <Cell title='邮箱' rightIcon={<ArrowRight />} clickable onClick={() => to(5)}>
            {emailAuth ? emailAuth.username : ''}
          </Cell>
          <Cell title='微信' rightIcon={<ArrowRight />} clickable>
            {wxAuth ? wxAuth.nickName : ''}
          </Cell>
          <Cell title='设置密码' rightIcon={<ArrowRight />} clickable onClick={() => to(4)}></Cell>
        </View>
        <View className='vi-user-wrapper_button'>
          <Button color='warning' block onClick={() => callLogout()}>
            退出登录
          </Button>
        </View>
      </CommonMain>
      <ModifyName open={nameOpen} name={userInfo.name} closeHanler={() => setNameOpen(false)} modifyNameHandler={modifyNameHandler}></ModifyName>
      <UploadHeader
        open={headerOpen}
        close={() => setHeaderOpen(false)}
        updateAvatar={modiftAvatar}
        avatar={userInfo.avatar ? userInfo.avatar : DEFAULT_AVATAR}
      ></UploadHeader>
    </Fragment>
  )
}

export default MemberInfo
