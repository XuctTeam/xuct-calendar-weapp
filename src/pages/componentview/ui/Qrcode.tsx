/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-28 17:42:59
 * @LastEditTime: 2022-02-25 15:44:52
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import Taro from '@tarojs/taro'
import { Button, Dialog } from '@taroify/core'
import { Canvas } from '@tarojs/components'
import { createQrCodeImg } from '@/components/qrode/qrcode'
import { useToast } from '@/utils/taro'

import '../index.scss'

interface IPageStateProps {
  open: boolean
  componentId: string
  width: number
  height: number
  close: () => void
}

const H5Qrcode: FunctionComponent<IPageStateProps> = (props) => {
  const canvas = useRef<any>()
  useEffect(() => {
    let time = 0
    if (props.open) {
      time = window.setTimeout(() => {
        drawQrCode()
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

  /**
   * canavs画布
   */
  const drawQrCode = () => {
    Taro.createSelectorQuery()
      .select('#myCanvas')
      .node(function (res) {
        const { node } = res
        if (!node) return
        canvas.current = node
        const cavs = node

        const ctx = cavs.getContext('2d')
        console.log(cavs)

        const dpr = Taro.getSystemInfoSync().pixelRatio
        cavs.width = props.width * dpr
        cavs.height = props.height * dpr
        // console.log({ ctx })
        ctx.scale(dpr, dpr)

        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, cavs.width, cavs.height)
        ctx.clearRect(0, 0, 0, 0)

        const qrCodeImg = _getImage(cavs)
        qrCodeImg.crossOrigin = 'anonymous'
        qrCodeImg.onload = function () {
          ctx.drawImage(qrCodeImg, props.width / 2 - 40, 330, 80, 80)
        }
        const bgImg = _getImage(cavs)
        bgImg.src = 'http://images.xuct.com.cn/login_default.png?timeStamp=' + new Date()
        bgImg.crossOrigin = 'anonymous'
        bgImg.onload = function () {
          qrCodeImg.src = createQrCodeImg(props.componentId, {
            errorCorrectLevel: 'M',
            typeNumber: 2,
            black: '#000000',
            white: '#FFFFFF',
            size: 300
          })
          ctx.drawImage(bgImg, 0, 0, props.width, 300)
          drawRanksTexts(ctx, '【下载二维码并保存】', 450, 80, props.width)
        }
        ctx.restore()
      })
      .exec()
  }

  /** 画多行文本
   * @param ctx          canvas 上下文
   * @param str          多行文本
   * @param initHeight   容器初始 top值
   * @param initWidth    容器初始 left值
   * @param canvasWidth  容器宽度
   */
  const drawRanksTexts = (ctx, str, initHeight, initWidth, canvasWidth) => {
    let lineWidth = 0
    let lastSubStrIndex = 0
    /* 设置文字样式 */
    ctx.fillStyle = '#303133'
    ctx.font = 'normal 400 15px  PingFangSC-Regular'
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width
      if (lineWidth > canvasWidth) {
        /* 换行 */
        ctx.fillText(str.substring(lastSubStrIndex, i), initWidth, initHeight)
        initHeight += 20
        lineWidth = 0
        lastSubStrIndex = i
      }
      if (i == str.length - 1) {
        /* 无需换行 */
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), initWidth, initHeight)
      }
    }
  }

  /**
   * 保存图片
   */
  const saveQRCode = useCallback(() => {
    if (!canvas.current) return
    if (process.env.TARO_ENV === 'h5') {
      return _downH5QRCode()
    }
    _downWeappQrCode()
  }, [])

  const _getImage = (cavs: any): any => {
    if (process.env.TARO_ENV === 'h5') {
      return new Image()
    }
    return cavs.createImage()
  }

  const _downH5QRCode = () => {
    if (!canvas.current) return
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    //@ts-ignore
    img.src = canvas.current.toDataURL('image/png')
    img.onload = function () {
      const link = document.createElement('a')
      link.href = img.src
      link.download = `111.png`
      const event = new MouseEvent('click') // 创建一个单击事件
      link.dispatchEvent(event) // 主动触发a标签的click事件下载
    }
  }

  const _downWeappQrCode = async () => {
    Taro.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function () {
              _weappWritePhotosAlbum()
            }
          })
        } else {
          _weappWritePhotosAlbum()
        }
      }
    })
  }

  /**
   * 保存图片至相册
   */
  const _weappWritePhotosAlbum = () => {
    Taro.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 400,
      height: 500,
      destWidth: 360,
      destHeight: 450,
      canvasId: 'myCanvas',
      canvas: canvas.current,
      fileType: 'png'
    })
      .then((res) => {
        console.log(res.tempFilePath)
        Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
          .then(() => {
            Taro.showModal({
              title: '图片保存成功',
              content: '图片保存成功',
              showCancel: false,
              confirmText: '确认'
            })
          })
          .catch(() => {
            useToast('图片保存失败')
            return
          })
      })
      .catch(() => {
        useToast('生成临时图片失败')
      })
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      className='vi-component-view_h5-qr-wrapper'
      style={{ width: props.width + 'px', height: props.height + 'px' }}
    >
      <Dialog.Content>
        <Canvas type='2d' id='myCanvas' canvasId='myCanvas' style={{ width: '100%', height: '100%' }}></Canvas>
      </Dialog.Content>
      <Dialog.Actions theme='round'>
        <Button onClick={() => saveQRCode()}>下载图片</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default H5Qrcode
