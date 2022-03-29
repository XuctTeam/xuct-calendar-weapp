/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-03-27 21:24:08
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-29 10:21:49
 */
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { Button, Cell, Field, Input } from '@taroify/core'
import { View } from '@tarojs/components'
import { useToast } from 'taro-hooks'
import { useBack } from '@/utils/taro'
import { checkEmail } from '@/utils/utils'
import { sendUmsEmailCode } from '@/api/common'
import { bindEmail, unbindEmail, auths } from '@/api/user'
import { IDvaCommonProps, IUserAuth } from '~/../@types/dva'

import './index.scss'

const Index: FunctionComponent = () => {
  const dispatch = useDispatch()
  const loadingEffect = useSelector<IDvaCommonProps, any>((state) => state.loading)
  const saveLoading = loadingEffect.effects['common/saveStorageSync']
  const [email, setEmail] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)
  const [canable, setCanable] = useState<boolean>(false)
  const [smsCode, setSmsCode] = useState<string>('')
  const [smsText, setSmsText] = useState<string>('发送验证码')
  const [disable, setDisapble] = useState<boolean>(false)
  const timerRef = useRef<number>(0)
  const [toast] = useToast({
    icon: 'error'
  })
  const [back] = useBack({
    to: 4
  })

  useEffect(() => {
    _getData()

    return () => {
      if (timerRef.current && timerRef.current > 0) {
        window.clearTimeout(timerRef.current)
        timerRef.current = 0
      }
    }
  }, [])

  if (saveLoading) {
    back({ to: 4 })
  }

  const _getData = async () => {
    const data = Router.getData()
    if (!data) {
      const params = Router.getParams()
      const { mail } = params
      if (!mail) return
      setEmail(mail)
      setEdit(true)
    }
    const { mail } = data
    if (!mail) return
    setEmail(mail)
    setEdit(true)
  }

  const sendSmsCode = () => {
    if (!_checkParam()) return
    setTextTime(60)
    sendUmsEmailCode(email, !edit ? 1 : 2)
      .then(() => {})
      .catch((err) => {
        console.log(err)
      })
  }

  const setTextTime = (num: number) => {
    if (num === 0) {
      setSmsText('发送验证码')
      setDisapble(false)

      if (timerRef.current > 0) {
        window.clearTimeout(timerRef.current)
        timerRef.current = 0
      }
      return
    }
    setSmsText('重发(' + num + ')')
    setDisapble(true)

    timerRef.current = window.setTimeout(() => {
      setTextTime(num - 1)
    }, 1000)
  }

  const bindEmailHandler = () => {
    if (!_checkParam()) return
    if (!smsCode) {
      toast({
        title: '验证码为空'
      })
      return
    }
    setCanable(true)
    if (edit) {
      unbindEmail(email, smsCode)
        .then(() => {
          _back()
        })
        .catch((err) => {
          console.log(err)
          setCanable(false)
        })
      return
    }
    bindEmail(email, smsCode)
      .then(() => {
        _back()
      })
      .catch((err) => {
        console.log(err)
        setCanable(false)
      })
  }

  const _checkParam = () => {
    if (!email || !checkEmail(email)) {
      toast({
        title: '邮箱格式错误'
      })
      return false
    }
    return true
  }

  const _back = () => {
    toast({
      title: '操作成功',
      icon: 'success'
    })
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
    <CommonMain className='vi-member-bind-email-warpper' title='绑定邮箱' left fixed to={4}>
      <Cell.Group inset className='content'>
        <Field label='邮箱'>
          <Input placeholder='请输入邮箱' value={email} onChange={(e) => setEmail(e.detail.value)} />
        </Field>
        <Field align='center' label='验证码'>
          <Input placeholder='请输入验证码' value={smsCode} type='number' maxlength={6} onChange={(e) => setSmsCode(e.detail.value)} />
          <Button size='small' color='primary' variant='text' onClick={() => sendSmsCode()} disabled={disable}>
            {smsText}
          </Button>
        </Field>
      </Cell.Group>
      <View className='button'>
        <Button block color='success' formType='submit' disabled={canable} onClick={() => bindEmailHandler()}>
          {edit ? '解绑' : '绑定'}
        </Button>
      </View>
    </CommonMain>
  )
}

export default Index
