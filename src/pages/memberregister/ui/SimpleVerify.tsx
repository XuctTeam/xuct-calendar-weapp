/*
 * @Author: Derek Xu
 * @Date: 2022-05-19 09:54:48
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-20 14:06:12
 * @FilePath: \xuct-calendar-weapp\src\pages\memberregister\ui\SimpleVerify.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent } from 'react'
import { WechatSimpleVerify, WepabbSimpleVerify } from '@/components/simpleverify'
import { useWebEnv } from '@/utils/taro'

interface IPageOption {
  success: () => void
}

const SimpleVerify: FunctionComponent<IPageOption> = (props) => {
  const webEnv = useWebEnv()

  return webEnv ? <WepabbSimpleVerify {...props}></WepabbSimpleVerify> : <WechatSimpleVerify {...props}></WechatSimpleVerify>
}

export default SimpleVerify
