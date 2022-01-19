/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-23 12:39:07
 * @FilePath: \react-lesson-20\src\app.tsx
 * @LastEditTime: 2022-01-11 13:35:20
 * @LastEditors: Derek Xu
 */
import { Component } from 'react'
import { Provider } from 'react-redux'
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // import plugin
import * as weekday from 'dayjs/plugin/weekday'

import 'dayjs/locale/zh-cn' // import locale
/* dva */
import dva from './utils/dva'
import models from './models/index'

import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models: models
})
/** 日期国际化 */
dayjs.extend(isLeapYear) // use plugin
dayjs.extend(weekday, { offset: 1 })
dayjs.locale('zh-cn') // use locale

const store = dvaApp.getStore()
class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App
