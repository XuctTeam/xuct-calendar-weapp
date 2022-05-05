/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-05-05 14:05:17
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useCallback, useState } from 'react'
import { View } from '@tarojs/components'
import { Search, Empty } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { IGroup } from '~/../@types/group'
import { search } from '@/api/group'
import { apply } from '@/api/groupmember'
import { toast } from '@/utils/taro'
import { useModal } from 'taro-hooks'
import { GroupList } from './ui'

import './index.scss'

const GroupSearch: FunctionComponent = () => {
  const [value, setValue] = useState('')
  const [list, setList] = useState<IGroup[]>([])

  const [show] = useModal({
    title: '提示',
    content: '是否申请加入'
  })

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

  const onJoinClickHandle = useCallback(
    (id) => {
      show()
        .then((res) => {
          if (res.cancel) return
          apply(id)
            .then(() => {
              toast({ title: '申请成功' })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [show]
  )

  return (
    <CommonMain className='vi-group-search-warpper' title='加入群组' fixed to={2} left>
      <View className='vi-group-search-warpper_container'>
        <Search
          shape='round'
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
  )
}

export default GroupSearch
