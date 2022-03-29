/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-03-29 10:30:58
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'tarojs-router-next'
import { Button, Cell, Form, Input } from '@taroify/core'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import { useToast } from 'taro-hooks'
import { useBack } from '@/utils/taro'
import CommonMain from '@/components/mixin'
import { bindUserName, auths } from '@/api/user'
import { IDvaCommonProps, IUserAuth } from '~/../@types/dva'

import './index.scss'

const BindUserName: FunctionComponent = () => {
  const dispatch = useDispatch()
  const loadingEffect = useSelector<IDvaCommonProps, any>((state) => state.loading)
  const saveLoading = loadingEffect.effects['common/saveStorageSync']

  const [username, setUsername] = useState('')
  const [edit, setEdit] = useState(false)
  const [password, setPassword] = useState('')
  const [back] = useBack()
  const [toast] = useToast({
    title: '操作成功',
    icon: 'success'
  })

  useEffect(() => {
    _getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const _getData = () => {
    const data = Router.getData()
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { username } = data
      if (!username) return
      setUsername(username)
      setEdit(edit)
    }
  }

  if (saveLoading) {
    back({
      to: 4
    })
  }

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    bindUserName(event.detail.value)
      .then(() => {
        _bindSuccess()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _bindSuccess = () => {
    toast()
    auths()
      .then((res) => {
        dispatch({
          type: 'common/saveStorageSync',
          payload: {
            auths: res as any as Array<IUserAuth>
          }
        })
      })
      .catch((err) => {
        console.log(err)
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
                <Input password placeholder='密码' disabled={!edit} clearable value={password} onChange={(e) => setPassword(e.detail.value)} />
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
