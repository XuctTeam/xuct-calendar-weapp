/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-19 20:27:59
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-18 18:38:07
 */
import React, { Fragment, FunctionComponent, useCallback, useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Button, Swiper, Popup } from '@taroify/core'
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
  const userRef = React.createRef<FormInstance>()
  const emailRef = React.createRef<FormInstance>()
  const phoneRef = React.createRef<FormInstance>()
  const simpleRef = React.createRef<any>()
  const [formType, setFormType] = useState<number>(0)
  const [image, setImage] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [verifyOpen, setVerifyOpen] = useState<boolean>(false)
  const [verify, setVerify] = useState<boolean>(false)

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
    switch (formType) {
      case 0:
        _userNameRegister()
        break
      case 1:
        _phoneRegister()
        break
      case 2:
        _emailRegister()
      default:
    }
  }

  const verifySuccess = () => {}

  const _userNameRegister = () => {
    if (!userRef.current) return
    userRef.current
      .validate()
      .then((res) => {
        const data = res as any as IUserNameForm
        if (data.captcha.length !== 5) {
          toast({ title: '验证码格式错误' })
          return
        }
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
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _phoneRegister = () => {
    if (!phoneRef.current) return
    phoneRef.current
      .validate()
      .then((res) => {
        const data: IPhoneForm = res as any as IPhoneForm
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
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _emailRegister = () => {
    if (!emailRef.current) return
    emailRef.current
      .validate()
      .then((res) => {
        const data: IEmailForm = res as any as IEmailForm
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
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _success = () => {
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
          <Button
            block
            color='success'
            onClick={() => {
              setVerifyOpen(true)
            }}
          >
            提交
          </Button>
        </View>
      </CommonMain>
      <Popup open={verifyOpen}>
        <SimpleVerify height={200} ref={simpleRef} success={() => {}}></SimpleVerify>
      </Popup>
    </Fragment>
  )
}
export default MemberRegister
