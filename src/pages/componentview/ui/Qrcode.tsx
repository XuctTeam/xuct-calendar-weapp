/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-28 17:42:59
 * @LastEditTime: 2022-01-28 22:36:58
 * @LastEditors: Derek Xu
 */
import React from 'react'
import Taro from '@tarojs/taro'
import { FunctionComponent, useEffect, useState } from 'react'
import Dialog from '@taroify/core/dialog'
import { Button } from '@taroify/core'
import { Canvas, View } from '@tarojs/components'
import QRCode from 'qrcode.react'

import '../index.scss'

interface IPageStateProps {
  open: boolean
  componentId: string
  close: () => void
}

const Qrcode: FunctionComponent<IPageStateProps> = (props) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(props.componentId)
  }, [])

  const createQRcode = () => {
    Taro.canvasToTempFilePath({
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      destWidth: 100,
      destHeight: 100,
      canvasId: 'canvasId',
      success: function (res) {
        console.log(res)
      }
    })
  }

  return (
    <Dialog open={props.open} onClose={props.close} className='vi-component-view_qr-wrapper'>
      <Dialog.Content>
        <View className='container'>
          <QRCode id='canvasId' value={url} size={240} />
        </View>
      </Dialog.Content>
      <Dialog.Actions theme='round'>
        {/* <Button onClick={() => setOpen(false)}>取消</Button>
        <Button onClick={() => setOpen(false)}>确认</Button> */}
        <Button onClick={() => createQRcode()}> 生成二维码 </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default Qrcode
