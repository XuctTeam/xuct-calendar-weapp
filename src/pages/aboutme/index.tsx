/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 16:36:43
 * @FilePath: \react-lesson-20\src\pages\authorize\index.tsx
 * @LastEditTime: 2022-03-04 10:20:08
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from '@tarojs/components'
import { DvaProps, IUserAuth, IUserInfo } from '~/../@types/dva'
import { userInfo } from '@/api/user'
import { action } from './actionCreater'
import { User, Menu } from './ui'

import './index.scss'

interface ModelProps extends DvaProps {
  accessToken: string
  userInfo: IUserInfo
}

type PageDispatchProps = {
  saveStorageSync: (payload) => void
  saveColor: (payload) => void
}

type PageOwnProps = {}

type IProps = ModelProps & PageDispatchProps & PageOwnProps

type PageState = {}

interface Index {
  props: IProps
  state: PageState
}

const connects: Function = connect

@connects(
  ({ common }) => ({
    accessToken: common.accessToken,
    userInfo: common.userInfo
  }),
  (dispatch) => bindActionCreators(action, dispatch)
)
class Index extends Component {
  componentDidShow() {
    if (this.props.accessToken && !this.props.userInfo) {
      this._getUserInfo()
    }
  }

  _getUserInfo = () => {
    userInfo()
      .then((res) => {
        this._saveUserStore(res.member.id, res.member.name, res.member.avatar, res.auths)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /**
   * 保存用户信息至缓存
   * @param id
   * @param name
   * @param phone
   * @param avatar
   */
  _saveUserStore = (id: string, name: string, avatar: string, auths: Array<IUserAuth>): void => {
    this.props.saveStorageSync({
      userInfo: {
        id,
        name,
        avatar
      },
      auths: auths
    })
  }

  render() {
    return (
      <View className='vi-aboutme-wrapper'>
        <User
          hasLogin={!!this.props.userInfo}
          nickname={this.props.userInfo ? this.props.userInfo.name : ''}
          avatar={this.props.userInfo ? this.props.userInfo.avatar : ''}
        ></User>
        <Menu user={this.props.userInfo}></Menu>
      </View>
    )
  }
}

export default Index
