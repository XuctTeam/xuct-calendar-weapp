/*
 * @Description: 忘记密码
 * @Author: Derek Xu
 * @Date: 2022-03-21 18:02:39
 * @LastEditTime: 2022-03-27 16:35:50
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useRef, useState } from 'react'
import CommonMain from '@/components/mixin'
import { Steps } from '@taroify/core'
import { sendForgetPasswordCode, forgetPasswordCheck, forgetModify } from '@/api/user'
import { useBack } from '@/utils/taro'
import { useToast } from 'taro-hooks'
import { Auth, Password } from './ui'

import './index.scss'

const MemberForgetPassword: FunctionComponent = () => {
  const [step, setStep] = useState<number>(0)
  const memberIdRef = useRef<string>('')
  const codeRef = useRef<string>('')
  const [back] = useBack()
  const [toast] = useToast({
    icon: 'success'
  })

  const sendForgetPasswordSmcCode = (phone: string, email: string, type: number) => {
    return new Promise((resolve, reject) => {
      sendForgetPasswordCode(phone, email, type)
        .then(() => {
          resolve('')
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const checkMemberCode = (phone: string, email: string, code: string, type: number) => {
    forgetPasswordCheck(phone, email, code, type)
      .then((res) => {
        memberIdRef.current = res as any as string
        codeRef.current = code
        setStep(2)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const modifyPassword = (password: string) => {
    forgetModify(memberIdRef.current, password, codeRef.current)
      .then(() => {
        toast({
          title: '修改成功'
        })
        window.setTimeout(() => {
          back({
            to: 6
          })
        }, 500)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CommonMain className='vi-member-forget-password' fixed title='忘记密码' left to={6}>
      <Steps value={step}>
        <Steps.Step>验证账号</Steps.Step>
        <Steps.Step>重置密码</Steps.Step>
      </Steps>
      {step === 0 ? (
        <Auth sendForgetPasswordSmcCode={sendForgetPasswordSmcCode} checkMemberCode={checkMemberCode}></Auth>
      ) : (
        <Password modifyPassword={modifyPassword}></Password>
      )}
    </CommonMain>
  )
}

export default MemberForgetPassword
