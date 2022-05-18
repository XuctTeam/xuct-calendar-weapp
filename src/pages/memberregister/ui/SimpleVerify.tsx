/*
 * @Author: Derek Xu
 * @Date: 2022-05-18 17:59:36
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-18 18:37:51
 * @FilePath: \xuct-calendar-weapp\src\pages\memberregister\ui\SimpleVerify.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { View } from '@tarojs/components'
import React, { FunctionComponent } from 'react'
import ReactSimpleVerify from 'react-simple-verify'
import 'react-simple-verify/dist/react-simple-verify.css'

interface IPageOption {
  height: number
  success: () => void
}

const SimpleVerify: FunctionComponent<IPageOption & { ref: React.Ref<ReactSimpleVerify> }> = React.forwardRef((props, ref) => {
  return <ReactSimpleVerify ref={ref} success={props.success}></ReactSimpleVerify>
})

export default SimpleVerify
