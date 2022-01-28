/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-28 17:42:59
 * @LastEditTime: 2022-01-28 18:25:31
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import Dialog from '@taroify/core/dialog'
import { Button } from '@taroify/core'
import { View } from '@tarojs/components'
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

  const createQRcode = () => {}

  return (
    <Dialog open={props.open} onClose={props.close} className='vi-component-view_qr-wrapper'>
      <Dialog.Content>
        <View className='container'>
          <QRCode value={url} size={160} />
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
