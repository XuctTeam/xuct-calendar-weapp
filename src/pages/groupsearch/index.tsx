/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-07-06 21:27:02
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import { Search, Empty, Dialog, Button, Popup, Field, Input } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { IGroup } from '~/../@types/group'
import { search } from '@/api/group'
import { apply } from '@/api/groupmember'
import { Cross } from '@taroify/icons'
import { GroupList } from './ui'

import './index.scss'

const GroupSearch: FunctionComponent = () => {
  const [value, setValue] = useState<string>('')
  const [list, setList] = useState<IGroup[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [pwdOpen, setPwdOpen] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const idRef = useRef<string>('')

  const searchHandle = () => {
    if (!value) return
    search(value)
      .then((res) => {
        setList(res as any as Array<IGroup>)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onJoinClickHandle = (id, hasPassword) => {
    idRef.current = id
    if (hasPassword) {
      setPwdOpen(true)
      return
    }
    setOpen(true)
  }

  const toJoin = () => {
    if (!idRef.current) return
    setOpen(false)
    setPwdOpen(false)
    apply(idRef.current, password)
      .then(() => {
        idRef.current = ''
      })
      .catch((err) => {
        console.log(err)
        idRef.current = ''
      })
  }

  return (
    <Fragment>
      <CommonMain className='vi-group-search-warpper' title='加入群组' fixed to={2} left>
        <View className='vi-group-search-warpper_container'>
          <Search
            shape='rounded'
            value={value}
            placeholder='请输入搜索关键词'
            action={<View onClick={() => searchHandle()}>搜索</View>}
            onChange={(e) => setValue(e.detail.value)}
          />
          <View>
            {list?.length === 0 ? (
              <Empty>
                <Empty.Image src='search' />
                <Empty.Description>结果为空</Empty.Description>
              </Empty>
            ) : (
              <GroupList groups={list} onJoinClick={onJoinClickHandle}></GroupList>
            )}
          </View>
        </View>
      </CommonMain>
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Header>确认</Dialog.Header>
        <Dialog.Content>是否加入？</Dialog.Content>
        <Dialog.Actions>
          <Button
            onClick={() => {
              idRef.current = ''
              setOpen(false)
            }}
          >
            取消
          </Button>
          <Button onClick={toJoin}>确认</Button>
        </Dialog.Actions>
      </Dialog>
      <Popup
        open={pwdOpen}
        placement='bottom'
        onClose={() => {
          setPassword('')
          setPwdOpen(false)
        }}
        style={{ height: '30%' }}
      >
        <Popup.Close>
          <Cross />
        </Popup.Close>
        <View className='vi-group-search_button'>
          <Field label='密码' required className='field'>
            <Input placeholder='请输入密码' value={password} maxlength={8} onChange={(e) => setPassword(e.detail.value)} />
          </Field>
          <Button color='success' block onClick={toJoin}>
            确定
          </Button>
        </View>
      </Popup>
    </Fragment>
  )
}

export default GroupSearch
