/*
 * @Author: Derek Xu
 * @Date: 2022-05-03 20:24:33
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-24 15:41:32
 * @FilePath: \xuct-calendar-weapp\src\pages\memberregister\ui\UserNameRegister.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */

import React, { FunctionComponent } from 'react'

import { Input } from '@tarojs/components'
import { Cell, Form, Image } from '@taroify/core'

interface IPageOption {
  image: string
  getCaptcha: () => void
}

const UserNameRegister: FunctionComponent<IPageOption & { ref: React.Ref<any> }> = React.forwardRef((props, ref) => {
  return (
    <Form className='form' ref={ref}>
      <Cell.Group inset>
        <Form.Item name='username' rules={[{ message: '8-16位且为字母、数字、下划线、减号', pattern: /^[a-zA-Z0-9_-]{8,16}$/ }]}>
          <Form.Label>用户名</Form.Label>
          <Form.Control>
            <Input placeholder='用户名' style={{ width: '100%' }} />
          </Form.Control>
        </Form.Item>
        <Form.Item name='password' rules={[{ pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/, message: '8-30位且字母、数字和特殊符号组合' }]}>
          <Form.Label>密码</Form.Label>
          <Form.Control>
            <Input password placeholder='密码' style={{ width: '100%' }} />
          </Form.Control>
        </Form.Item>
        <Form.Item className='captcha' name='captcha' rules={[{ required: true, message: '请填写图形码' }]}>
          <Form.Label>图形码</Form.Label>
          <Form.Control>
            <Input placeholder='请输入图形码' maxlength={5} />
            <Image src={props.image} alt='点击刷新' onClick={props.getCaptcha} />
          </Form.Control>
        </Form.Item>
      </Cell.Group>
    </Form>
  )
})

export default UserNameRegister
