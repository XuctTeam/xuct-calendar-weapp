/*
 * @Author: Derek Xu
 * @Date: 2022-05-03 20:24:53
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-24 15:25:55
 * @FilePath: \xuct-calendar-weapp\src\pages\memberregister\ui\PhoneRegister.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Button, Cell, Form, Input } from '@taroify/core'
import { FormInstance, FormItemInstance } from '@taroify/core/form'
import { useToast } from 'taro-hooks'
import { checkMobile } from '@/utils/utils'
import { sendRegisterSms } from '@/api/user'

interface IPageOption {}

const PhoneRegister: FunctionComponent<IPageOption & { ref: React.Ref<any> }> = React.forwardRef((props, ref) => {
  const [phoneSmsText, setPhoneSmsText] = useState<string>('发送验证码')
  const [phoneDisable, setPhoneDisable] = useState<boolean>(false)
  const smsCodeRef = useRef<number>(0)
  const phoneItemRef = useRef<FormItemInstance>()

  const [toast] = useToast({
    icon: 'error'
  })

  useEffect(() => {
    return () => {
      if (smsCodeRef.current > 0) {
        window.clearTimeout(smsCodeRef.current)
        smsCodeRef.current = 0
      }
    }
  }, [])

  const sendPhoneSmsCode = () => {
    const phone: string = phoneItemRef.current?.getValue()
    if (!phone || !checkMobile(phone)) {
      toast({
        title: '手机号格式错误'
      })
      return
    }
    sendRegisterSms(phone)
      .then(() => {
        setPhoneSmsTextTime(120)
      })
      .catch((err) => {
        console.log(err)
        setPhoneDisable(false)
        setPhoneSmsText('发送验证码')
      })
  }

  const setPhoneSmsTextTime = (num: number) => {
    if (num === 0) {
      setPhoneSmsText('发送验证码')
      setPhoneDisable(false)

      if (smsCodeRef.current > 0) {
        window.clearTimeout(smsCodeRef.current)
        smsCodeRef.current = 0
      }
      return
    }
    setPhoneSmsText('重发(' + num + ')')
    setPhoneDisable(true)

    smsCodeRef.current = window.setTimeout(() => {
      setPhoneSmsTextTime(num - 1)
    }, 1000)
  }

  return (
    <Form className='form' {...props} ref={ref}>
      <Cell.Group inset>
        <Form.Item ref={phoneItemRef} name='phone' rules={[{ pattern: /^1[3|4|5|8][0-9]\d{4,8}/, message: '不为空或格式错误' }]}>
          <Form.Label>手机号</Form.Label>
          <Form.Control>
            <Input placeholder='请输入手机号' />
          </Form.Control>
        </Form.Item>
        <Form.Item name='password' rules={[{ pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/, message: '8-30位且字母、数字和特殊符号组合' }]}>
          <Form.Label>密码</Form.Label>
          <Form.Control>
            <Input password placeholder='密码' />
          </Form.Control>
        </Form.Item>
        <Form.Item className='captcha' name='code' rules={[{ required: true, message: '验证码不能为空' }]}>
          <Form.Label>验证码</Form.Label>
          <Form.Control>
            <Input placeholder='请输入验证码' maxlength={6} />
            <Button variant='text' size='small' color='primary' onClick={sendPhoneSmsCode} disabled={phoneDisable}>
              {phoneSmsText}
            </Button>
          </Form.Control>
        </Form.Item>
      </Cell.Group>
    </Form>
  )
})

export default PhoneRegister
