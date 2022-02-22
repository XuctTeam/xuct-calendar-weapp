/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-22 17:48:56
 * @LastEditTime: 2022-02-22 17:55:29
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { Button } from '@taroify/core'

interface IPageStateProps {
  type: string
}

const ActionButton: FunctionComponent<IPageStateProps> = (props) => {
  return (
    <View className='button'>
      <Button variant='text' color='warning'>
        警告按钮
      </Button>
      <Button variant='text' color='danger'>
        危险按钮
      </Button>
    </View>
  )
}

export default ActionButton
