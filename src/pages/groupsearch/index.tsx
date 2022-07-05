/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-07-05 19:25:15
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
    // if (!idRef.current) return
    // apply(idRef.current)
    //   .then(() => {})
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // setOpen(false)
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
      <Popup open={pwdOpen} placement='bottom' style={{ height: '30%' }}>
        <Popup.Close>
          <Cross />
        </Popup.Close>
        <Field label='密码' required>
          <Input placeholder='请输入加入密码' value={password} onChange={(e) => setPassword(e.detail.value)} />
        </Field>
      </Popup>
    </Fragment>
  )
}

export default GroupSearch
