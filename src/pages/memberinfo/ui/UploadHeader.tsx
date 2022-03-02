/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-03-01 21:55:42
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-02 14:05:40
 */
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Button, Popup, Uploader } from '@taroify/core'
import { toast, useStorage, useImage, useFile } from '@/utils/taro'
import { upload as uploadPath } from '@/api/common'
import { IUploadInfo } from '~/../@types/common'
import { View } from '@tarojs/components'

interface IPageOption {
  open: boolean
  avatar: string
  close: () => void
  updateAvatar: (avatar: string) => void
}

const UploadHeader: FunctionComponent<IPageOption> = (props) => {
  const [files, setFiles] = useState<Uploader.File[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [, { get }] = useStorage()
  const { upload } = useFile()
  const [, { choose }] = useImage({})

  useEffect(() => {
    setFiles([
      {
        url: props.avatar,
        type: 'image/png'
      }
    ])
  }, [props.avatar])

  const onUpload = useCallback(async () => {
    if (loading) {
      toast({ title: '正在上传' })
      return
    }
    const assessToken = await get('accessToken')
    const fileInfo = await choose()
    if (fileInfo?.tempFilePaths?.length) {
      const updateFile = fileInfo.tempFiles[0]
      const uploadFilePath = fileInfo.tempFilePaths[0]
      setFiles([
        {
          type: updateFile.type,
          url: uploadFilePath
        }
      ])
      setLoading(true)
      const uploadResult = await upload({
        url: uploadPath(),
        filePath: uploadFilePath,
        name: 'smfile',
        header: { Authorization: assessToken }
      })
      if (uploadResult?.statusCode !== 200) {
        _uploadFail()
        return
      }
      const result: IUploadInfo = JSON.parse(uploadResult?.data)
      if (!result.success) {
        _uploadFail()
        return
      }
      setLoading(false)
      setFiles([
        {
          type: updateFile.type,
          url: result.data.url
        }
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get])

  const _uploadFail = () => {
    toast({ title: '上传失败' })
    setLoading(false)
  }

  const updateAvatarHandle = () => {
    if (loading) {
      toast({ title: '正在上传' })
      return
    }
    if (files[0] && files[0].url && files[0].url !== props.avatar) {
      props.updateAvatar(files[0].url)
      return
    }
    toast({ title: '上传数据重复' })
  }

  return (
    <Popup className='vi-user-wrapper_upload' rounded open={props.open} placement='bottom' style={{ height: '30%' }} onClose={props.close}>
      <Uploader value={files} multiple maxFiles={1} onUpload={onUpload} onChange={setFiles} />
      <View className='button'>
        <Button color='success' block onClick={() => updateAvatarHandle()}>
          保存
        </Button>
      </View>
    </Popup>
  )
}

export default UploadHeader
