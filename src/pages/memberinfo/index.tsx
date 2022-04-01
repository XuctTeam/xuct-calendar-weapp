/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-28 10:47:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-01 10:26:25
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Avatar, Button, Cell } from '@taroify/core'
import { ArrowRight } from '@taroify/icons'
import { throttle } from 'lodash/function'
import { DEFAULT_AVATAR, USER_LOGOUT_EVENT } from '@/constants/index'
import { useModal, useToast, useEvent } from 'taro-hooks'
import { useBack } from '@/utils/taro'
import { IDvaCommonProps, IUserInfo, IUserAuth } from '~/../@types/dva'
import { updateName, baseUserInfo, logout, updateAvatar } from '@/api/user'
import { ModifyName, UploadHeader } from './ui'

enum IActionType {
  ON = 'on',
  OFF = 'off',
  TRIGGER = 'trigger',
  ONCE = 'once',
  ADD = 'add',
  CLEAR = 'clear'
}

const MemberInfo: FunctionComponent = () => {
  const [nameOpen, setNameOpen] = useState<boolean>(false)
  const [headerOpen, setHeaderOpen] = useState<boolean>(false)
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const userAuths: IUserAuth[] = useSelector<IDvaCommonProps, IUserAuth[]>((state) => state.common.auths)
  const reduxDispatch = useDispatch()
  const [back] = useBack()
  const [toast] = useToast()

  const [show] = useModal({
    title: '提示',
    content: '确定退出吗？'
  })
  const [, { dispatch }] = useEvent('taro-hooks')
  const { name, avatar } = userInfo || { name: '', avatar: DEFAULT_AVATAR }

  useEffect(() => {
    noPermission()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const wxAuth = userAuths.find((i) => i.identityType === 'open_id')
  const phoneAuth: IUserAuth = userAuths.find((i) => i.identityType === 'phone') || {
    username: '',
    nickName: '',
    avatar: '',
    identityType: 'phone'
  }
  const userNameAuth: IUserAuth = userAuths.find((i) => i.identityType === 'user_name') || {
    username: '',
    nickName: '',
    avatar: '',
    identityType: 'user_name'
  }
  const emailAuth: IUserAuth = userAuths.find((i) => i.identityType === 'email') || {
    username: '',
    nickName: '',
    avatar: '',
    identityType: 'email'
  }

  const toModifyUserName = async (username: string) => {
    Router.toMemberbindusername({
      data: { username: username, edit: !username }
    })
  }

  const toModifyPhone = async (phone: string) => {
    Router.toMemberbindphone({
      params: { phone },
      data: { phone }
    })
  }

  const toModifyEmail = (mail: string) => {
    Router.toMemberbindemail({
      data: { mail },
      params: { mail }
    })
  }

  const callLogout = useCallback(() => {
    show().then((res) => {
      if (res.cancel) return
      _logout()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const noPermission = () => {
    if (!userInfo) {
      toast({
        icon: 'error',
        title: '非法访问'
      })
      setTimeout(() => {
        back({ to: 4 })
      }, 800)
    }
  }

  const cleanUserInfo = () => {
    reduxDispatch({
      type: 'common/removeStoreSync',
      payload: {
        accessToken: '',
        refreshToken: '',
        userInfo: null,
        auths: []
      },
      cb: () => {
        toast({ title: '退出成功', icon: 'success' })
        dispatch({
          type: IActionType.TRIGGER,
          payload: USER_LOGOUT_EVENT
        })
        setTimeout(() => {
          back({ to: 4 })
        }, 800)
      }
    })
  }

  const modifyNameHandler = (username: string) => {
    if (!username) {
      toast({ title: '名称不能为空' })
      return
    }
    updateName(username)
      .then(() => {
        /** 刷新用户 */
        _updateUserInfo().then(() => {
          reduxDispatch({
            type: 'calendar/updateCalendarMemberName',
            payload: {
              createMemberId: userInfo.id,
              createMemberName: username
            }
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
    setNameOpen(false)
  }

  const modiftAvatar = (url: string) => {
    updateAvatar(url)
      .then(() => {
        _updateUserInfo()
      })
      .catch((err) => {
        console.log(err)
      })
    setHeaderOpen(false)
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
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { id, name, avatar } = res
          reduxDispatch({
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
            <Avatar src={avatar} onClick={() => setHeaderOpen(true)} />
          </Cell>
          <Cell title='名称' rightIcon={<ArrowRight />} clickable onClick={() => setNameOpen(true)}>
            {name}
          </Cell>
          <Cell title='登录账号' rightIcon={<ArrowRight />} clickable onClick={() => to(2)}>
            {userNameAuth.username ? userNameAuth.username : '未绑定'}
          </Cell>
          <Cell title='手机号' rightIcon={<ArrowRight />} clickable onClick={() => to(3)}>
            {phoneAuth.username ? phoneAuth.username : '未绑定'}
          </Cell>
          <Cell title='邮箱' rightIcon={<ArrowRight />} clickable onClick={() => to(5)}>
            {emailAuth.username ? emailAuth.username : '未绑定'}
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
      <ModifyName open={nameOpen} name={name} closeHanler={() => setNameOpen(false)} modifyNameHandler={modifyNameHandler}></ModifyName>
      <UploadHeader
        open={headerOpen}
        close={() => setHeaderOpen(false)}
        updateAvatar={modiftAvatar}
        avatar={userInfo && userInfo.avatar ? userInfo.avatar : DEFAULT_AVATAR}
      ></UploadHeader>
    </Fragment>
  )
}

export default MemberInfo
