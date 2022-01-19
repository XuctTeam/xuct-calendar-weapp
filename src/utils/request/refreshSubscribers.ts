/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-12 12:49:07
 * @LastEditTime: 2022-01-19 10:21:48
 * @LastEditors: Derek Xu
 */
import dva from '@/utils/dva'
import { tokenRefresh } from '@/api/token'
import dayjs from 'dayjs'
import http from './index'
import { getStorage } from '../taro'

interface ITask {
  url: string
  opt: Taro.RequestParams
  resolve: (value: unknown) => void
}

class RefreshSubscribers {
  private _refresh: number = 0
  private _isRefreshing: boolean = false
  private _refreshSubscribers: Array<any> = []

  set isRefreshing(value: boolean) {
    this._isRefreshing = value
  }

  get isRefreshing() {
    return this._isRefreshing
  }

  get refresh() {
    return this._refresh
  }

  /**
   * @description 清除所有缓存任务
   */
  cleanTask() {
    this._refreshSubscribers.forEach((task) => {
      task.reject(new Error('refresh error'))
    })
    this._isRefreshing = false
    this._refreshSubscribers.length = 0
  }

  /**
   * @description 添加异步任务
   * @param promiseTask
   *
   */
  pushTask(promiseTask: ITask) {
    this._refreshSubscribers.push(promiseTask)
  }

  /**
   * @description 进行刷新
   */
  pageRefreshToken() {
    const reToken: string = getStorage('refreshToken')
    const dispatch = dva.getDispatch()
    tokenRefresh(reToken.replace('Bearer ', ''))
      .then((res) => {
        console.log('taro util:: refresh token success , refreshToken  = ' + reToken)
        /**1. 更新缓存 */
        dispatch({
          type: 'common/saveStorageSync',
          payload: {
            accessToken: 'Bearer ' + res.access_token,
            refreshToken: 'Bearer ' + res.refresh_token
          }
        })
        this._refresh = dayjs().unix()
        setTimeout(() => {
          this.onRrefreshed()
        }, 200)
      })
      .catch((error) => {
        throw error
      })
  }

  /**
   * @description 刷新成功后回调
   */
  onRrefreshed() {
    if (this._refreshSubscribers.length > 0) {
      this._refreshSubscribers.forEach((task) => {
        task.resolve(http.exchage(task.url, task.opt))
      })
      this._isRefreshing = false
      this._refreshSubscribers.length = 0
    }
  }

  /**
   * @description 封装异常处理
   * @param response
   * @returns
   */
  async convertError(response) {
    if (!response.status || response.source) return response
    return await response.json().then((json) => {
      return {
        status: response.status,
        code: json.code,
        statusText: json.msg ? json.msg : json.error ? json.error : ''
      }
    })
  }
}

export default new RefreshSubscribers()
