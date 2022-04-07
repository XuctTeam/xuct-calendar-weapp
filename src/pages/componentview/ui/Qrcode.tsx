/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-28 17:42:59
 * @LastEditTime: 2022-04-07 11:30:01
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { Button, Dialog } from '@taroify/core'
import { Canvas } from '@tarojs/components'
import { createQrCodeImg } from '@/components/qrode/qrcode'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { DEFAULT_AVATAR, DEFAULT_ATTEND_BACKGROUD } from '@/constants/index'
import { toast } from '@/utils/taro'

import '../index.scss'

interface IPageOption {
  open: boolean
  componentId: string
  width: number
  height: number
  close: () => void
}

interface IImageOption {
  src: string
}

const H5Qrcode: FunctionComponent<IPageOption> = (props) => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo) || { username: '', avatar: DEFAULT_AVATAR }
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
    return new Promise(function (resolve, reject) {
      Taro.createSelectorQuery()
        .select('#myCanvas')
        .node(async (res) => {
          const { node } = res
          if (!node) return
          canvas.current = node
          const cavs = node

          const ctx = cavs.getContext('2d')

          const dpr = Taro.getSystemInfoSync().pixelRatio
          cavs.width = props.width * dpr
          cavs.height = props.height * dpr
          ctx.scale(dpr, dpr)
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, props.width, props.height)

          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, 300, 542)

          drawTxt({
            context: ctx,
            text: 'Because',
            fillStyle: '#000000',
            broken: true,
            x: 52,
            y: 8,
            font: '13px sans-serif',
            lineHeight: 18,
            maxWidth: 450,
            maxLine: 2
          })

          drawTxt({
            context: ctx,
            text: '给你推荐了个好东西',
            fillStyle: '#666666',
            broken: true,
            x: 52,
            y: 28,
            font: '10px sans-serif',
            lineHeight: 14,
            maxWidth: 450,
            maxLine: 2
          })

          // const avatarImg = _getImage(cavs)
          // avatarImg.crossOrigin = 'anonymous'
          // avatarImg.src = userInfo.avatar
          // avatarImg.onload = function () {
          //   _drawCircleImage(ctx, avatarImg, 50, 50, 20)
          // }

          // const qrCodeImg = _getImage(cavs)
          // qrCodeImg.crossOrigin = 'anonymous'
          // qrCodeImg.onload = function () {
          //   ctx.drawImage(qrCodeImg, props.width - 120, props.height - 80, 60, 60)
          // }

          // const bgImg = _getImage(cavs)
          // bgImg.src = +new Date()
          // bgImg.crossOrigin = 'anonymous'
          // bgImg.onload = function () {
          //   //drawRanksTexts(ctx, '【下载二维码并保存】', 450, 80, props.width)
          //   ctx.drawImage(bgImg, 0, 0, props.width, props.height)
          // }

          // //logoImg.src = 'http://images.xuct.com.cn/cm_attend_logo.png?timeStamp=' + new Date()
          // qrCodeImg.src = createQrCodeImg(props.componentId, {
          //   errorCorrectLevel: 'L',
          //   typeNumber: 2,
          //   black: '#000000',
          //   white: '#FFFFFF',
          //   size: 60
          // })

          // const logoImg = _getImage(cavs)
          // logoImg.crossOrigin = 'anonymous'
          // logoImg.onload = function () {
          //   ctx.drawImage(logoImg, props.width - 180, props.height - 80, 160, 60)
          // }

          // const bgImg = _getImage(cavs)
          // //bgImg.src = 'http://images.xuct.com.cn/cm_attend_backgroup.png?timeStamp=' + new Date()
          // bgImg.crossOrigin = 'anonymous'
          // bgImg.onload = function () {
          //   //logoImg.src = 'http://images.xuct.com.cn/cm_attend_logo.png?timeStamp=' + new Date()
          //   qrCodeImg.src = createQrCodeImg(props.componentId, {
          //     errorCorrectLevel: 'L',
          //     typeNumber: 2,
          //     black: '#000000',
          //     white: '#FFFFFF',
          //     size: 60
          //   })
          //   ctx.drawImage(bgImg, 0, 0, props.width, props.height)
          //   //drawRanksTexts(ctx, '【下载二维码并保存】', 450, 80, props.width)
          // }
          drawTxt({
            context: ctx,
            text: 'Because',
            fillStyle: '#000000',
            broken: true,
            x: 52,
            y: 8,
            font: '13px sans-serif',
            lineHeight: 18,
            maxWidth: 450,
            maxLine: 2
          })

          drawTxt({
            context: ctx,
            text: '给你推荐了个好东西',
            fillStyle: '#666666',
            broken: true,
            x: 52,
            y: 28,
            font: '10px sans-serif',
            lineHeight: 14,
            maxWidth: 450,
            maxLine: 2
          })

          drawTxt({
            context: ctx,
            text: '美的家用风管机一拖一 变频家用TR冷暖 智能空调直流变频智能WiFi',
            fillStyle: '#000000',
            broken: true,
            x: 12,
            y: 358,
            font: '14px sans-serif',
            lineHeight: 20,
            maxWidth: 276,
            maxLine: 2
          })

          drawTxt({
            context: ctx,
            text: '￥ 会员价',
            fillStyle: '#FF7A45',
            broken: true,
            x: 12,
            y: 400,
            font: 'normal normal bold 16px sans-serif',
            lineHeight: 28,
            maxWidth: 80,
            maxLine: 2
          })

          drawTxt({
            context: ctx,
            text: `建议零售价： ￥11.11`,
            fillStyle: '#666666',
            broken: true,
            x: 12,
            y: 425,
            font: '12px sans-serif',
            lineHeight: 17,
            maxWidth: 276,
            maxLine: 2
          })

          ctx.beginPath()
          ctx.lineWidth = 0.5
          ctx.fillStyle = '#666666'
          ctx.moveTo(0, 450)
          ctx.lineTo(props.width, 450)
          ctx.stroke()

          drawTxt({
            context: ctx,
            text: `扫面/长按识别二维码查看详情`,
            fillStyle: '#666666',
            broken: true,
            x: 100,
            y: 480,
            font: '12px sans-serif',
            lineHeight: 17,
            maxWidth: 116,
            maxLine: 2
          })

          // 将要绘制的图片放在一个数组中
          let imgList: IImageOption[] = []
          imgList.push(
            {
              src: 'http://images.xuct.com.cn/cm_attend_lo.png'
            },
            {
              src: 'http://images.xuct.com.cn/cm_attend_lo.png'
            },
            // {
            //   src: QRCodePath
            // },
            {
              src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/WXACode.fa3d686a.png'
            }
          )
          // 对图片数组进行接口调用返回Promise并将结果存入Promise.all数组中
          const imgPromise: any[] | void = await Promise.all(
            imgList.map((item) => {
              return Taro.getImageInfo({
                src: item.src
              })
            })
          ).catch((err) => {
            reject(err)
          })
          if (imgPromise instanceof Array) {
            // 对Promise.all数组进行图片绘制操作
            imgPromise.forEach((item, index) => {
              let imgtag = _getImage(ctx)
              imgtag.src = item.src || imgList[index]
              console.log(item)
              if (index == 0) {
                imgtag.onload = () => {
                  ctx.drawImage(imgtag, 12, 8, 32, 32)
                }
              } else if (index == 1) {
                imgtag.onload = () => {
                  ctx.drawImage(imgtag, 0, 48, 300, 300)
                }
              } else if (index == 2) {
                imgtag.onload = () => {
                  ctx.drawImage(imgtag, 12, 460, 72, 72)
                }
              } else {
                imgtag.onload = () => {
                  ctx.drawImage(imgtag, 95 + (index - 3) * 36, 405, 32, 16)
                }
              }
            })
          }
          ctx.restore()
        })
        .exec()
    })
  }

  /*方法说明
   *@method drawTxt
   *@param context canvas上下文
   *@param text 绘制的文字
   *@param fillStyle 字体样式
   *@param broken 用来控制中英文截断
   *@param x 绘制文字的x坐标
   *@param y 绘制文字的y坐标
   *@param font 字体的大小和种类等
   *@param lineHeight 行高/换行高度
   *@param maxWidth 一行最长长度
   *@param maxLine 最多显示行数
   */
  const drawTxt = ({ context, text = 'test text', fillStyle = '#000', broken = true, ...rest }) => {
    if (!context) throw Error('请传入绘制上下文环境context')
    // 默认设置
    let origin = { x: 0, y: 0, lineHeight: 30, maxWidth: 630, font: 28, maxLine: 2 }

    // 获取最后的数据
    let { x, y, font, lineHeight, maxWidth, maxLine } = { ...origin, ...rest }

    // 设置字体样式
    context.textAlign = 'left'
    context.textBaseline = 'middle' // 没有好的方法控制行高，所以设置绘制文本时的基线为em 方框的正中
    context.fillStyle = fillStyle
    context.font = font

    // broken: true  如果不考虑英文单词的完整性 适用于所有情况
    // broken: false  考虑英文单词的完整性 仅适用于纯英文
    //【TODO: 中英混排且考虑单词截断...】

    let splitChar = broken ? '' : ' '

    let arrText = text.split(splitChar)
    let line = ''
    let linesCount = 0

    y = y + lineHeight / 2 // 配合context.textBaseline将文字至于中间部分
    for (var n = 0; n < arrText.length; n++) {
      let testLine = line + arrText[n] + splitChar
      let testWidth = context.measureText(testLine).width
      if (testWidth > maxWidth && n > 0) {
        if (linesCount < maxLine) {
          // 判断行数在限制行数内绘制文字
          linesCount++
          context.fillText(line, x, y)
          line = arrText[n] + splitChar
          y += lineHeight
        }
      } else {
        // 一行还未绘制完成
        line = testLine
      }
    }
    context.fillText(line, x, y)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
   * ctx 画布上下文
   * img 图片对象
   * （x, y）圆心坐标
   * radius 半径
   * 注意：绘制圆形头像之前，保存画笔；绘制完成后恢复
   * */
  const _drawCircleImage = (ctx, img, x, y, radius) => {
    ctx.save()
    let size = 2 * radius
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(img, x - radius, y - radius, size, size)
    ctx.restore()
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
            toast({ title: '上传成功', icon: 'success' })
          })
          .catch(() => {
            toast({ title: '图片保存失败' })
            return
          })
      })
      .catch(() => {
        toast({ title: '生成临时图片失败' })
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
      <Dialog.Actions>
        <Button onClick={props.close}>取消</Button>
        <Button onClick={() => saveQRCode()}>下载图片</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default H5Qrcode
