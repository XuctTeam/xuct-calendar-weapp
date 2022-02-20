/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-19 20:45:11
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { Button, View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Image } from '@taroify/core'
import './index.scss'

const CustomerService: FunctionComponent = () => {
  return (
    <CommonMain className='vi-customer-service-warpper' title='客服服务' fixed to={4} left>
      <View className='vi-customer-service-warpper_content'>
        <View className='image'>
          <Image src='http://images.xuct.com.cn/weapp.jpg' />
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
