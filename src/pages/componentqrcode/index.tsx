/*
 * @Author: Derek Xu
 * @Date: 2022-07-11 09:16:07
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-12 08:54:26
 * @FilePath: \xuct-calendar-weapp\src\pages\componentqrcode\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { Router } from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { Canvas, View } from '@tarojs/components'
import { IDvaCommonProps, IUserInfo } from '~/../@types/dva'
import { IDavComponent } from '~/../@types/calendar'
import { Button } from '@taroify/core'
import Images from '@/constants/images'
import QR from 'qrcode-base64'
import { toast, useWebEnv } from '@/utils/taro'
import { getById } from '@/api/component'
import { getShortUrl } from '@/api/component'

import './index.scss'

interface IImageOption {
  src: string
}

const ComponentQrCode: FC = () => {
  const userInfo: IUserInfo = useSelector<IDvaCommonProps, IUserInfo>((state) => state.common.userInfo) || { username: '', avatar: Images.DEFAULT_AVATAR }
  const systemInfo = Taro.getSystemInfoSync()
  const [summary, setSummary] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const canvas = useRef<any>()
  const webEnv = useWebEnv()

  useEffect(() => {
    const data = Router.getData()
    if (data) {
      _getQrcode(data.id)
      setSummary(data.summary)
      setLocation(data.location)
      return
    }
    const params = Router.getParams()
    const { id } = params
    if (!id) return
    _getData(id)
  }, [])

  const _getData = (id: string) => {
    getById(id)
      .then((res) => {
        const comp = res as any as IDavComponent
        setSummary(comp.summary)
        setLocation(comp.location)
        _getQrcode(id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _getQrcode = (id: string) => {
    getShortUrl(id)
      .then((res) => {
        _setQrCode(res as any as string)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const _draw = (qrCode: string) => {
    Taro.createSelectorQuery()
      .select('#myCanvas')
      .node((res) => {
        if (!res || !res.node) {
          setTimeout(() => {
            _draw(qrCode)
          }, 200)
          return
        }
        const { node } = res
        if (!node) return
        canvas.current = node
        const cavs = node
        const _scrWidth = systemInfo.screenWidth - 20
        const _scrHeight = 460

        const ctx = cavs.getContext('2d')

        const dpr = Taro.getSystemInfoSync().pixelRatio
        cavs.width = systemInfo.screenWidth * dpr
        cavs.height = _scrHeight * dpr
        ctx.scale(dpr, dpr)
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, systemInfo.screenWidth, _scrHeight)

        drawRoundedRect(ctx, 'white', '#ccffff', 10, 10, _scrWidth, _scrHeight - 40, 5)

        drawTxt({
          context: ctx,
          text: userInfo.name,
          fillStyle: '#000000',
          broken: true,
          x: 64,
          y: 20,
          font: '13px sans-serif',
          lineHeight: 18,
          maxWidth: 450,
          maxLine: 2
        })

        drawTxt({
          context: ctx,
          text: '给你推荐了日程',
          fillStyle: '#666666',
          broken: true,
          x: 66,
          y: 40,
          font: '10px sans-serif',
          lineHeight: 14,
          maxWidth: 450,
          maxLine: 2
        })

        drawTxt({
          context: ctx,
          text: summary,
          fillStyle: '#000000',
          broken: true,
          x: 20,
          y: 330,
          font: '14px sans-serif',
          lineHeight: 20,
          maxWidth: 276,
          maxLine: 2
        })

        drawTxt({
          context: ctx,
          text: location,
          fillStyle: '#000000',
          broken: true,
          x: 20,
          y: 350,
          font: '12px sans-serif',
          lineHeight: 20,
          maxWidth: 276,
          maxLine: 2
        })

        ctx.beginPath()
        ctx.lineWidth = 0.8
        ctx.fillStyle = '#666666'
        ctx.moveTo(0, _scrHeight - 120)
        ctx.lineTo(_scrWidth, _scrHeight - 120)
        ctx.stroke()

        drawTxt({
          context: ctx,
          text: `扫码/长按识别二维码查看详情`,
          fillStyle: '#666666',
          broken: true,
          x: 90,
          y: _scrHeight - 100,
          font: '12px sans-serif',
          lineHeight: 17,
          maxWidth: 116,
          maxLine: 2
        })

        // 将要绘制的图片放在一个数组中
        let imgList: IImageOption[] = []
        imgList.push(
          {
            src: userInfo.avatar || Images.DEFAULT_AVATAR
          },
          {
            src: Images.DEFAULT_ATTEND_BACKGROUD
          },
          {
            src: qrCode
          }
        )
        // 对Promise.all数组进行图片绘制操作
        imgList.forEach((item, index) => {
          const imgtag = _getImage(cavs)
          imgtag.src = item.src
          imgtag.crossOrigin = 'Anonymous'

          if (index == 0) {
            imgtag.onload = () => {
              ctx.drawImage(imgtag, 20, 16, 36, 36)
            }
          } else if (index == 1) {
            imgtag.onload = () => {
              ctx.drawImage(imgtag, (_scrWidth - 220) / 2, 70, 220, 220)
            }
          } else if (index == 2) {
            imgtag.onload = () => {
              ctx.drawImage(imgtag, 20, _scrHeight - 100, 56, 56)
            }
          }
        })
        ctx.restore()
      })
      .exec()
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

  const drawRoundedRect = (ctx, strokeStyle, fillStyle, x, y, width, height, radius) => {
    ctx.beginPath()
    roundedRect(ctx, x, y, width, height, radius)
    ctx.strokeStyle = strokeStyle
    ctx.fillStyle = fillStyle
    ctx.stroke()
    ctx.fill()
  }

  const roundedRect = (ctx, x, y, width, height, radius) => {
    if (width <= 0 || height <= 0) {
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      return
    }

    ctx.moveTo(x + radius, y)
    ctx.arcTo(x + width, y, x + width, y + height, radius)
    ctx.arcTo(x + width, y + height, x, y + height, radius)
    ctx.arcTo(x, y + height, x, y, radius)
    ctx.arcTo(x, y, x + radius, y, radius)
  }

  const _setQrCode = async (url: string) => {
    const qrCode = QR.drawImg(url, {
      typeNumber: 4,
      errorCorrectLevel: 'M',
      size: 500
    })
    if (webEnv) {
      _draw(qrCode)
    }
    await _removeSave()
    _base64ToSave(qrCode)
      .then((rs) => {
        if (!rs) return
        //@ts-ignore
        _draw(rs as any as string)
      })
      .catch((err) => {
        console.log(err)
        return Promise.reject(err)
      })
  }

  const _removeSave = (FILE_BASE_NAME = 'tmp_base64src', format = 'jpg') => {
    return new Promise((resolve) => {
      // 把文件删除后再写进，防止超过最大范围而无法写入
      const fsm = Taro.getFileSystemManager() //文件管理器
      const filePath = `${Taro.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`
      fsm.unlink({
        filePath: filePath,
        success() {
          console.log('文件删除成功')
          resolve(true)
        },
        fail(e) {
          console.log('readdir文件删除失败：', e)
          resolve(true)
        }
      })
    })
  }

  const _base64ToSave = (base64data, FILE_BASE_NAME = 'tmp_base64src') => {
    const fsm = Taro.getFileSystemManager()
    return new Promise((resolve, reject) => {
      //format这个跟base64数据的开头对应
      const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || []
      if (!format) {
        reject(new Error('ERROR_BASE64SRC_PARSE'))
      }
      const filePath = `${Taro.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`
      //const buffer = wx.base64ToArrayBuffer(bodyData);
      fsm.writeFile({
        filePath,
        data: bodyData,
        //data: base64data.split(";base64,")[1],
        encoding: 'base64',
        success() {
          resolve(filePath)
        },
        fail() {
          reject(new Error('ERROR_BASE64SRC_WRITE'))
        }
      })
    })
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
    console.log(canvas.current)
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
            toast({ title: '保存成功', icon: 'success' })
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
    <CommonMain className='component-qrcode-warpper' fixed left title='分享二维码' to={1}>
      <View className='box'>
        <Canvas type='2d' id='myCanvas' canvasId='myCanvas' style={{ width: '100%', height: '440px' }}></Canvas>
      </View>
      <View className='button'>
        <Button block color='danger' onClick={saveQRCode}>
          保存图片
        </Button>
      </View>
    </CommonMain>
  )
}

export default ComponentQrCode
