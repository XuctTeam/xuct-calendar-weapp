/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-07-05 22:35:20
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import Taro from '@tarojs/taro'
import Router from 'tarojs-router-next'
import { BaseEventOrig, FormProps, View } from '@tarojs/components'
import { Button, Cell, Form, Input, Switch, Uploader } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { FormInstance, FormItemInstance } from '@taroify/core/form'
import { useBack } from '@/utils/taro'
import { useStorage, useFile, useImage, useToast } from 'taro-hooks'
import { addGroup, getGroupInfo } from '@/api/group'
import { upload as uploadPath } from '@/api/common'
import { IUploadInfo } from '~/../@types/common'
import { IGroup } from '~/../@types/group'

import './index.scss'

const GroupCreate: FunctionComponent = () => {
  const itemRef = useRef<FormItemInstance>()
  const formRef = useRef<FormInstance>()
  const idRef = useRef<string>('')

  const urlRef = useRef<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('新建群组')
  const [edit, setEdit] = useState<boolean>()
  const [toast] = useToast()
  const [back] = useBack()
  const [, { get }] = useStorage()
  const { upload } = useFile()
  const [, { choose }] = useImage({})

  useEffect(() => {
    const data = Router.getData()
    const params = Router.getParams()
    if (!data && !params.id) return
    setData(data, params.id || '')
  }, [])

  const setData = (data: any, id: string) => {
    if (formRef.current == null) {
      setTimeout(() => {
        setData(data, id)
      }, 200)
    }
    if (data) {
      init(data)
      return
    }
    getGroupInfo(id)
      .then((res) => {
        init(res as any as IGroup)
        return
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const init = (group: IGroup) => {
    setTitle('编辑群组')
    Taro.setNavigationBarTitle({
      title: '日历编辑'
    })
    idRef.current = group.id || ''
    if (group.images) {
      itemRef.current?.setValue([
        {
          url: group.images,
          type: 'images/png'
        }
      ])
      urlRef.current = group.images
    }
    if (formRef.current == null) return
    //@ts-ignore
    formRef.current.setValues({
      name: group.name,
      power: group.power === 'PUBLIC' ? 1 : 0,
      password: group.password,
      num: group.num
    })
    setEdit(true)
  }

  const onUpload = useCallback(async () => {
    if (uploading) {
      toast({ title: '正在上传图像', icon: 'loading' })
      return
    }
    const assessToken = await get('accessToken')
    const fileInfo = await choose()
    if (fileInfo?.tempFilePaths?.length) {
      const updateFile = fileInfo.tempFiles[0]
      const uploadFilePath = fileInfo.tempFilePaths[0]
      itemRef.current?.setValue([])
      itemRef.current?.setValue([
        {
          url: uploadFilePath,
          type: updateFile.type
        }
      ])
      setUploading(true)
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
      setUploading(false)
      urlRef.current = result.data.url
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get])

  const passwordValidate = (value) => {
    return !value || /^[0-9]+$/.test(value)
  }

  const onSubmit = (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    if (uploading) {
      toast({ title: '正在上传图像', icon: 'loading' })
      return
    }
    setLoading(true)
    const data = event.detail.value
    //@ts-ignore
    const { name, power, password, num } = data

    addGroup(idRef.current, name, urlRef.current, password, power ? 'PUBLIC' : 'PRIVATE', num).then(() => {
      setLoading(false)
      back({ to: 2, data: { edit } })
    })
  }

  const _uploadFail = () => {
    toast({ title: '上传失败' })
    setUploading(false)
    itemRef.current?.setValue([])
    urlRef.current = ''
  }

  return (
    <CommonMain className='vi-group-create-warpper' title={title} fixed to={2} left>
      <Form onSubmit={onSubmit} ref={formRef}>
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
              <Form.Item name='num' rules={[{ required: true, message: '人数不为空且最大200最小2', validator: (val) => val <= 200 && val >= 2 }]}>
                <Form.Label>人数</Form.Label>
                <Form.Control>
                  <Input placeholder='请输入人数' type='number' />
                </Form.Control>
              </Form.Item>
              <Form.Item name='password' rules={[{ validator: passwordValidate, message: '全部为整数' }]}>
                <Form.Label>口令</Form.Label>
                <Form.Control>
                  <Input placeholder='请输入口令' maxlength={8} />
                </Form.Control>
              </Form.Item>
              <Form.Item name='power' defaultValue={true}>
                <Form.Label>允许搜索</Form.Label>
                <Form.Control>
                  <Switch size={20} />
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
