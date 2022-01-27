/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-01-27 18:30:58
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { Button, Cell, Form, Input, Toast } from '@taroify/core'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import CommonHeader from '@/components/mixin'

import './index.scss'

interface IPageStateProps {}

const BindUserName: FunctionComponent = (props: IPageStateProps) => {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    debugger
    Toast.open(JSON.stringify(event.detail.value))
  }

  return (
    <View className='vi-bind-username-warpper'>
      <CommonHeader title='账号绑定' fixed={false} left to={2}></CommonHeader>
      <Toast id='toast' />
      <Form onSubmit={onSubmit} className='vi-bind-username-warpper_content'>
        <View className='form'>
          <Cell.Group inset>
            <Form.Item name='username' rules={[{ required: true, message: '请填写用户名' }]}>
              <Form.Label>用户名</Form.Label>
              <Form.Control>
                <Input placeholder='用户名' />
              </Form.Control>
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请填写密码' }]}>
              <Form.Label>密码</Form.Label>
              <Form.Control>
                <Input password placeholder='密码' />
              </Form.Control>
            </Form.Item>
          </Cell.Group>
        </View>
        <View className='button'>
          <Button block color='primary' formType='submit'>
            提交
          </Button>
        </View>
      </Form>
    </View>
  )
}

export default BindUserName
