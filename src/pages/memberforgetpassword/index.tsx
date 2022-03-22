/*
 * @Description: 忘记密码
 * @Author: Derek Xu
 * @Date: 2022-03-21 18:02:39
 * @LastEditTime: 2022-03-22 17:55:31
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { Input, View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Button, Cell, Field } from '@taroify/core'

const MemberForgetPassword: FunctionComponent = () => {
  return (
    <CommonMain className='' fixed title='忘记密码' left to={4}>
      <Cell.Group inset>
        <Field align='center' label='短信验证码'>
          <Input placeholder='请输入短信验证码' />
          <Button size='small' color='primary'>
            发送验证码
          </Button>
        </Field>
      </Cell.Group>
    </CommonMain>
  )
}

export default MemberForgetPassword
