/*
 * @Author: Derek Xu
 * @Date: 2022-05-19 13:09:40
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-19 18:29:43
 * @FilePath: \xuct-calendar-weapp\src\components\simpleverify\wechat\SimpleVerify.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import Taro from '@tarojs/taro'
import { MovableArea, MovableView, View } from '@tarojs/components'
import './index.scss'

interface IPageOption {
  success: () => void
}

const SimpleVerify: FunctionComponent<IPageOption> = (props) => {
  const boxWidthRef = useRef<number>(80)
  const areaWidthRef = useRef<number>(100)
  const [slidingDistance, setSlidingDistance] = useState<number>(0)
  const [xDistance, setXDistance] = useState<number>(0)
  const [slidingWidth, setSlidingWidth] = useState<number>(0)
  const [sliderValdationText, setSliderValdationText] = useState<string>('拖动滑块验证')
  const [areaBgColor, setAreaBgColor] = useState<string>('#fff')
  const [areaTextColor, setAreaTextColor] = useState<string>('#666')

  useEffect(() => {
    let res = Taro.getSystemInfoSync()
    console.log(res)
    setSlidingWidth(Math.floor(res.windowWidth - 10 - boxWidthRef.current / 2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sliderDrag = (e) => {
    setSlidingDistance(e.detail.x)
  }

  const sliderDragOver = () => {
    console.log(slidingDistance, slidingWidth)
    if (slidingDistance >= slidingWidth) {
      setSliderValdationText('验证成功')
      setAreaBgColor('#fd8649')
      setAreaTextColor('#fff')

      setTimeout(() => {
        reset()
        props.success()
      }, 600)
    } else {
      setXDistance(0)
    }
  }

  const reset = () => {
    setXDistance(0)
    setAreaBgColor('#fff')
    setAreaTextColor('#666')
    setSliderValdationText('拖动滑块验证')
  }

  return (
    <View className='box'>
      <MovableArea className='validation-content' style={{ width: areaWidthRef.current + `%`, backgroundColor: areaBgColor, color: areaTextColor }}>
        {sliderValdationText}
        <MovableView
          className='validation-box'
          style={{ width: boxWidthRef.current / 2 + 'px' }}
          friction={100}
          direction='horizontal'
          x={xDistance}
          damping={500}
          onChange={sliderDrag}
          onTouchEnd={sliderDragOver}
        >
          <View className='validation-movable-icon'></View>
        </MovableView>
      </MovableArea>
    </View>
  )
}

export default SimpleVerify
