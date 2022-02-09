/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-09 21:48:20
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, Form, Input } from '@taroify/core'
import CommonHeader from '@/components/mixin'
import { Toast } from '@taroify/core'
import { FormValidError } from '@taroify/core/form'

const GroupCreate: FunctionComponent = (props) => {
  function FormWithRules() {
    const asyncValidator = (val: any) =>
      new Promise<boolean>((resolve) => {
        Toast.loading('验证中...')

        setTimeout(() => {
          Toast.close('toast')
          resolve(/\d{6}/.test(val))
        }, 1000)
      })

    function onValidate(errors: FormValidError[]) {
      Toast.open({
        style: {
          textAlign: 'left'
        },
        message: JSON.stringify(errors, undefined, 2)
      })
    }
  }

  return (
    <View>
      <CommonHeader title='新建群组' fixed to={4} left></CommonHeader>
      <View>sdfsdf</View>
    </View>
  )
}

export default GroupCreate
