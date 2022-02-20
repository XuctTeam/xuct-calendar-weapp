/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-07 09:15:50
 * @LastEditTime: 2022-02-19 20:43:39
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import Router from 'tarojs-router-next'
import { View, Textarea } from '@tarojs/components'
import { Cell, Field, Button, Switch, Input } from '@taroify/core'
import { get, update, create } from '@/api/calendar'
import CommonMain from '@/components/mixin'
import { IUserInfo } from '~/../@types/user'
import { showToast, back } from '@/utils/taro'
import { ColorRadio, AlarmRadio } from './ui'

import './index.scss'

type PageStateProps = {
  userInfo: IUserInfo
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  loading?: boolean
  title: string
  id: string
  name: string
  calendarId: string
  major: number
  color: string
  alarmTime: number
  alarmType: number
  isShare: number
  display: number
  memberId: string
  createMemberId: string
  description: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CaldavCreate {
  props: IProps
  state: PageState
}

const connects: Function = connect

@connects(({ common }) => ({ userInfo: common.userInfo }), () => ({}))
class CaldavCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      title: '新增日历',
      id: '',
      name: '',
      createMemberId: '',
      color: 'ee0a24',
      calendarId: '',
      description: '',
      major: 0,
      display: 1,
      alarmType: 1,
      alarmTime: 15,
      isShare: 0,
      memberId: ''
    }
  }

  componentDidMount() {
    const data = Router.getData()
    if (data) {
      this.setState({ ...data, title: '日历编辑' })
      Taro.setNavigationBarTitle({
        title: '日历编辑'
      })
      return
    }
    const { calendarId } = Router.getParams()
    if (!calendarId) return
    get(calendarId)
      .then((res) => {
        this.setState({ ...res, title: '日历编辑' })
        Taro.setNavigationBarTitle({
          title: '日历编辑'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**
   * 颜色选择
   * @param value
   */
  colorChange = (value: string) => {
    this.setState({
      color: value
    })
  }

  setName = (name: string) => {
    this.setState({
      name
    })
  }

  setDescription = (description: string) => {
    this.setState({
      description
    })
  }

  setShare = (value: boolean) => {
    this.setState({
      isShare: value ? 1 : 0
    })
  }

  setDisplay = (value: boolean) => {
    this.setState({
      display: value ? 1 : 0
    })
  }

  alarmTimeChange = (value: string) => {
    this.setState({
      alarmTime: Number.parseInt(value)
    })
  }

  alarmTypeChage = (value: string) => {
    this.setState({
      alarmType: Number.parseInt(value)
    })
  }

  commit = () => {
    if (!this._checkForm()) {
      return
    }

    this.setState({
      loading: true
    })
    const data = Object.assign({}, this.state, { createMemberName: this.props.userInfo.name, alarmType: this.state.alarmType + '' })
    delete data.loading
    if (this.state.id) {
      update(data)
        .then(() => {
          return this._success('修改成功')
        })
        .catch((error) => {
          return this._error(error)
        })
      return
    }
    create({ ...data, id: '000' })
      .then(() => {
        return this._success('新增成功')
      })
      .catch((err) => {
        return this._error(err)
      })
  }

  _success(msg: string) {
    Taro.showToast({
      title: msg,
      icon: 'success'
    })
    setTimeout(() => {
      back(2, {
        data: '1'
      })
    }, 1000)
    return true
  }

  _error(err: string) {
    this.setState({
      loading: false
    })
    showToast(err)
    return false
  }

  _checkForm() {
    if (!this.state.name) {
      showToast('名称不能为空')
      return false
    }
    if (!this.state.description) {
      showToast('描述不能为空')
      return false
    }
    return true
  }

  render() {
    return (
      <CommonMain className='vi-calendar-wrapper' title={this.state.title} to={4} fixed left>
        <View className='vi-calendar-wrapper_container'>
          <Cell.Group title='颜色'>
            <Cell>
              <ColorRadio onChage={this.colorChange.bind(this)} defaultColor={this.state.color}></ColorRadio>
            </Cell>
          </Cell.Group>
          <Cell.Group title='名称'>
            <Cell>
              <Field required>
                <Input placeholder='请输入文本' maxlength={20} value={this.state.name} onChange={(e) => this.setName(e.detail.value)} />
              </Field>
            </Cell>
          </Cell.Group>
          <Cell.Group title='描述'>
            <Cell>
              <Textarea
                style={{ width: '100%', height: '40px' }}
                value={this.state.description}
                maxlength={200}
                onInput={(e) => {
                  this.setDescription(e.detail.value)
                }}
              />
            </Cell>
          </Cell.Group>
          <Cell title='显示方式'>
            <Switch size={24} checked={this.state.display === 1} onChange={this.setDisplay}></Switch>
          </Cell>

          <Cell title='共享方式'>
            <Switch size={24} checked={this.state.isShare === 1} onChange={this.setShare} />
          </Cell>
          <Cell.Group title='提醒方式'>
            <Cell>
              <AlarmRadio type='alarmType' defaultValue={this.state.alarmType.toString()} onChange={this.alarmTypeChage.bind(this)}></AlarmRadio>
            </Cell>
          </Cell.Group>
          <Cell.Group title='提醒时间'>
            <Cell>
              <AlarmRadio
                type='alarmTime'
                disable={this.state.alarmType.toString() === '0'}
                defaultValue={this.state.alarmTime.toString()}
                onChange={this.alarmTimeChange.bind(this)}
              ></AlarmRadio>
            </Cell>
          </Cell.Group>
        </View>
        <View className='vi-calendar-wrapper_button'>
          <Button color='primary' block loading={this.state.loading} onClick={this.commit.bind(this)}>
            保存
          </Button>
        </View>
      </CommonMain>
    )
  }
}

export default CaldavCreate
