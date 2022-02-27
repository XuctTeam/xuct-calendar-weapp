/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-22 16:48:03
 * @LastEditTime: 2022-02-25 15:50:46
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Cell, Button, Textarea } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { useBack } from '@/utils/taro'

import './index.scss'

type PageStateProps = {
  location: string
}

type ModelProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type IProps = ModelProps & PageDispatchProps & PageOwnProps

interface Location {
  props: IProps
  state: PageStateProps
}

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: ''
    }
  }

  locationChage = (value: string) => {
    this.setState({
      location: value
    })
  }

  openLocation = () => {
    const that = this

    Taro.chooseLocation({
      success(res) {
        that.locationChage(res.address)
      },
      fail: function (res) {
        console.log(res)
        if (process.env.TARO_ENV === 'weapp') {
          that.openSetting()
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  openSetting = () => {
    const that = this
    Taro.getSetting({
      success: function (res) {
        var statu = res.authSetting
        if (!statu['scope.userLocation']) {
          Taro.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: function (tip) {
              if (tip.confirm) {
                Taro.openSetting({
                  success: function (data) {
                    if (data.authSetting['scope.userLocation'] === true) {
                      Taro.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //授权成功之后，再调用chooseLocation选择地方
                      Taro.chooseLocation({
                        success: function (rs) {
                          that.locationChage(rs.address)
                        }
                      })
                    } else {
                      Taro.showToast({
                        title: '授权失败',
                        icon: 'error',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  }

  saveLocation = () => {
    useBack(1, {
      location: this.state.location
    })
  }

  render() {
    return (
      <CommonMain className='vi-location-wrapper' title='地理坐标' to={4} fixed={false} left>
        <Cell.Group inset className='vi-location-wrapper_content'>
          <Textarea
            style={{ width: '100%', height: '300px' }}
            limit={300}
            placeholder='请输入地址'
            value={this.state.location}
            onInput={(e) => this.locationChage(e.detail.value)}
          ></Textarea>
        </Cell.Group>
        <View className='vi-location-wrapper_button'>
          <View className='save'>
            <Button color='success' block onClick={this.saveLocation.bind(this)}>
              保存
            </Button>
          </View>
          <Button color='warning' block onClick={this.openLocation.bind(this)}>
            获取位置
          </Button>
        </View>
      </CommonMain>
    )
  }
}

export default Location
