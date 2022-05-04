/*
 * @Author: Derek Xu
 * @Date: 2022-05-03 20:25:06
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-04 22:49:54
 * @FilePath: \xuct-calendar-weapp\src\pages\memberregister\ui\EmailRegister.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */

import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Button, Cell, Form, Input } from '@taroify/core'
import { FormInstance, FormItemInstance } from '@taroify/core/form'
import { useToast } from 'taro-hooks'
import { checkEmail } from '@/utils/utils'
import { sendRegisterEmail } from '@/api/user'

interface IPageOption {}

const EmailRegister: FunctionComponent<IPageOption & { ref: React.Ref<FormInstance> }> = React.forwardRef((props, ref) => {
  const [emailSmsText, setEmailSmsText] = useState('发送验证码')
  const [emailDisable, setEmailDisable] = useState<boolean>(false)
  const emailItemRef = useRef<FormItemInstance>()

  const emailSmsCodeRef = useRef<number>(0)
  const [toast] = useToast({
    icon: 'error'
  })

  useEffect(() => {
    return () => {
      if (emailSmsCodeRef.current > 0) {
        window.clearTimeout(emailSmsCodeRef.current)
        emailSmsCodeRef.current = 0
      }
    }
  }, [])

  const sendEmailSmsCode = () => {
    const mail: string = emailItemRef.current?.getValue()
    if (!mail || !checkEmail(mail)) {
      toast({
        title: '手机号格式错误'
      })
      return
    }
    sendRegisterEmail(mail)
      .then(() => {
        setEmailSmsTextTime(120)
      })
      .catch((err) => {
        console.log(err)
        setEmailDisable(false)
        setEmailSmsText('发送验证码')
      })
  }

  const setEmailSmsTextTime = (num: number) => {
    if (num === 0) {
      setEmailSmsText('发送验证码')
      setEmailDisable(false)

      if (emailSmsCodeRef.current > 0) {
        window.clearTimeout(emailSmsCodeRef.current)
        emailSmsCodeRef.current = 0
      }
      return
    }
    setEmailSmsText('重发(' + num + ')')
    setEmailDisable(true)

    emailSmsCodeRef.current = window.setTimeout(() => {
      setEmailSmsTextTime(num - 1)
    }, 1000)
  }

  return (
    <Form className='form' ref={ref}>
      <Cell.Group inset>
        <Form.Item ref={emailItemRef} name='email' rules={[{ pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/, message: '不为空或格式错误' }]}>
          <Form.Label>邮箱</Form.Label>
          <Form.Control>
            <Input placeholder='请输入邮箱' />
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
            <Input placeholder='请输入验证码' maxlength={4} />
            <Button variant='text' size='small' color='primary' onClick={sendEmailSmsCode} disabled={emailDisable}>
              {emailSmsText}
            </Button>
          </Form.Control>
        </Form.Item>
      </Cell.Group>
    </Form>
  )
})
export default EmailRegister
