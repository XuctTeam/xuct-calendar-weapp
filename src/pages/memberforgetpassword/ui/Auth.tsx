/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-27 03:47:42
 * @LastEditTime: 2022-03-27 04:14:14
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import { useToast } from 'taro-hooks'
import { Button, Cell, Field, Input } from '@taroify/core'
import { checkMobile } from '@/utils/utils'

interface IPageOption {
  sendPhoneCode: (phone: string) => Promise<any>
  sendEmailCode: (email: string) => Promise<any>
  validatePhone: (phone: string, code: string) => void
  validateEmail: (email: string, code: string) => void
}

const Auth: FunctionComponent<IPageOption> = (props) => {
  const [phoneSmsText, setPhoneSmsText] = useState<string>('发送验证码')
  const [phoneDisable, setPhoneDisable] = useState<boolean>(false)
  const smsCodeRef = useRef<number>(0)
  const [phoneForm, setPhoneForm] = useState<boolean>(true)
  const [phone, setPhone] = useState<string>('')
  const [phoneSmsCode, setPhoneSmsCode] = useState<string>('')
  const [mail, setMail] = useState('')
  const [emailSmsCode, setEmailSmsCode] = useState<string>('')
  const [toast] = useToast({
    icon: 'error'
  })

  useEffect(() => {
    return () => {
      if (smsCodeRef.current > 0) {
        window.clearTimeout(smsCodeRef.current)
        smsCodeRef.current = 0
      }
    }
  }, [])

  const sendSmsCode = () => {
    if (!phone || !checkMobile(phone)) {
      toast({
        title: '手机号格式错误'
      })
      return
    }
    props
      .sendPhoneCode(phone)
      .then(() => {
        setSmsTextTime(60)
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: '发送验证码失败'
        })
      })
  }

  const setSmsTextTime = (num: number) => {
    if (num === 0) {
      setPhoneSmsText('发短信')
      setPhoneDisable(false)

      if (smsCodeRef.current > 0) {
        window.clearTimeout(smsCodeRef.current)
        smsCodeRef.current = 0
      }
      return
    }
    setPhoneSmsText('重发(' + num + ')')
    setPhoneDisable(true)

    smsCodeRef.current = window.setTimeout(() => {
      setSmsTextTime(num - 1)
    }, 1000)
  }

  const validateFormHandler = () => {
    if (phoneForm) {
      props.validatePhone(phone, phoneSmsCode)
      return
    }
  }

  return (
    <View className='form'>
      <View className='container'>
        {phoneForm ? (
          <Cell.Group inset>
            <Field label='手机号'>
              <Input placeholder='请输入手机号' value={phone} onChange={(e) => setPhone(e.detail.value)} />
            </Field>
            <Field align='center' label='短信验证码'>
              <Input placeholder='请输入短信验证码' value={phoneSmsCode} onChange={(e) => setPhoneSmsCode(e.detail.value)} />
              <Button size='small' color='primary' variant='text' onClick={sendSmsCode} disabled={phoneDisable}>
                {phoneSmsText}
              </Button>
            </Field>
          </Cell.Group>
        ) : (
          <Cell.Group inset>
            <Field label='邮箱'>
              <Input placeholder='请输入邮箱' value={mail} onChange={(e) => setMail(e.detail.value)} />
            </Field>
            <Field align='center' label='邮箱验证码'>
              <Input placeholder='请输入邮箱验证码' value={emailSmsCode} onChange={(e) => setEmailSmsCode(e.detail.value)} />
              <Button size='small' color='primary' variant='text'>
                发送验证码
              </Button>
            </Field>
          </Cell.Group>
        )}
        <View className='swtch'>
          <View>没有绑定过的手机无法找回</View>
          <Button variant='contained' color='primary' shape='round' size='small' onClick={() => setPhoneForm(!phoneForm)}>
            {phoneForm ? '邮箱找回' : '手机号找回'}
          </Button>
        </View>
      </View>
      <View className='button'>
        <Button color='success' block onClick={validateFormHandler}>
          下一步
        </Button>
      </View>
    </View>
  )
}

export default Auth
