/*
 * @Author: Derek Xu
 * @Date: 2022-07-13 17:59:13
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-13 17:59:20
 * @FilePath: \xuct-calendar-weapp\src\utils\global.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
const globalData = {}

export function set(key, val) {
  globalData[key] = val
}

export function get(key) {
  return globalData[key]
}
