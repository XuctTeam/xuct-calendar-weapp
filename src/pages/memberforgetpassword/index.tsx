/*
 * @Description: 忘记密码
 * @Author: Derek Xu
 * @Date: 2022-03-21 18:02:39
 * @LastEditTime: 2022-03-27 04:16:14
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useState } from 'react'
import { View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Steps } from '@taroify/core'
import { Auth } from './ui'

import './index.scss'

const MemberForgetPassword: FunctionComponent = () => {
  const [step, setStep] = useState<number>(0)
  const [memberId, setMemberId] = useState<string>('')

  const sendPhoneCode = (phone: string): Promise<any> => {
    return new Promise((resolve, reject) => {})
  }

  const sendEmailCode = (email: string): Promise<any> => {
    return new Promise((resolve, reject) => {})
  }

  const validatePhone = (phone: string, code: string): void => {}

  const validateEmail = (email: string, code: string): void => {}

  return (
    <CommonMain className='vi-member-forget-password' fixed title='忘记密码' left to={6}>
      <Steps value={step}>
        <Steps.Step>验证账号</Steps.Step>
        <Steps.Step>重置密码</Steps.Step>
      </Steps>
      {step === 0 ? (
        <Auth sendPhoneCode={sendPhoneCode} sendEmailCode={sendEmailCode} validatePhone={validatePhone} validateEmail={validateEmail}></Auth>
      ) : (
        <View>sdfsdf</View>
      )}
    </CommonMain>
  )
}

export default MemberForgetPassword
