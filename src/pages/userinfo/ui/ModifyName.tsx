/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-16 21:32:36
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-01-06 09:45:44
 */
import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { Popup, Cell, Field, Button, Input } from '@taroify/core'

import '../index.scss'

type IPageState = {
  open: boolean
  name: string
  closeHanler: () => void
  modifyNameHandler: (name: string) => void
}

const ModifyName: React.FC<IPageState> = (props) => {
  const [modifyName, setModifyName] = useState(props.name)
  return (
    <Popup className='vi-user-wrapper_ui-name' open={props.open} placement='bottom' style={{ height: '30%' }} onClose={props.closeHanler}>
      <View className='form'>
        <Cell.Group inset>
          <Field label='名称'>
            <Input placeholder='请输入名称' value={modifyName} onChange={(e) => setModifyName(e.detail.value)} />
          </Field>
        </Cell.Group>
      </View>
      <View className='button'>
        <Button color='success' block onClick={() => props.modifyNameHandler(modifyName)}>
          保存
        </Button>
      </View>
    </Popup>
  )
}

export default ModifyName
