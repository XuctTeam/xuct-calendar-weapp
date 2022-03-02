/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-19 15:50:53
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-02 14:19:56
 */
import { FunctionComponent, useState } from 'react'
import { View } from '@tarojs/components'
import { Cell, Field, Button, Input } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { toast, back } from '@/utils/taro'
import { password as updatePassword } from '@/api/user'

import './index.scss'

const Password: FunctionComponent = () => {
  const [password, setPassword] = useState<string>('')
  const [comfirmPassword, setComfirmPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const modifyPassword = () => {
    if (!password) {
      toast({ title: '密码不能为空' })
      return
    }
    if (!comfirmPassword) {
      toast({ title: '确认密码不能为空' })
      return
    }
    if (password !== comfirmPassword) {
      toast({ title: '密码不一致' })
      return
    }
    setLoading(true)
    updatePassword(password)
      .then(() => {
        setLoading(false)
        toast({ title: '修改成功', icon: 'success' })
        window.setTimeout(() => {
          back({ to: 4 })
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <CommonMain className='vi-password-wrapper' title='修改密码' to={4} data={{ data: '0' }} fixed={false} left>
      <Cell.Group className='vi-password-wrapper_form' inset>
        <Field label='密码' required>
          <Input
            password
            placeholder='请输入密码'
            maxlength={16}
            clearable
            value={password}
            onChange={(e) => setPassword(e.detail.value)}
            onClear={() => setPassword('')}
          />
        </Field>
        <Field label='确认密码' required>
          <Input
            password
            placeholder='请输入确认密码'
            maxlength={16}
            clearable
            value={comfirmPassword}
            onChange={(e) => setComfirmPassword(e.detail.value)}
            onClear={() => setComfirmPassword('')}
          />
        </Field>
      </Cell.Group>
      <View className='vi-password-wrapper_button'>
        <Button color='success' block disabled={loading} onClick={() => modifyPassword()}>
          保存
        </Button>
      </View>
    </CommonMain>
  )
}
export default Password
