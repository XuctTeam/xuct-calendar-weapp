/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-07 09:15:39
 * @LastEditTime: 2022-01-14 14:58:44
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CommonHeader from '@/components/mixin'
import { View } from '@tarojs/components'
import { CaldavList } from './ui'
import { IDavCalendar } from '~/../@types/calendar'
import { DvaProps } from '~/../@types/dva'
import { action } from './actionCreater'

import './index.scss'

interface PageStateProps extends DvaProps {
  calendars: Array<IDavCalendar>
  refreshLoading: boolean
}

type PageDispatchProps = {
  listSync: () => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CaldavManager {
  props: IProps
  state: PageState
}

const connects: Function = connect

@connects(
  ({ calendar, loading }) => ({
    calendars: calendar.calendars,
    refreshLoading: loading.effects['calendar/listSync']
  }),
  (dispatch) => bindActionCreators(action, dispatch)
)
class CaldavManager extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.calendars.length === 0) {
      this.props.listSync()
    }
  }

  calendarRefresh = () => {
    this.props.listSync()
  }

  render() {
    return (
      <View className='vi-calendar-manager-wrapper'>
        <CommonHeader title='日历管理' to={2} fixed left></CommonHeader>
        <CaldavList calendars={this.props.calendars} loading={this.props.refreshLoading} calendarRefresh={this.calendarRefresh.bind(this)}></CaldavList>
      </View>
    )
  }
}

export default CaldavManager
