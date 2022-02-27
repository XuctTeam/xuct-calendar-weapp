/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-22 17:48:56
 * @LastEditTime: 2022-02-26 22:49:23
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import GroupButton from './GroupButton'

interface IPageProps {
  type: string
  state: number
}

const ActionButton: FunctionComponent<IPageProps> = (props) => {
  return <View className='button'>{props.type === 'GROUP' ? <GroupButton state={props.state}></GroupButton> : <></>}</View>
}

export default ActionButton
