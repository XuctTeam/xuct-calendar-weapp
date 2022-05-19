/*
 * @Author: Derek Xu
 * @Date: 2022-05-19 13:09:40
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-19 22:29:46
 * @FilePath: \xuct-calendar-weapp\src\components\simpleverify\wechat\SimpleVerify.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import Taro from '@tarojs/taro'
import { Component } from 'react'
import { MovableArea, MovableView, View } from '@tarojs/components'
import { Passed } from '@taroify/icons'

import './index.scss'

interface IPageOption {
  success: () => void
}

/**
 * 组件状态
 */
interface StateOption {
  width: number
  boxWidth: number
  sliderData: any
  x: number
  flag: boolean
  isSlidePass: boolean
}

class SimpleVerify extends Component<IPageOption, StateOption> {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      boxWidth: 0,
      sliderData: {},
      x: 0,
      flag: false,
      isSlidePass: false
    }
  }

  componentDidMount() {
    Taro.nextTick(async () => {
      const query = Taro.createSelectorQuery().in(this)
      query
        .select('.sliding-box')
        .boundingClientRect((rec) => {
          console.log(11111111111)
          console.log(rec)
        })
        .exec()
      console.log(query)
    })
  }

  slidChange(e) {
    let { isSlidePass, width } = this.state
    if (isSlidePass) return
    const { x } = e.detail
    width = +x
    this.setState({ width: width })
  }

  async touchend() {
    let { isSlidePass, width, boxWidth } = this.state
    console.log(boxWidth, width)
    // 滑动成功
    if (boxWidth <= +width) {
      isSlidePass = true
      this.setState({ width: width, isSlidePass: isSlidePass })
    } else {
      this.setState({ x: 0 })
    }
  }

  render() {
    return (
      <MovableArea className='sliding-box'>
        <View className='label' style={{ zIndex: this.state.isSlidePass ? 1 : 2 }}>
          请按住滑块，拖到最右边
        </View>
        <View className='has-slip' style={{ width: this.state.isSlidePass ? '100%' : this.state.width + 'px' }}>
          {this.state.isSlidePass ? '验证通过' : ''}
        </View>
        <MovableView
          x={this.state.x}
          disabled={this.state.isSlidePass}
          onTouchEnd={this.touchend.bind(this)}
          onChange={this.slidChange.bind(this)}
          direction='horizontal'
          scale
          className='sliding-area'
        >
          {!this.state.isSlidePass ? (
            <View className='sliding-block'>{'>>'}</View>
          ) : (
            <View className='sliding-block sliding-icon'>
              <Passed></Passed>
            </View>
          )}
        </MovableView>
      </MovableArea>
    )
  }
}

export default SimpleVerify
