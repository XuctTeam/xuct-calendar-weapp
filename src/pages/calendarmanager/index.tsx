/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-07 09:15:39
 * @LastEditTime: 2022-02-16 17:30:39
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { IDavCalendar } from '~/../@types/calendar'
import { DvaProps } from '~/../@types/dva'
import { View } from '@tarojs/components'
import { CaldavList } from './ui'
import { action } from './actionCreater'

import './index.scss'

interface PageStateProps extends DvaProps {
  calendars: Array<IDavCalendar>
  refreshLoading: boolean
}

type PageDispatchProps = {
  listSync: () => void
  updateSycn: (id: string) => void
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
  componentDidMount() {
    if (this.props.calendars.length === 0) {
      this.props.listSync()
    }
  }

  calendarRefresh = () => {
    this.props.listSync()
  }

  /**
   * 编辑日历
   * @param id
   */
  editCalendar = async (id: string) => {
    const calendar: IDavCalendar | undefined = this.props.calendars.find((item) => item.id === id)
    if (!calendar) return
    try {
      const result = await Router.toCalendarcreate({
        data: calendar,
        params: {
          calendarId: calendar.id
        }
      })
      //编辑成功
      if (result && result.data === '1') {
        this.props.updateSycn(id)
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <CommonMain className='vi-calendar-manager-wrapper' title='日历管理' to={2} fixed left>
        <CaldavList
          calendars={this.props.calendars}
          loading={this.props.refreshLoading}
          calendarRefresh={this.calendarRefresh.bind(this)}
          editCalendar={this.editCalendar.bind(this)}
        ></CaldavList>
      </CommonMain>
    )
  }
}

export default CaldavManager
