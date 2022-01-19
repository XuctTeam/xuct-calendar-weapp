/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-24 14:48:28
 * @LastEditTime: 2022-01-18 11:21:51
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import Router from 'tarojs-router-next'
import { View, Textarea } from '@tarojs/components'
import { Button } from '@taroify/core'
import CommonHeader from '@/components/mixin'
import { DvaProps } from '~/../@types/dva'
import { back } from '@/utils/taro'

import './index.scss'

type PageDispatchProps = {}

type PageOwnProps = {}

type PageStateProps = {
  description: string
}

type IProps = DvaProps & PageDispatchProps & PageOwnProps

interface Sheduledesc {
  props: IProps
  state: PageStateProps
}

class Sheduledesc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: ''
    }
  }

  descChageHandler = (val: string) => {
    this.setState({
      description: val
    })
  }

  back = () => {
    back(1, {
      description: this.state.description
    })
  }

  render() {
    return (
      <View className='vi-desc-wrapper'>
        <CommonHeader title='备注' to={1} fixed={false} left></CommonHeader>
        <View className='vi-desc-wrapper_desc'>
          <Textarea value={this.state.description} style={{ width: '100%' }} onInput={(e) => this.descChageHandler(e.detail.value)}></Textarea>
        </View>
        <View className='vi-desc-wrapper_button'>
          <Button color='success' block onClick={this.back.bind(this)}>
            保存
          </Button>
        </View>
      </View>
    )
  }
}

export default Sheduledesc
