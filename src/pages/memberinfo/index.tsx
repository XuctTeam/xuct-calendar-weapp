/* eslint-disable react-hooks/rules-of-hooks */
/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-11-28 10:47:10
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 18:07:24
 */
import { Fragment, FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import Router, { NavigateType } from 'tarojs-router-next'
import { View } from '@tarojs/components'
import CommonMain from '@/components/mixin'
import { Avatar, Button, Cell } from '@taroify/core'
import { ArrowRight } from '@taroify/icons'
import { DEFAULT_AVATAR, USER_LOGOUT_EVENT } from '@/constants/index'
import { useToast, useBack } from '@/utils/taro'
import { IDvaCommonProps, IUserInfo, IUserAuth } from '~/../@types/dva'
import { updateName, baseUserInfo, logout, auths } from '@/api/user'
import { ModifyName } from './ui'

const MemberInfo: FunctionComponent = () => {
  const [nameOpen, setNameOpen] = useState<boolean>(false)
  const userInfo = useSelector<IDvaCommonProps>((state) => state.common.userInfo)
  const userAuth = useSelector<IDvaCommonProps>((state) => state.common.auths)
  const dispatch = useDispatch()

  const callLogout = () => {
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
          _logout()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  const cleanUserInfo = () => {
    dispatch({
      type: 'common/removeStoreSync',
      payload: {
        accessToken: '',
        refreshToken: '',
        userInfo: null,
        auths: []
      }
    })
    if (this.props.logouting) {
      useToast({ title: '退出成功', icon: 'success' })
      Taro.eventCenter.trigger(USER_LOGOUT_EVENT)
      useBack({ to: 4 })
    }
  }

  /**
   * 修改名称关闭回调
   */
  const modifyNameClose = () => {
    setNameOpen(false)
  }

  const toModifyPhone = async (phone: string) => {
    try {
      const result = await Router.toMemberbindphone({
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
  const toModifyUserName = async (username: string) => {
    try {
      const result = await Router.toMemberbindusername({
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
  const modifyNameHandler = (name: string) => {
    if (!name) {
      useToast({ title: '名称不能为空' })
      return
    }
    console.log(name)
    updateName(name)
      .then(() => {
        /** 刷新用户 */
        _updateUserInfo()
        this.props.updateCalendarMemberName({
          createMemberId: this.props.userInfo.id,
          createMemberName: name
        })
      })
      .catch((err) => {
        console.log(err)
      })
    setNameOpen(false)
  }

  const _logout = () => {
    logout()
      .then(() => {
        cleanUserInfo()
        return
      })
      .catch((error) => {
        console.log(error)
        if (error.status === 401) {
          cleanUserInfo()
          return
        }
        useToast({ title: '退出失败' })
      })
  }

  const _updateUserInfo = () => {
    baseUserInfo()
      .then((res) => {
        const { id, name, avatar } = res
        console.log(name)
        dispatch({
          type: 'common/saveStorageSync',
          payload: {
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

  return (
    <Fragment>
      <CommonMain className='vi-user-wrapper' title='我的' fixed={false} left to={4}>
        <View className='vi-user-wrapper_menu'>
          <Cell title='头像' align='center'>
            <Avatar src={avatar ? avatar : defaultAvatar} />
          </Cell>
          <Cell title='名称' rightIcon={<ArrowRight />} clickable onClick={() => setNameOpen(true)}>
            {name}
          </Cell>
          <Cell title='登录账号' rightIcon={<ArrowRight />} clickable onClick={() => toModifyUserName('')}>
            {userNameAuth.username ? userNameAuth.username : '未绑定'}
          </Cell>
          <Cell title='手机号' rightIcon={<ArrowRight />} clickable onClick={() => toModifyPhone('')}>
            {phoneAuth.username ? phoneAuth.username : '未绑定'}
          </Cell>
          <Cell title='微信' rightIcon={<ArrowRight />} clickable>
            {wxAuth ? wxAuth.nickName : ''}
          </Cell>
          <Cell title='设置密码' rightIcon={<ArrowRight />} clickable onClick={() => Router.toMembermodifypassword()}></Cell>
        </View>
        <View className='vi-user-wrapper_button'>
          <Button color='warning' block onClick={() => callLogout()}>
            退出登录
          </Button>
        </View>
      </CommonMain>
      <ModifyName open={nameOpen} name={name} closeHanler={modifyNameClose} modifyNameHandler={modifyNameHandler}></ModifyName>
    </Fragment>
  )
}

// @connects(
//   ({ common, loading }) => ({
//     userInfo: common.userInfo,
//     auths: common.auths,
//     logouting: loading.effects['common/removeStoreSync']
//   }),
//   (dispatch) => bindActionCreators(action, dispatch)
// )
// class User extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       nameOpen: false
//     }
//   }

//   componentWillUnmount() {}

//   componentDidShow() {}

//   componentDidHide() {}

//   logout = () => {
//     const that = this
//     Taro.showModal({
//       title: '提示',
//       cancelColor: 'ff6666',
//       confirmColor: 'ffffff',
//       showCancel: true,
//       confirmText: '确定',
//       cancelText: '返回',
//       content: '确定退出吗？',
//       success: function (res) {
//         if (res.confirm || res['errMsg'] === 'confirm') {
//           that._logout()
//         } else if (res.cancel) {
//           console.log('用户点击取消')
//         }
//       }
//     })
//   }

//   cleanUserInfo() {
//     this.props.remove({
//       accessToken: '',
//       refreshToken: '',
//       userInfo: null,
//       auths: []
//     })
//     if (this.props.logouting) {
//       useToast({ title: '退出成功', icon: 'success' })
//       Taro.eventCenter.trigger(USER_LOGOUT_EVENT)
//       useBack({ to: 4 })
//     }
//   }

//   /**
//    * 修改名称关闭回调
//    */
//   modifyNameClose = () => {
//     this.setState({
//       nameOpen: false
//     })
//   }

//   toModifyPhone = async (phone: string) => {
//     try {
//       const result = await Router.toMemberbindphone({
//         data: phone
//       })
//       if (result && result.data === '1') {
//         auths()
//           .then((res) => {
//             this.props.save({
//               auths: res as any as Array<IUserAuth>
//             })
//           })
//           .catch((err) => {
//             console.log(err)
//           })
//       }
//     } catch (error) {
//       console.log(error)
//       Router.toAboutme({ type: NavigateType.switchTab })
//     }
//   }

//   /**
//    * 修改账号
//    * @param username
//    * @returns
//    */
//   toModifyUserName = async (username: string) => {
//     try {
//       const result = await Router.toMemberbindusername({
//         data: { username: username, edit: !username }
//       })
//       if (result && result.data === '1') {
//         auths()
//           .then((res) => {
//             this.props.save({
//               auths: res as any as Array<IUserAuth>
//             })
//           })
//           .catch((err) => {
//             console.log(err)
//           })
//       }
//     } catch (err) {
//       console.log(err)
//       Router.toAboutme({ type: NavigateType.switchTab })
//     }
//   }

//   /**
//    * 修改名称
//    * @param name
//    */
//   modifyNameHandler = (name: string) => {
//     if (!name) {
//       useToast({ title: '名称不能为空' })
//       return
//     }
//     console.log(name)
//     updateName(name)
//       .then(() => {
//         /** 刷新用户 */
//         this._updateUserInfo()
//         this.props.updateCalendarMemberName({
//           createMemberId: this.props.userInfo.id,
//           createMemberName: name
//         })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//     this.setState({
//       nameOpen: false
//     })
//   }

//   _logout = () => {
//     logout()
//       .then(() => {
//         this.cleanUserInfo()
//         return
//       })
//       .catch((error) => {
//         console.log(error)
//         if (error.status === 401) {
//           this.cleanUserInfo()
//           return
//         }
//         useToast({ title: '退出失败' })
//       })
//   }

//   _updateUserInfo() {
//     baseUserInfo()
//       .then((res) => {
//         const { id, name, avatar } = res
//         console.log(name)
//         this.props.save({
//           userInfo: {
//             id,
//             name,
//             avatar
//           }
//         })
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   render() {
//     const { avatar, name } = this.props.userInfo || { avatar: '', name: '' }
//     const wxAuth = this.props.auths.find((i) => i.identityType === 'open_id')
//     const phoneAuth: IUserAuth = this.props.auths.find((i) => i.identityType === 'phone') || {
//       username: '',
//       nickName: '',
//       avatar: '',
//       identityType: 'phone'
//     }
//     const userNameAuth: IUserAuth = this.props.auths.find((i) => i.identityType === 'user_name') || {
//       username: '',
//       nickName: '',
//       avatar: '',
//       identityType: 'user_name'
//     }
//   }
// }

export default MemberInfo
