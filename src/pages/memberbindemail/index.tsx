/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-03-27 21:24:08
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-27 21:51:01
 */
import { FunctionComponent, useRef, useState } from 'react'
import CommonMain from '@/components/mixin'
import { useToast } from 'taro-hooks'
import { checkEmail } from '@/utils/utils'

import './index.scss'
import { Button, Cell, Field, Input } from '@taroify/core'

const Index: FunctionComponent = () => {
  const [email, setEmail] = useState<string>('')
  const [smsCode, setSmsCode] = useState<string>('')
  const [smsText, setSmsText] = useState<string>('发送验证码')
  const [disable, setDisapble] = useState<boolean>(false)
  const timerRef = useRef<number>(0)
  const [toast] = useToast({
    icon: 'error'
  })

  const sendSmsCode = () => {
    if (!email || !checkEmail(email)) {
      toast({
        title: '邮箱格式错误'
      })
      return
    }
    setTextTime(60)
  }

  const setTextTime = (num: number) => {
    if (num === 0) {
      setSmsText('发短信')
      setDisapble(false)

      if (timerRef.current > 0) {
        window.clearTimeout(timerRef.current)
        timerRef.current = 0
      }
      return
    }
    setSmsText('重发(' + num + ')')
    setDisapble(true)

    timerRef.current = window.setTimeout(() => {
      setTextTime(num - 1)
    }, 1000)
  }

  return (
    <CommonMain className='vi-member-bind-email-warpper' title='绑定邮箱' left fixed>
      <Cell.Group inset>
        <Field label='邮箱'>
          <Input placeholder='请输入邮箱' value={email} onChange={(e) => setEmail(e.detail.value)} />
        </Field>
        <Field align='center' label='验证码'>
          <Input placeholder='请输入验证码' value={smsCode} type='number' maxlength={4} onChange={(e) => setSmsCode(e.detail.value)} />
          <Button size='small' color='primary' variant='text' onClick={sendSmsCode} disabled={disable}>
            {smsText}
          </Button>
        </Field>
      </Cell.Group>
    </CommonMain>
  )
}

export default Index
