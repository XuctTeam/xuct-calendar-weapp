/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-19 20:27:59
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-04 11:26:24
 */
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Button, Swiper } from '@taroify/core'
import { FormInstance } from '@taroify/core/form'
import IconFont from '@/components/iconfont'
import { useToast } from 'taro-hooks'
import CommonMain from '@/components/mixin'
import { UserNameRegister, PhoneRegister, EmailRegister } from './ui'
import { register } from '@/api/login'
import { captcha as toGetCaptcha } from '@/api/user'
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

const MemberRegister: FunctionComponent = () => {
  const userRef = React.createRef<FormInstance>()
  const [formType, setFormType] = useState<number>(0)
  const [image, setImage] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [toast] = useToast({
    icon: 'error'
  })

  // const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
  //   const formData: IFormData = event.detail.value as any as IFormData
  //   if (!formData.captcha || formData.captcha.length !== 5) {
  //     toast({ title: '验证码错误' })
  //     return
  //   }
  //   formData.key = key
  //   register(formData)
  //     .then(() => {
  //       toast({ title: '注册成功', icon: 'success' })
  //       setTimeout(() => {
  //         back({ to: 4 })
  //       }, 1000)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

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
      default:
        null
    }
  }

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
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonMain title='用户注册' left fixed className='vi-member-register-warpper' to={4}>
      <View className='vi-member-register-warpper_container'>
        <Swiper touchable={false} value={formType}>
          <Swiper.Item>
            <UserNameRegister ref={userRef} image={image} getCaptcha={getCaptcha}></UserNameRegister>
          </Swiper.Item>
          <Swiper.Item>
            <PhoneRegister></PhoneRegister>
          </Swiper.Item>
          <Swiper.Item>
            <EmailRegister></EmailRegister>
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
        <Button block color='success' onClick={() => registerHandler()}>
          提交
        </Button>
      </View>
    </CommonMain>
  )
}
export default MemberRegister
