/*
 * @Description: 忘记密码
 * @Author: Derek Xu
 * @Date: 2022-03-21 18:02:39
 * @LastEditTime: 2022-03-23 09:34:45
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useState } from 'react'
import { View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Button, Cell, Field, Input } from '@taroify/core'
import './index.scss'

const MemberForgetPassword: FunctionComponent = () => {
  const [phoneForm, setPhoneForm] = useState<boolean>(true)
  const [phone, setPhone] = useState<string>('')

  return (
    <CommonMain className='vi-member-forget-password' fixed title='忘记密码' left to={6}>
      <View className='container'>
        {phoneForm ? (
          <Cell.Group inset>
            <Field label='手机号'>
              <Input placeholder='请输入手机号' value={phone} onChange={(e) => setPhone(e.detail.value)} />
            </Field>
            <Field align='center' label='短信验证码'>
              <Input placeholder='请输入短信验证码' />
              <Button size='small' color='primary' variant='text'>
                发送验证码
              </Button>
            </Field>
          </Cell.Group>
        ) : (
          <Cell.Group inset>
            <Field align='center' label='短信验证码'>
              <Input placeholder='请输入短信验证码' />
              <Button size='small' color='primary' variant='text'>
                发送验证码
              </Button>
            </Field>
          </Cell.Group>
        )}
        <View className='swtch'>
          <View>没有绑定过的手机无法找回</View>
          <Button variant='contained' color='primary' shape='round' size='small'>
            {phoneForm ? '邮箱找回' : '手机号找回'}
          </Button>
        </View>
      </View>

      <View className='button'>
        <Button color='success' block>
          确定
        </Button>
      </View>
    </CommonMain>
  )
}

export default MemberForgetPassword
