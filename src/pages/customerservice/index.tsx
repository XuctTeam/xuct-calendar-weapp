/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-04-12 14:13:33
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { Button, View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Image } from '@taroify/core'
import { DEFAULT_QR_IMAGE } from '@/constants/index'
import './index.scss'

const CustomerService: FunctionComponent = () => {
  return (
    <CommonMain className='vi-customer-service-warpper' title='客服服务' fixed to={4} left>
      <View className='vi-customer-service-warpper_content'>
        <View className='image'>
          <Image src={DEFAULT_QR_IMAGE} />
        </View>
        {process.env.TARO_ENV === 'weapp' && (
          <View className='button'>
            <Button type='primary' openType='contact'>
              在线客服
            </Button>
          </View>
        )}
      </View>
    </CommonMain>
  )
}

export default CustomerService
