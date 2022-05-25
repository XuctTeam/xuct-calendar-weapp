/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-19 20:27:59
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-24 21:03:42
 */
import { Fragment, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Backdrop, Button, Cell, Swiper } from '@taroify/core'
import { FormInstance } from '@taroify/core/form'
import IconFont from '@/components/iconfont'
import { useToast } from 'taro-hooks'
import { register, captcha as toGetCaptcha } from '@/api/user'
import { useBack } from '@/utils/taro'
import CommonMain from '@/components/mixin'
import { UserNameRegister, PhoneRegister, EmailRegister, SimpleVerify } from './ui'

import './index.scss'

interface ICaptcha {
  image: string
  key: string
}

interface IUserNameForm {
  captcha: string
  password: string
  username: string
}

interface IEmailForm {
  email: string
  password: string
  code: string
}

interface IPhoneForm {
  phone: string
  password: string
  code: string
}

const MemberRegister: FunctionComponent = () => {
  const userRef = useRef<FormInstance>()
  const emailRef = useRef<FormInstance>()
  const phoneRef = useRef<FormInstance>()

  const [formType, setFormType] = useState<number>(0)
  const [image, setImage] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const [toast] = useToast({
    icon: 'error'
  })
  const [back] = useBack()

  useEffect(() => {
    getCaptcha()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCaptcha = useCallback(() => {
    toGetCaptcha()
      .then((res) => {
        const captcha: ICaptcha = res as any as ICaptcha
        setKey(captcha.key)
        let array = Taro.base64ToArrayBuffer(captcha.image)
        let base64 = Taro.arrayBufferToBase64(array)
        setImage('data:image/jpeg;base64,' + base64)
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  const registerHandler = () => {
    let ref
    switch (formType) {
      case 0:
        ref = userRef
        break
      case 1:
        ref = phoneRef
        break
      case 2:
        ref = emailRef
        break
    }
    if (!ref) return
    ref.current
      .validate()
      .then((data) => {
        if (formType === 0 && data.captcha.length !== 5) {
          toast({ title: '验证码格式错误' })
          return
        }
        setOpen(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const verifySuccess = () => {
    setOpen(false)
    setLoading(true)
    switch (formType) {
      case 0:
        _userNameRegister()
        break
      case 1:
        _phoneRegister()
        break
      case 2:
        _emailRegister()
        break
    }
  }

  const _userNameRegister = () => {
    if (!userRef.current) {
      setLoading(false)
      return
    }
    const data = userRef.current.getValues<IUserNameForm>()
    register({
      formType: formType,
      username: {
        username: data.username,
        password: data.password,
        key: key,
        captcha: data.captcha
      }
    })
      .then(() => {
        _success()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const _phoneRegister = () => {
    if (!phoneRef.current) {
      setLoading(false)
      return
    }

    const data = phoneRef.current.getValues<IPhoneForm>()
    register({
      formType: formType,
      phone: {
        phone: data.phone,
        password: data.password,
        smsCode: data.code
      }
    })
      .then(() => {
        _success()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const _emailRegister = () => {
    if (!emailRef.current) {
      setLoading(false)
      return
    }
    const data = emailRef.current.getValues<IEmailForm>()
    register({
      formType: formType,
      email: {
        email: data.email,
        password: data.password,
        code: data.code
      }
    })
      .then(() => {
        _success()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const _success = () => {
    setLoading(false)
    toast({ title: '注册成功', icon: 'success' })
    setTimeout(() => {
      back({ to: 4 })
    }, 1000)
  }

  return (
    <Fragment>
      <CommonMain title='用户注册' left fixed className='vi-member-register-warpper' to={4}>
        <View className='vi-member-register-warpper_container'>
          <Swiper touchable={false} value={formType}>
            <Swiper.Item>
              <UserNameRegister ref={userRef} image={image} getCaptcha={getCaptcha}></UserNameRegister>
            </Swiper.Item>
            <Swiper.Item>
              <PhoneRegister ref={phoneRef}></PhoneRegister>
            </Swiper.Item>
            <Swiper.Item>
              <EmailRegister ref={emailRef}></EmailRegister>
            </Swiper.Item>
          </Swiper>
        </View>
        <View className='vi-member-register-warpper_button'>
          <View className='thirdWrap'>
            {formType !== 0 && (
              <View className='itemWrap' onClick={() => setFormType(0)}>
                <IconFont name='icon-qudaozhanghaoshangxian' size={40} />
                <View className='label'>账号</View>
              </View>
            )}
            {formType !== 1 && (
              <View className='itemWrap' onClick={() => setFormType(1)}>
                <IconFont name='shouji' size={40} />
                <View className='label'>手机</View>
              </View>
            )}
            {formType !== 2 && (
              <View className='itemWrap' onClick={() => setFormType(2)}>
                <IconFont name='youxiang' size={40} />
                <View className='label'>邮箱</View>
              </View>
            )}
          </View>
          <Button block color='success' disabled={loading} onClick={registerHandler}>
            注册
          </Button>
        </View>
      </CommonMain>
      <Backdrop className='vi-member-register-warpper-popup' open={open} closeable onClose={() => setOpen(false)}>
        <View className='content-wrapper'>
          <Cell.Group inset title='人机验证'>
            <Cell style={{ backgroundColor: 'rgba(238, 239, 241, 1)' }}>
              <SimpleVerify success={verifySuccess}></SimpleVerify>
            </Cell>
          </Cell.Group>
        </View>
      </Backdrop>
    </Fragment>
  )
}
export default MemberRegister
