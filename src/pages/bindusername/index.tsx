/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-01-26 14:48:50
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { Button, Cell, Form, Input, Toast } from '@taroify/core'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import CommonHeader from '@/components/mixin'

interface IPageStateProps {}

const SystemSetting: FunctionComponent = (props: IPageStateProps) => {
  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    Toast.open(JSON.stringify(event.detail.value))
  }

  return (
    <>
      <CommonHeader title='账号绑定' fixed={false} left to={2}></CommonHeader>
      <Form onSubmit={onSubmit}>
        <Toast id='toast' />
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
        <View style={{ margin: '16px' }}>
          <Button shape='round' block color='primary' formType='submit'>
            提交
          </Button>
        </View>
      </Form>
    </>
  )
}

export default SystemSetting
