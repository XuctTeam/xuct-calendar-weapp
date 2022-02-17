/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-17 13:12:37
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Search, Empty } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { IGroup } from '~/../@types/group'
import { search, apply } from '@/api/group'
import { GroupList } from './ui'

import './index.scss'

const GroupSearch: FunctionComponent = () => {
  const [value, setValue] = useState('')
  const [list, setList] = useState<IGroup[]>([])

  const searchHandle = () => {
    search(value)
      .then((res) => {
        setList(res as any as Array<IGroup>)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onJoinClickHandle = (id) => {
    Taro.showModal({
      title: '提示',
      content: '是否申请加入',
      success: function (res) {
        if (res.confirm) {
          apply(id)
            .then((rs) => {})
            .catch((err) => {
              console.log(err)
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }

  return (
    <CommonMain className='vi-group-search-warpper' title='加入群组' fixed to={4} left>
      <View className='vi-group-search-warpper_container'>
        <Search
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
