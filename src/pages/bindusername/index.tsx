/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-01-27 21:59:53
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import Router, { NavigateType } from 'tarojs-router-next'
import { Button, Cell, Form, Input } from '@taroify/core'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import CommonHeader from '@/components/mixin'
import { bindUserName } from '@/api/user'

import './index.scss'

const BindUserName: FunctionComponent = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const data = Router.getData()
    if (data) {
      setUsername(data.username)
    }
  }, [])

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    bindUserName(event.detail.value)
      .then(() => {
        try {
          Router.back({
            data: '1'
          })
        } catch (err) {
          console.log(err)
          Router.navigate({ url: '/pages/userinfo/index' }, { type: NavigateType.redirectTo })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <View className='vi-bind-username-warpper'>
      <CommonHeader title='账号绑定' fixed={false} left to={2}></CommonHeader>
      <Form onSubmit={onSubmit} className='vi-bind-username-warpper_content'>
        <View className='form'>
          <Cell.Group inset>
            <Form.Item name='username' rules={[{ required: true, message: '请填写用户名' }]}>
              <Form.Label>用户名</Form.Label>
              <Form.Control>
                <Input placeholder='用户名' clearable value={username} />
              </Form.Control>
            </Form.Item>
            <Form.Item name='password' rules={[{ pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/, message: '密码规则不匹配' }]}>
              <Form.Label>密码</Form.Label>
              <Form.Control>
                <Input password placeholder='密码' clearable value={password} />
              </Form.Control>
            </Form.Item>
          </Cell.Group>
          <Cell.Group title='密码规则'>
            <Cell className='label'>最少6位，至少1个大写字母，1个小写字母，1个数字，1个特殊字符</Cell>
          </Cell.Group>
        </View>
        <View className='button'>
          <Button block color='success' formType='submit'>
            保存
          </Button>
        </View>
      </Form>
    </View>
  )
}

export default BindUserName
