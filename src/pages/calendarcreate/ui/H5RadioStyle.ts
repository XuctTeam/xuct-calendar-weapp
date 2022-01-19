/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-08 21:00:26
 * @LastEditTime: 2021-12-13 10:39:47
 * @LastEditors: Derek Xu
 */
import { styled } from 'linaria/react'
import { View } from '@tarojs/components'

interface H5RadioStyleProps {
  color: string
}

// @ts-ignore
export const H5RadioStyle = styled(View)<H5RadioStyleProps>`
  .weui-cells_checkbox .weui-check:checked + .weui-icon-checked:before {
    color: ${(props) => props.color};
  }
`
