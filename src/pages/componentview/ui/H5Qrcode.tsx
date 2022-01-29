/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-28 17:42:59
 * @LastEditTime: 2022-01-29 19:56:45
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import { Button, Dialog } from '@taroify/core'
import { Canvas } from '@tarojs/components'
import { createQrCodeImg } from '@/components/qrode/qrcode'

import '../index.scss'

interface IPageStateProps {
  open: boolean
  componentId: string
  width: number
  height: number
  close: () => void
}

const H5Qrcode: FunctionComponent<IPageStateProps> = (props) => {
  const canvas = useRef()
  useEffect(() => {
    let time = 0
    if (props.open) {
      time = window.setTimeout(() => {
        Taro.createSelectorQuery()
          .select('#myCanvas')
          .node(function (res) {
            drawCode(res)
          })
          .exec()
      }, 500)
    }
    return () => {
      if (time !== 0) {
        window.clearTimeout(time)
      }
      time = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  const drawCode = (res) => {
    const cavs = res.node
    canvas.current = cavs
    const ctx = cavs.getContext('2d')
    console.log(cavs)
    const dpr = Taro.getSystemInfoSync().pixelRatio
    cavs.width = props.width * dpr
    cavs.height = props.height * dpr
    // console.log({ ctx })
    ctx.scale(dpr, dpr)

    //ctx.fillStyle = '#5B9AFF'
    //ctx.fillRect(0, 0, 380, 675)
    //ctx.fillRect(0, 0, 100, 100)
    //绘制文本
    //ctx.setFontSize(36)
    //ctx.font = `normal 300 36px PingFangSC-Light,PingFang`
    //ctx.fillStyle = '#fff'
    //ctx.fillText('热招职位', 113, 60)
    const qrCodeImg = new Image()
    qrCodeImg.crossOrigin = 'anonymous'
    qrCodeImg.onload = function () {
      ctx.drawImage(qrCodeImg, props.width / 2 + 60, 400, 60, 60)
    }

    const bgImg = new Image()
    bgImg.src = 'http://images.xuct.com.cn/share_bg.jpg'
    bgImg.onload = function () {
      ctx.drawImage(bgImg, 0, 0, props.width, props.height)
      qrCodeImg.src = createQrCodeImg(props.componentId, {
        errorCorrectLevel: 'M',
        typeNumber: 2,
        black: '#000000',
        white: '#FFFFFF',
        size: 300
      })
    }

    ctx.restore()
  }

  const saveQRCode = useCallback(() => {
    console.log(canvas.current.toDataURL())

    //const ctx = canvas.current.getContext('2d')

    // const img = new Image()
    // img.src = canvas.current.toDataURL('image/png')
    // img.onload = () => {
    //   const link = document.createElement('a')
    //   link.href = img.src
    //   link.download = `111.png`
    //   const event = new MouseEvent('click') // 创建一个单击事件
    //   link.dispatchEvent(event) // 主动触发a标签的click事件下载
    //   document.body.removeChild(link)
    // }
  }, [])

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      className='vi-component-view_h5-qr-wrapper'
      style={{ width: props.width + 'px', height: props.height + 'px' }}
    >
      <Dialog.Content>{props.open && <Canvas type='2d' id='myCanvas' canvasId='myCanvas'></Canvas>}</Dialog.Content>
      <Dialog.Actions theme='round'>
        <Button onClick={() => saveQRCode()}>下载图片</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default H5Qrcode
