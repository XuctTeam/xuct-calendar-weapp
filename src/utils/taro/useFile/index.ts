/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-02 11:58:57
 * @LastEditTime: 2022-03-02 11:58:57
 * @LastEditors: Derek Xu
 */
import { uploadFile, downloadFile } from '@tarojs/taro'
import { useCallback } from 'react'

export interface IUploadOption {
  url: string
  filePath: string
  name: string
  header?: Record<string, any>
  formData?: Record<string, any>
  timeout?: number
  fileName?: string
}

export interface IDownloadOption {
  url: string
  filePath?: string
  header?: Record<string, any>
}

export type IUploadFileAction = (option: IUploadOption) => Promise<uploadFile.SuccessCallbackResult | TaroGeneral.CallbackResult>

export type IDownloadFileAction = (option: IDownloadOption) => Promise<downloadFile.FileSuccessCallbackResult | TaroGeneral.CallbackResult>

export interface IAction {
  upload: IUploadFileAction
  download: IDownloadFileAction
}

function useFile(): IAction {
  const upload = useCallback<IUploadFileAction>((option) => {
    return new Promise((resolve, reject) => {
      try {
        uploadFile({
          ...(option || {}),
          success: resolve,
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject({ errMsg: 'uploadFile:fail' })
      }
    })
  }, [])

  const download = useCallback<IDownloadFileAction>((option) => {
    return new Promise((resolve, reject) => {
      try {
        downloadFile({
          ...(option || {}),
          success: resolve,
          fail: reject
        })
      } catch (e) {
        reject({ errMsg: 'downloadFile:fail' })
      }
    })
  }, [])

  return {
    upload,
    download
  }
}

export default useFile
