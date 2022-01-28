/* eslint-disable react/no-children-prop */
/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-28 10:47:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-01-28 15:00:54
 */
import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import Router, { NavigateType } from 'tarojs-router-next'
import { View } from '@tarojs/components'
import { ArrowRight } from '@taroify/icons'
import { Cell, Button, Image } from '@taroify/core'
import { showToast } from '@/utils/taro'
import CommonHeader from '@/components/mixin'
import { updateName, baseUserInfo, logout, auths } from '@/api/user'
import { DvaProps } from '../../../@types/dva'
import { IUserInfo, IUserAuth } from '../../../@types/user'
import { action } from './actionCreater'
import { ModifyName } from './ui'

import './index.scss'

interface ModelProps extends DvaProps {
  userInfo: IUserInfo
  auths: Array<IUserAuth>
  logouting: boolean
}
type PageDispatchProps = {
  remove: (payload) => void
  save: (payload) => void
}
type PageOwnProps = {}
type PageStateProps = {
  nameOpen: boolean
}
type IProps = ModelProps & PageDispatchProps & PageOwnProps

interface User {
  props: IProps
  state: PageStateProps
}

const connects: Function = connect

@connects(
  ({ common, loading }) => ({
    userInfo: common.userInfo,
    auths: common.auths,
    logouting: loading.effects['common/removeStoreSync']
  }),
  (dispatch) => bindActionCreators(action, dispatch)
)
class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameOpen: false
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  logout = () => {
    const that = this
    Taro.showModal({
      title: '提示',
      cancelColor: 'ff6666',
      confirmColor: 'ffffff',
      showCancel: true,
      confirmText: '确定',
      cancelText: '返回',
      content: '确定退出吗？',
      success: function (res) {
        if (res.confirm || res['errMsg'] === 'confirm') {
          that._logout()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  cleanUserInfo() {
    this.props.remove({
      accessToken: '',
      refreshToken: '',
      userInfo: null,
      auths: []
    })
    if (this.props.logouting) {
      Taro.showToast({
        title: '退出成功',
        icon: 'success',
        duration: 1000
      })
      Taro.navigateBack({ delta: 1 })
    }
  }

  /**
   * 修改名称关闭回调
   */
  modifyNameClose = () => {
    this.setState({
      nameOpen: false
    })
  }

  toModifyPhone = async (phone: string) => {
    try {
      const result = await Router.toBindphone({
        data: phone
      })
      if (result && result.data === '1') {
        auths()
          .then((res) => {
            this.props.save({
              auths: res as any as Array<IUserAuth>
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } catch (error) {
      console.log(error)
      Router.toAboutme({ type: NavigateType.switchTab })
    }
  }

  /**
   * 修改账号
   * @param username
   * @returns
   */
  toModifyUserName = async (username: string) => {
    try {
      const result = await Router.toBindusername({
        data: { username: username, edit: !username }
      })
      if (result && result.data === '1') {
        auths()
          .then((res) => {
            this.props.save({
              auths: res as any as Array<IUserAuth>
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    } catch (err) {
      console.log(err)
      Router.toAboutme({ type: NavigateType.switchTab })
    }
  }

  /**
   * 修改名称
   * @param name
   */
  modifyNameHandler = (name: string) => {
    if (!name) {
      showToast('名称不能为空')
      return
    }
    console.log(name)
    updateName(name)
      .then(() => {
        /** 刷新用户 */
        this._updateUserInfo()
      })
      .catch((err) => {
        console.log(err)
      })
    this.setState({
      nameOpen: false
    })
  }

  _logout = () => {
    logout()
      .then(() => {
        this.cleanUserInfo()
        return
      })
      .catch((error) => {
        console.log(error)
        if (error.status === 401) {
          this.cleanUserInfo()
          return
        }
        showToast('退出失败')
      })
  }

  _updateUserInfo() {
    baseUserInfo()
      .then((res) => {
        const { id, name, avatar } = res
        console.log(name)
        this.props.save({
          userInfo: {
            id,
            name,
            avatar
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { avatar, name } = this.props.userInfo || { avatar: '', name: '' }
    const wxAuth = this.props.auths.find((i) => i.identityType === 'open_id')
    const phoneAuth: IUserAuth = this.props.auths.find((i) => i.identityType === 'phone') || {
      username: '',
      nickName: '',
      avatar: '',
      identityType: 'phone'
    }
    const userNameAuth: IUserAuth = this.props.auths.find((i) => i.identityType === 'user_name') || {
      username: '',
      nickName: '',
      avatar: '',
      identityType: 'user_name'
    }

    return (
      <View className='vi-user-wrapper'>
        <CommonHeader title='我的' fixed={false} left to={2}></CommonHeader>
        <View className='vi-user-wrapper_menu'>
          <Cell title='头像' align='center'>
            <Image lazyLoad style={{ width: '40px', height: '40px' }} src={avatar} round />
          </Cell>
          <Cell title='名称' rightIcon={<ArrowRight />} clickable onClick={() => this.setState({ nameOpen: true })}>
            {name}
          </Cell>
          <Cell title='登录账号' rightIcon={<ArrowRight />} clickable onClick={() => this.toModifyUserName(userNameAuth.username)}>
            {userNameAuth.username ? userNameAuth.username : '未绑定'}
          </Cell>
          <Cell title='手机号' rightIcon={<ArrowRight />} clickable onClick={this.toModifyPhone.bind(this, phoneAuth.username)}>
            {phoneAuth.username ? phoneAuth.username : '未绑定'}
          </Cell>
          <Cell title='微信' rightIcon={<ArrowRight />} clickable>
            {wxAuth ? wxAuth.nickName : ''}
          </Cell>
          <Cell title='设置密码' rightIcon={<ArrowRight />} clickable onClick={() => Router.toModifypassword()}></Cell>
        </View>
        <View className='vi-user-wrapper_button'>
          <Button color='warning' block onClick={this.logout.bind(this)}>
            退出登录
          </Button>
        </View>
        <ModifyName
          open={this.state.nameOpen}
          name={name}
          closeHanler={this.modifyNameClose.bind(this)}
          modifyNameHandler={this.modifyNameHandler.bind(this)}
        ></ModifyName>
      </View>
    )
  }
}

export default User
