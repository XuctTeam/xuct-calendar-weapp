/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-21 18:08:16
 * @LastEditTime: 2022-03-31 21:57:43
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import { View, Button as TaroButton } from '@tarojs/components'
import { back } from '@/utils/taro'
import { Cell, Button, Field, Input } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { checkMobile } from '@/utils/utils'
import { useToast, useModal, useLogin } from 'taro-hooks'
import { getPhoneNumber, logout, bindPhone, unbindPhone, auths } from '@/api/user'
import { IDvaCommonProps, IUserAuth } from '~/../@types/dva'
import { sendUmsSmsCode } from '@/api/common'

import './index.scss'

const MemberBindPhone: FunctionComponent = () => {
  const dispatch = useDispatch()
  const loadingEffect = useSelector<IDvaCommonProps, any>((state) => state.loading)
  const saveLoading = loadingEffect.effects['common/saveStorageSync']
  const [edit, setEdit] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(false)

  const [smsText, setSmsText] = useState<string>('发送验证码')
  const timerRef = useRef<number>(0)
  const [checkSession] = useLogin()
  const [toast] = useToast()
  const [show] = useModal({
    title: '提示',
    content: '微信登录已失效,是否重新登录?'
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

  /**
   * 保存成功后离开页面
   */
  if (saveLoading) {
    back({ to: 4 })
  }

  const _getData = () => {
    let data = Router.getData()
    if (!data) {
      data = Router.getParams()
    }
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { phone } = data
      if (!phone) return
      setPhone(phone)
      setEdit(true)
      return
    }
  }

  const onGetPhoneNumber = useCallback(
    async (e) => {
      if (e.detail.errMsg && e.detail.errMsg !== 'getPhoneNumber:ok') {
        toast({ title: '获取手机失败' })
        return
      }
      try {
        await checkSession()
      } catch (error) {
        console.log(error)
        show()
          .then((res) => {
            if (res.cancel) return
            toLogout()
          })
          .catch((err) => {
            console.log(err)
          })
      }
      //获取手机号码
      getUserPhone(e.detail.encryptedData, e.detail.iv)
    },
    [checkSession]
  )

  /**
   * 获取用户手机号码
   * @param encryptedData
   * @param ivStr
   */
  const getUserPhone = (encryptedData: string, ivStr: string) => {
    getPhoneNumber(encryptedData, ivStr)
      .then((res) => {
        setPhone(res as any as string)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const bindSmsCode = () => {
    if (!phone) {
      toast({ title: '手机号为空' })
      return
    }
    if (!checkMobile(phone)) {
      toast({ title: '手机号格式错误' })
      return
    }
    setDisable(true)
    setSmsTextTime(30)
    sendUmsSmsCode(edit, phone)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        setDisable(false)
      })
  }

  const setSmsTextTime = (num: number) => {
    if (num === 0) {
      setSmsText('发送验证码')
      setDisable(false)

      if (timerRef.current > 0) {
        window.clearTimeout(timerRef.current)
        timerRef.current = 0
      }
      return
    }
    setSmsText('重发(' + num + ')')
    timerRef.current = window.setTimeout(() => {
      setSmsTextTime(num - 1)
    }, 1000)
  }

  /**
   * 登出并清理缓存
   */
  const toLogout = () => {
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

  const cleanUserInfo = () => {
    dispatch({
      type: 'common/removeStoreSync',
      payload: {
        accessToken: '',
        refreshToken: '',
        userInfo: null
      },
      cb: () => {
        back({ to: 4 })
      }
    })
  }

  const openBindPhone = () => {
    if (!phone) {
      toast({ title: '手机号为空' })
      return
    }
    if (!checkMobile(phone)) {
      toast({ title: '手机号格式错误' })
      return
    }
    if (!code) {
      toast({ title: '验证码为空', icon: 'error' })
      return
    }
    console.log(edit)
    /** 解绑 */
    if (edit) {
      /**绑定 */
      unbindPhone(phone, code)
        .then(() => {
          optPhoneSuccess('解绑成功')
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      bindPhone(phone, code)
        .then(() => {
          optPhoneSuccess('绑定成功')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const optPhoneSuccess = (msg: string) => {
    toast({
      title: msg
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
    <CommonMain className='vi-phone-wrapper' title='手机号绑定' to={4} data={{ data: '0' }} fixed={false} left>
      <Cell.Group className='vi-phone-wrapper_form' inset>
        <Field label='手机号'>
          <Input type='text' readonly={edit} value={phone} onChange={(e) => setPhone(e.detail.value)} maxlength={11} />
        </Field>
        <Field align='center' label='短信验证码'>
          <Input placeholder='请输入短信验证码' maxlength={6} type='number' value={code} onChange={(e) => setCode(e.detail.value)} />
          <Button size='small' variant='text' color='primary' onClick={() => bindSmsCode()} disabled={disable}>
            {smsText}
          </Button>
        </Field>
        <View className='warning'>解绑手机号后日程将无法同步~~</View>
      </Cell.Group>
      <View className='vi-phone-wrapper_button'>
        {process.env.TARO_ENV === 'weapp' && !edit ? (
          <View className='phone'>
            <TaroButton type='warn' openType='getPhoneNumber' onGetPhoneNumber={(e) => onGetPhoneNumber(e)}>
              获取本机号码
            </TaroButton>
          </View>
        ) : (
          <></>
        )}
        <TaroButton type='primary' onClick={() => openBindPhone()}>
          {edit ? '解绑' : '绑定'}
        </TaroButton>
      </View>
    </CommonMain>
  )
}

export default MemberBindPhone
