/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-19 20:27:59
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-17 13:55:44
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { BaseEventOrig, FormProps, Input, View } from '@tarojs/components'
import { Button, Cell, Field, Form, Image } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { toast, back } from '@/utils/taro'
import { captcha as toGetCaptcha, register } from '@/api/user'
import './index.scss'

interface ICaptcha {
  image: string
  key: string
}

interface IFormData {
  username: string
  password: string
  captcha: string
  key?: string
}

const MemberRegister: FunctionComponent = () => {
  const [image, setImage] = useState<string>('')
  const [key, setKey] = useState<string>('')

  useEffect(() => {
    getCaptcha()
  }, [])

  const getCaptcha = () => {
    toGetCaptcha()
      .then((res) => {
        const captcha: ICaptcha = res as any as ICaptcha
        setImage(captcha.image)
        setKey(captcha.key)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const formData: IFormData = event.detail.value as any as IFormData
    if (!formData.captcha || formData.captcha.length !== 5) {
      toast({ title: '验证码错误' })
      return
    }
    formData.key = key
    register(formData)
      .then(() => {
        toast({ title: '注册成功', icon: 'success' })
        setTimeout(() => {
          back({ to: 4 })
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonMain title='用户注册' left fixed className='vi-member-register-warpper' to={4}>
      <Form className='form' onSubmit={onSubmit}>
        <View className='vi-member-register-warpper_container'>
          <Cell.Group inset>
            <Form.Item name='username' rules={[{ message: '8-16位且为字母、数字、下划线、减号', pattern: /^[a-zA-Z0-9_-]{8,16}$/ }]}>
              <Form.Label>用户名</Form.Label>
              <Form.Control>
                <Input placeholder='用户名' />
              </Form.Control>
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{ pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/, message: '8-30位且字母、数字和特殊符号组合' }]}
            >
              <Form.Label>密码</Form.Label>
              <Form.Control>
                <Input password placeholder='密码' />
              </Form.Control>
            </Form.Item>
            <Field name='captcha' label={{ align: 'left', children: '验证码' }} className='captcha'>
              <Input placeholder='请输入验证码' maxlength={5} />
              <Image src={image} alt='点击刷新' onClick={() => getCaptcha()} />
            </Field>
          </Cell.Group>
        </View>

        <View className='vi-member-register-warpper_button'>
          <Button block color='success' formType='submit'>
            提交
          </Button>
        </View>
      </Form>
    </CommonMain>
  )
}
export default MemberRegister
