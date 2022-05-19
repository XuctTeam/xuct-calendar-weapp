/*
 * @Author: Derek Xu
 * @Date: 2022-05-19 09:54:48
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-19 16:34:13
 * @FilePath: \xuct-calendar-weapp\src\pages\memberregister\ui\SimpleVerify.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent } from 'react'
import { WechatSimpleVerify } from '@/components/simpleverify'

interface IPageOption {
  success: () => void
}

const SimpleVerify: FunctionComponent<IPageOption> = (props) => {
  return <WechatSimpleVerify {...props}></WechatSimpleVerify>
}

export default SimpleVerify
