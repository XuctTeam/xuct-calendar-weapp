import { FunctionComponent } from 'react'
import { View } from '@tarojs/components'

interface IPagOption {
  title: string
  color: string
}

const DayEventData: FunctionComponent<IPagOption> = (props) => {
  return (
    <View className='item-event-detail'>
      <View className='box'>
        <View className='color' style={{ background: `${props.color}` }}></View>
        <View className='content'>
          <View className='title'>{props.title}</View>
          <View>09:00-10:00</View>
        </View>
      </View>

      <View>sdfsdf</View>
    </View>
  )
}

export default DayEventData
