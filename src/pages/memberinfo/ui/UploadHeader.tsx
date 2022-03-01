/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-03-01 21:55:42
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 22:19:44
 */

import { FunctionComponent, useEffect, useState } from 'react'
import { Popup, Uploader } from '@taroify/core'
import Taro from '@tarojs/taro'

interface IPageOption {
  open: boolean
  avatar: string
  close: () => void
}

const UploadHeader: FunctionComponent<IPageOption> = (props) => {
  const [files, setFiles] = useState<Uploader.File[]>([])

  useEffect(() => {
    setFiles([
      {
        url: props.avatar
      }
    ])
  }, [props.avatar])

  const onUpload = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera']
    }).then(({ tempFiles }) => {
      console.log(tempFiles)
      setFiles([
        {
          url: tempFiles[0].path
        }
      ])

      //   setFiles([
      //     ...files,
      //     ...tempFiles.map(({ path, type, originalFileObj }) => ({
      //       type,
      //       url: path,
      //       name: originalFileObj?.name
      //     }))
      //   ])
    })
  }

  return (
    <Popup className='vi-user-wrapper_upload' rounded open={props.open} placement='bottom' style={{ height: '30%' }} onClose={props.close}>
      <Uploader value={files} onUpload={onUpload} onChange={setFiles} />
    </Popup>
  )
}

export default UploadHeader
