/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-14 17:31:01
 * @LastEditTime: 2022-03-15 15:17:24
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Button } from '@taroify/core'
import './index.scss'

export type ButtonOption = {
  name: string
  value: string
}

interface IButtonGroupOption {
  actived: number
  buttons: ButtonOption[]
  onClick: (opt: ButtonOption) => void
}

const ButtonGroup: FunctionComponent<IButtonGroupOption> = (props) => {
  const click = (index: number) => {
    props.onClick(props.buttons[index])
  }

  return (
    <View className='vi-common-group-button-warpper'>
      {props.buttons.map((item, index) => {
        return (
          <Fragment key={index}>
            {index === props.actived ? (
              <Button color='warning' onClick={() => click(index)}>
                {item.name}
              </Button>
            ) : (
              <Button variant='outlined' color='warning' onClick={() => click(index)}>
                {item.name}
              </Button>
            )}
          </Fragment>
        )
      })}
    </View>
  )
}

export default ButtonGroup
