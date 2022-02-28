/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-28 21:49:51
 * @LastEditors: Derek Xu
 */
import Taro from '@tarojs/taro'
import { FunctionComponent, useRef, useState } from 'react'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import { Button, Cell, Form, Input, Uploader } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { FormItemInstance } from '@taroify/core/form'
import { useToast, getStorage, useBack } from '@/utils/taro'
import { upload, addGroup } from '@/api/group'
import './index.scss'

interface IUploadInfo {
  code: number
  success: boolean
  data: IUploadInfoData
}

interface IUploadInfoData {
  url: string
  width: number
  height: number
}

const GroupCreate: FunctionComponent = () => {
  const itemRef = useRef<FormItemInstance>()
  const urlRef = useRef<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)

  const onUpload = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera']
    }).then(({ tempFiles }) => {
      setUploading(true)
      urlRef.current = ''
      itemRef.current?.setValue([])
      itemRef.current?.setValue([
        {
          url: tempFiles[0].path,
          type: tempFiles[0].type,
          name: tempFiles[0].originalFileObj?.name
        }
      ])
      Taro.uploadFile({
        url: upload(), //仅为示例，非真实的接口地址
        filePath: tempFiles[0].path,
        name: 'smfile',
        header: {
          Authorization: getStorage('accessToken')
        },
        success(res) {
          if (!res.data) {
            _uploadFail()
            return
          }
          const result: IUploadInfo = JSON.parse(res.data)
          if (!result.success) {
            _uploadFail()
            return
          }
          setUploading(false)
          urlRef.current = result.data.url
        }
      }).catch(() => {
        _uploadFail()
      })
    })
  }

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    if (uploading) {
      useToast({ title: '正在上传图像', icon: 'loading' })
      return
    }
    setLoading(true)
    const data = event.detail.value
    //@ts-ignore
    const { name } = data
    addGroup(name, urlRef.current).then(() => {
      setLoading(false)
      useBack({ to: 4 })
    })
  }

  const _uploadFail = () => {
    useToast({ title: '上传失败' })
    setUploading(false)
    itemRef.current?.setValue([])
    urlRef.current = ''
  }

  return (
    <CommonMain className='vi-group-create-warpper' title='新建群组' fixed to={2} left>
      <Form onSubmit={onSubmit}>
        <View className='main'>
          <View className='form'>
            <Cell.Group inset>
              <Form.Item ref={itemRef} name='uploader'>
                <Form.Label>图像</Form.Label>
                <Form.Control>
                  <Uploader multiple maxFiles={1} onUpload={onUpload} />
                </Form.Control>
              </Form.Item>
              <Form.Item name='name' rules={[{ required: true, message: '请输入名称' }]}>
                <Form.Label>名称</Form.Label>
                <Form.Control>
                  <Input placeholder='请输入名称' />
                </Form.Control>
              </Form.Item>
            </Cell.Group>
          </View>
          <View className='button'>
            <Button block color='primary' formType='submit' loading={loading}>
              提交
            </Button>
          </View>
        </View>
      </Form>
    </CommonMain>
  )
}

export default GroupCreate
