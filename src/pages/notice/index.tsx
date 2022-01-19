/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-03 15:04:45
 * @LastEditors: Derek Xu
 * @LastEditTime: 2021-11-25 21:21:34
 */
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Button, Text } from '@tarojs/components'
import { action } from './actionCreater'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  accessToken: string
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Notice {
  props: IProps
}

const connects: Function = connect

@connects(
  ({ common }) => ({
    accessToken: common.accessToken
  }),
  (dispatch) => bindActionCreators(action, dispatch)
)
class Notice extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    console.log(!this.props.accessToken)
    if (!this.props.accessToken) {
      return <View>sdfs</View>
    }

    return (
      <View className='notice'>
        <Button className='add_btn' onClick={this.props.add}>
          +
        </Button>
        <Button className='dec_btn' onClick={this.props.dec}>
          -
        </Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>
          async
        </Button>
        <View></View>
        <View>
          <Text>Hello, World</Text>
        </View>
      </View>
    )
  }
}

export default Notice
