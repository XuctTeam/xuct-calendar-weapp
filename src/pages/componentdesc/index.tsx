/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-24 14:48:28
 * @LastEditTime: 2022-02-28 21:39:19
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import { View } from '@tarojs/components'
import { Button, Textarea } from '@taroify/core'
import CommonMain from '@/components/mixin'
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
    back({
      to: 1,
      data: {
        description: this.state.description
      }
    })
  }

  render() {
    return (
      <CommonMain className='vi-desc-wrapper' title='备注' to={1} fixed={false} left>
        <View className='vi-desc-wrapper_desc'>
          <Textarea
            value={this.state.description}
            style={{ width: '100%', height: '300px' }}
            limit={300}
            onInput={(e) => this.descChageHandler(e.detail.value)}
          ></Textarea>
        </View>
        <View className='vi-desc-wrapper_button'>
          <Button color='success' block onClick={this.back.bind(this)}>
            保存
          </Button>
        </View>
      </CommonMain>
    )
  }
}

export default Sheduledesc
