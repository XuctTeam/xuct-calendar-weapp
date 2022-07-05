/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-16 21:32:36
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-05 21:49:10
 */
import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Popup, Field, Button, Input } from '@taroify/core'
import { Cross } from '@taroify/icons'

import '../index.scss'

type IPageOption = {
  open: boolean
  name: string
  closeHanler: () => void
  modifyNameHandler: (name: string) => void
}

const ModifyName: React.FC<IPageOption> = (props) => {
  const [modifyName, setModifyName] = useState<string>('')

  useEffect(() => {
    setModifyName(props.name)
  }, [props.name])

  return (
    <Popup open={props.open} placement='bottom' style={{ height: '30%' }} onClose={props.closeHanler}>
      <Popup.Close>
        <Cross />
      </Popup.Close>
      <View className='vi-user-wrapper_ui-name'>
        <Field label='名称' className='field'>
          <Input placeholder='请输入名称' value={modifyName} onChange={(e) => setModifyName(e.detail.value)} />
        </Field>
        <Button color='success' block onClick={() => props.modifyNameHandler(modifyName)}>
          保存
        </Button>
      </View>
    </Popup>
  )
}

export default ModifyName
