/*
 * @Author: Derek Xu
 * @Date: 2022-05-20 13:28:17
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-20 18:59:44
 * @FilePath: \xuct-calendar-weapp\src\components\simpleverify\webapp\SimpleVerify.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import barImage from './images/bar'
import successImage from './images/success'
import './index.scss'

interface IPageOption {
  width: number
  height: number
  borderColor?: string
  bgColor: string
  borderRadius: number
  tips: string
  barBackground: string
  movedColor: string
  successTips: string
  successIcon: string
  success?: () => void
}

interface IStateOption {
  isMouseEnter: boolean
  diff: number
}

class SimpleVerify extends Component<IPageOption, IStateOption> {
  /**
   * 默认参数
   */
  static defaultProps = {
    width: 340,
    height: 36,
    borderColor: '#E4E4E4',
    bgColor: '#F2F3F5',
    borderRadius: 4,
    tips: '拖动滑块验证',
    barBackground: `url(${barImage})`,
    movedColor: 'linear-gradient(100deg, #fd8649, #fb6e45, #fa5e42)',
    successTips: '完成验证',
    successIcon: successImage
  }

  constructor(props) {
    super(props)
    this.state = {
      /** 是否滑入 */
      isMouseEnter: false,
      /** 滑动距离 */
      diff: 0
    }
  }

  /**
   * 初始数据
   */
  /** x */
  private x1 = 0
  private x2 = 0
  private rectWidth = 0
  private barWidth = 0
  /** 鼠标是否按下 */
  private isMousedown = false
  /** 是否已经成功 */
  private isSuccess = false
  /** 最大滑动距离 */
  private max = 0
  /** 盒子样式 */
  private style = {
    width: this.props.width,
    height: this.props.height,
    border: `${this.props.borderColor} 1px solid`,
    backgroundColor: this.props.bgColor,
    borderRadius: this.props.borderRadius
  }
  /** 滑条盒子样式 */
  private slideBoxStyle = {
    borderRadius: this.props.borderRadius
  }
  /** 成功图标 */
  private iconStyle = {
    background: `url(${this.props.successIcon}) no-repeat`
  }

  componentDidMount() {
    setTimeout(() => {
      const query = Taro.createSelectorQuery().in(this)
      query
        .select('#webapp-simple-verify')
        .boundingClientRect((rec) => {
          console.log(rec)
          this.rectWidth = rec.width
        })
        .exec()

      query
        .select('#webapp-simple-verify-bar')
        .boundingClientRect((rec) => {
          console.log(rec)
          this.max = this.rectWidth - rec.width
        })
        .exec()
    }, 500)
  }

  /**
   * 鼠标离开
   */
  private mouseleave() {
    if (this.isSuccess || this.isMousedown) {
      return
    }
    if (this.isSuccess) {
      return
    }
    this.isMousedown = false
    this.setState({
      isMouseEnter: false,
      diff: 0
    })
  }

  /**
   * 鼠标按下
   */
  private mousedown(e: any) {
    if (this.isSuccess || this.isMousedown) {
      return
    }
    console.log(e)
    this.x1 = e.x || e.touches[0].clientX
    this.isMousedown = true
    this.setState({
      isMouseEnter: true
    })
  }

  /**
   * 鼠标移动
   */
  private mousemove(e: any) {
    if (!this.isMousedown || this.isSuccess) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    this.x2 = e.x || e.touches[0].clientX
    let diff = this.x2 - this.x1
    if (diff < 0) {
      diff = 0
    }
    if (diff >= this.max) {
      diff = this.max
      this.isSuccess = true
      this.props.success && this.props.success()
    }
    this.setState({
      diff
    })
  }

  render() {
    /** 滑条样式 */
    const slideStyle = {
      borderRadius: this.props.borderRadius,
      background: this.props.movedColor,
      left: 0 - this.rectWidth + 'px',
      opacity: this.state.isMouseEnter ? 1 : 0,
      transitionDuration: !this.state.isMouseEnter || !this.isMousedown ? '.3s' : '0s',
      transform: `translateX(${this.state.diff}px)`
    }
    /** 滑块样式 */
    const barStyle = {
      background: this.props.barBackground,
      transitionDuration: !this.state.isMouseEnter || !this.isMousedown ? '.3s' : '0s',
      transform: `translateX(${this.state.diff}px)`,
      backgroundAttachment: `fixed`,
      backgroundPosition: `center center`,
      backgroundSize: `cover`
    }
    /** 成功文本样式 */
    const textStyle = {
      opacity: this.isSuccess ? 1 : 0,
      transitionDuration: !this.state.isMouseEnter || !this.isMousedown ? '.3s' : '0s'
    }

    return (
      <View style={this.style} id='webapp-simple-verify' className='webapp-simple-verify'>
        <View className='verify-tips'>{this.props.tips}</View>
        <View style={this.slideBoxStyle} className='verify-box'>
          <View className='veriry-slide' style={slideStyle} />
        </View>
        <View className='verify-bar' onTouchStart={this.mousedown.bind(this)} onTouchMove={this.mousemove.bind(this)} onTouchEnd={this.mouseleave.bind(this)}>
          <View style={barStyle} className='icon' id='webapp-simple-verify-bar' />
        </View>
        <View style={textStyle} className='verify-success-tips'>
          <span style={this.iconStyle} />
          {this.props.successTips}
        </View>
      </View>
    )
  }
}

export default SimpleVerify
