/* eslint-disable @typescript-eslint/no-shadow */
/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-28 10:47:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-04-20 13:19:23
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import { View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Avatar, Button, Cell } from '@taroify/core'
import { ArrowRight } from '@taroify/icons'
import { throttle } from 'lodash/function'
import { DEFAULT_AVATAR } from '@/constants/index'
import { useModal, useToast } from 'taro-hooks'
import { useBack } from '@/utils/taro'
import { IDvaCommonProps, IUserInfo, IUserAuth } from '~/../@types/dva'
import { updateName, logout, updateAvatar } from '@/api/user'
import { ModifyName, UploadHeader } from './ui'

const MemberInfo: FunctionComponent = () => {
  const [nameOpen, setNameOpen] = useState<boolean>(false)
  const [headerOpen, setHeaderOpen] = useState<boolean>(false)
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo)
  const userAuths: IUserAuth[] = useSelector<IDvaCommonProps, IUserAuth[]>((state) => state.common.auths)
  const reduxDispatch = useDispatch()
  const [back] = useBack()
  const [toast] = useToast()
  const [username, setUsername] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')

  const [show] = useModal({
    title: '提示',
    content: '确定退出吗？'
  })
  useEffect(() => {
    setUsername((userInfo && userInfo.name) || '')
    setAvatar((userInfo && userInfo.avatar) || DEFAULT_AVATAR)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  const wxAuth = userAuths.find((i) => i.identityType === 'open_id') || {
    memberId: (userInfo && userInfo.id) || '',
    username: '',
    nickName: '',
    avatar: '',
    identityType: 'open_id'
  }
  const phoneAuth: IUserAuth = userAuths.find((i) => i.identityType === 'phone') || {
    memberId: (userInfo && userInfo.id) || '',
    username: '',
    nickName: '',
    avatar: '',
    identityType: 'phone'
  }
  const userNameAuth: IUserAuth = userAuths.find((i) => i.identityType === 'user_name') || {
    memberId: (userInfo && userInfo.id) || '',
    username: '',
    nickName: '',
    avatar: '',
    identityType: 'user_name'
  }
  const emailAuth: IUserAuth = userAuths.find((i) => i.identityType === 'email') || {
    memberId: (userInfo && userInfo.id) || '',
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

  const toWechat = () => {
    Router.toMemberbindwechat({
      data: {
        avatar: wxAuth.avatar,
        username: wxAuth.nickName,
        memberId: userInfo.id
      }
    })
  }

  const callLogout = useCallback(() => {
    show().then((res) => {
      if (res.cancel) return
      _logout()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

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
      .then((res) => {
        /** 刷新用户 */
        reduxDispatch({
          type: 'calendar/updateCalendarMemberName',
          payload: {
            createMemberId: userInfo.id,
            createMemberName: username
          }
        })
        _updateInfo(res)
      })
      .catch((err) => {
        console.log(err)
      })
    setNameOpen(false)
  }

  const modiftAvatar = (url: string) => {
    updateAvatar(url)
      .then((res) => {
        _updateInfo(res)
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
      } else if (ty === 6) {
        toWechat()
      }
    },
    800,
    {
      trailing: false
    }
  )

  const _updateInfo = (res: any) => {
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
  }

  return (
    <Fragment>
      <CommonMain className='vi-user-wrapper' title='我的' fixed={false} left to={4}>
        <View className='vi-user-wrapper_menu'>
          <Cell title='头像' align='center'>
            <Avatar src={avatar} onClick={() => setHeaderOpen(true)} />
          </Cell>
          <Cell title='名称' rightIcon={<ArrowRight />} clickable onClick={() => setNameOpen(true)}>
            {username}
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
          <Cell title='微信' rightIcon={<ArrowRight />} clickable onClick={() => to(6)}>
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
      <ModifyName open={nameOpen} name={username} closeHanler={() => setNameOpen(false)} modifyNameHandler={modifyNameHandler}></ModifyName>
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
