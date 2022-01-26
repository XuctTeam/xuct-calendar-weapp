/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-01-26 13:53:52
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { Button, View } from '@tarojs/components'
import CommonHeader from '@/components/mixin'
import { Image } from '@taroify/core'
import './index.scss'

const CustomerService: FunctionComponent = () => {
  return (
    <>
      <CommonHeader title='客服服务' fixed to={2} left></CommonHeader>
      <View className='vi-customer-service-warpper'>
        <View className='vi-customer-service-warpper_content'>
          <View className='image'>
            <Image src='http://images.xuct.com.cn/weapp.jpg' />
          </View>
          {process.env.TARO_ENV === 'weapp' && (
            <Button className='btn-max-w' openType='contact'>
              在线客服
            </Button>
          )}
        </View>
      </View>
    </>
  )
}

export default CustomerService
