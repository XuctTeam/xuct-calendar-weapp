/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-03-27 15:04:22
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-27 16:13:43
 */
import { FunctionComponent, useState } from 'react'
import { Button, Cell, Field, Input } from '@taroify/core'
import { View } from '@tarojs/components'
import { useToast } from 'taro-hooks'

interface IPageOption {
  modifyPassword: (password: string) => void
}

const Password: FunctionComponent<IPageOption> = (props) => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [toast] = useToast({
    icon: 'error'
  })

  const modifyPassword = () => {
    if (!password) {
      toast({
        title: '密码不能为空'
      })
      return
    }
    if (!confirmPassword) {
      toast({
        title: '确认密码不能为空'
      })
      return
    }
    if (password !== confirmPassword) {
      toast({
        title: '两次密码不一致'
      })
      return
    }
    props.modifyPassword(password)
  }

  return (
    <View className='form'>
      <View className='container'>
        <Cell.Group inset>
          <Field label='密码'>
            <Input placeholder='请输入密码' value={password} onChange={(e) => setPassword(e.detail.value)} />
          </Field>
          <Field align='center' label='确认密码'>
            <Input placeholder='请输入确认密码' value={confirmPassword} onChange={(e) => setConfirmPassword(e.detail.value)} />
          </Field>
        </Cell.Group>
      </View>
      <View className='button'>
        <Button color='success' block onClick={modifyPassword}>
          保存
        </Button>
      </View>
    </View>
  )
}

export default Password
