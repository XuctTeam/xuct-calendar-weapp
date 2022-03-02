/* eslint-disable @typescript-eslint/no-shadow */
/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-02 11:59:54
 * @LastEditTime: 2022-03-02 12:58:11
 * @LastEditors: Derek Xu
 */

import { useCallback, useState } from 'react'
import Taro, { saveImageToPhotosAlbum, previewImage, getImageInfo, compressImage, chooseImage } from '@tarojs/taro'
import Compressor from 'compressorjs'
import useEnv from '../useEnv'
import { saveImageForH5, downloadImage, generateBlobUrl } from './utils'
import { ENV_TYPE } from '../constant'

export type ChooseImageOption = Partial<Pick<Taro.chooseImage.Option, 'count' | 'sizeType' | 'sourceType'>>

export type PreviewImageOption = Pick<Taro.previewImage.Option, 'current' | 'urls'>

export type ChooseImageAction = (option?: ChooseImageOption) => Promise<Taro.chooseImage.SuccessCallbackResult>

export type PreviewImageAction = (option: PreviewImageOption) => Promise<TaroGeneral.CallbackResult>

export type SaveImageToPhotosAlbumAction = (filePath: string) => Promise<TaroGeneral.CallbackResult>

export type GetImageInfoAction = (src: string) => Promise<Taro.getImageInfo.SuccessCallbackResult>

export type ChooseMessageFileAction = (
  count: number,
  type?: Pick<Taro.chooseMessageFile.Option, 'type'>,
  extend?: Pick<Taro.chooseMessageFile.Option, 'extension'>
) => Promise<Taro.chooseMessageFile.SuccessCallbackResult>

export type CompressImageAction = (src: string, quality?: number) => Promise<Taro.compressImage.SuccessCallbackResult>

export type IFileInfo = Partial<Pick<Taro.chooseImage.SuccessCallbackResult, 'tempFilePaths' | 'tempFiles'>>

export interface IAction {
  choose: ChooseImageAction
  chooseMessageFile: ChooseMessageFileAction
  preview: PreviewImageAction
  save: SaveImageToPhotosAlbumAction
  getInfo: GetImageInfoAction
  compress: CompressImageAction
}

function useImage(options: ChooseImageOption): [IFileInfo, IAction] {
  const [fileInfo, setFileInfo] = useState<IFileInfo>({})
  const env = useEnv()

  const chooseImageAsync = useCallback<ChooseImageAction>((option = {}) => {
    const { count, sizeType, sourceType } = options
    const finalOptions = Object.assign(
      {},
      Object.fromEntries(
        [
          ['count', count],
          ['sizeType', sizeType],
          ['sourceType', sourceType]
        ].filter((v) => v[1]) || []
      ),
      option || {}
    )
    return new Promise((resolve, reject) => {
      try {
        chooseImage({
          ...finalOptions,
          success: (res) => {
            const { errMsg, ...fileInfo } = res
            setFileInfo(fileInfo)
            resolve(res)
          },
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }, [])

  const previewImageAsync = useCallback<PreviewImageAction>((option) => {
    return new Promise((resolve, reject) => {
      try {
        previewImage({
          ...option,
          success: resolve,
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }, [])

  const saveImageToPhotosAlbumAsync = useCallback<SaveImageToPhotosAlbumAction>(
    (filePath) => {
      return new Promise(async (resolve, reject) => {
        if (!filePath) {
          reject('you must provide filePath')
        } else {
          try {
            if (env === ENV_TYPE.WEB) {
              const result = await saveImageForH5(filePath)
              if (result) {
                resolve({
                  errMsg: 'save success'
                })
              } else {
                reject('save fail')
              }
            } else {
              saveImageToPhotosAlbum({
                filePath,
                success: resolve,
                fail: reject
              }).catch(reject)
            }
          } catch (e) {
            reject(e)
          }
        }
      })
    },
    [env]
  )

  const getImageInfoAsync = useCallback<GetImageInfoAction>((src) => {
    return new Promise((resolve, reject) => {
      if (!src) {
        reject('please enter a valid path')
      } else {
        try {
          getImageInfo({
            src,
            success: resolve,
            fail: reject
          }).catch(reject)
        } catch (e) {
          reject(e)
        }
      }
    })
  }, [])

  const chooseMessageFileAsync = useCallback<ChooseMessageFileAction>(
    (count, type, extension) => {
      return new Promise((resolve, reject) => {
        if (!count || env !== ENV_TYPE.WEAPP) {
          reject('you must provide count')
        } else {
          try {
            const payload = Object.fromEntries(
              [
                ['type', type],
                ['extension', extension]
              ].filter((v) => v[1]) || []
            )
            Taro.chooseMessageFile({
              count,
              ...payload,
              success: resolve,
              fail: reject
            })
          } catch (e) {
            reject(e)
          }
        }
      })
    },
    [env]
  )

  const compressImageAsync = useCallback<CompressImageAction>(
    (src, quality) => {
      return new Promise(async (resolve, reject) => {
        if (!src) {
          reject('you must provide src')
        }
        try {
          if (env === ENV_TYPE.WEB) {
            const blob = await downloadImage(src)
            new Compressor(blob, {
              quality: (quality || 80) / 100,
              success: (res) => {
                const tempFilePath = generateBlobUrl(res)
                resolve({
                  tempFilePath,
                  errMsg: 'compressImage:ok'
                })
              },
              error: reject
            })
          } else {
            Taro.compressImage({
              src,
              ...(quality ? { quality } : {}),
              success: resolve,
              fail: reject
            }).catch(reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    },
    [env]
  )

  return [
    fileInfo,
    {
      choose: chooseImageAsync,
      chooseMessageFile: chooseMessageFileAsync,
      preview: previewImageAsync,
      save: saveImageToPhotosAlbumAsync,
      getInfo: getImageInfoAsync,
      compress: compressImageAsync
    }
  ]
}

export default useImage
