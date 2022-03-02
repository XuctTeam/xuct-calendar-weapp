/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-03-02 14:08:22
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import Router, { NavigateType } from 'tarojs-router-next'
import { Button, Cell, Form, Input } from '@taroify/core'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import { useBack } from '@/utils/taro'
import CommonMain from '@/components/mixin'
import { bindUserName } from '@/api/user'

import './index.scss'

const BindUserName: FunctionComponent = () => {
  const [username, setUsername] = useState('')
  const [edit, setEdit] = useState(false)
  const [password, setPassword] = useState('')
  const [back] = useBack()

  useEffect(() => {
    const data = Router.getData()
    if (data) {
      setUsername(data.username)
      setEdit(edit)
    }
  }, [])

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    bindUserName(event.detail.value)
    back({
      to: 4
    })
  }

  return (
    <CommonMain className='vi-bind-username-warpper' title='账号绑定' fixed={false} left to={4}>
      <Form onSubmit={onSubmit} className='vi-bind-username-warpper_content'>
        <View className='form'>
          <Cell.Group inset>
            <Form.Item name='username' rules={[{ message: '8到16位（字母、数字、下划线、减号', pattern: /^[a-zA-Z0-9_-]{8,16}$/ }]}>
              <Form.Label>用户名</Form.Label>
              <Form.Control>
                <Input placeholder='用户名' disabled={!edit} clearable value={username} />
              </Form.Control>
            </Form.Item>
            <Form.Item name='password' rules={[{ pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/, message: '密码规则不匹配' }]}>
              <Form.Label>密码</Form.Label>
              <Form.Control>
                <Input password placeholder='密码' disabled={!edit} clearable value={password} />
              </Form.Control>
            </Form.Item>
          </Cell.Group>
          <Cell.Group title='密码规则'>
            <Cell className='label'>密码至少为8位的字母、数字和特殊符号的组合</Cell>
          </Cell.Group>
        </View>
        {edit && (
          <View className='button'>
            <Button block color='success' formType='submit'>
              保存
            </Button>
          </View>
        )}
      </Form>
    </CommonMain>
  )
}

export default BindUserName
