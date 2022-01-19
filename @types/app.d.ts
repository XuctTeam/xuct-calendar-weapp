/*
 * @Description:
 * @Author: Xutao
 * @Date: 2021-07-30 16:40:15
 * @FilePath: \react-lesson-20\@types\global.d.ts
 * @LastEditTime: 2021-12-02 22:12:03
 * @LastEditors: Derek Xu
 */
import Taro from '@tarojs/taro'

export interface Rect {
  /** 下边界坐标，单位：px */
  bottom: number
  /** 高度，单位：px */
  height: number
  /** 左边界坐标，单位：px */
  left: number
  /** 右边界坐标，单位：px */
  right: number
  /** 上边界坐标，单位：px */
  top: number
  /** 宽度，单位：px */
  width: number
}

export interface IAppInfo {
  ios?: boolean
  /** 系统信息 */
  sysInfo?: Taro.getSystemInfoSync.Result
  /** 微信胶囊 */
  capsulePosition?: Rect
  /** 导航栏高度 */
  navBarHeight?: Number
  /** 下边界高度 */
  navBarExtendHeight?: number
}
