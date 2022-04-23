/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-15 15:34:01
 * @LastEditTime: 2022-04-22 21:42:28
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Empty, Search } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { TMember } from '~/../@types/group'
import { queryComponentMembers } from '@/api/component'
import { UserBody } from './ui'

import './index.scss'
import { xor } from 'lodash'

const ComponentAttendsView: FunctionComponent = () => {
  const [value, setValue] = useState('')
  const [members, setMembers] = useState<TMember[]>([])
  const [filterMembers, setFilterMembers] = useState<TMember[]>([])

  useEffect(() => {
    const { componentId, creatorMemberId } = Router.getParams()
    if (!componentId || !creatorMemberId) return
    queryComponentMembers(creatorMemberId, componentId)
      .then((res) => {
        setMembers(res as any as Array<TMember>)
        setFilterMembers(res as any as Array<TMember>)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  /**
   * @description: 搜索
   * @param {*}
   * @return {*}
   * @author: Derek Xu
   */
  const searchHandler = () => {
    if (!value) {
      setFilterMembers(members)
      return
    }
    setFilterMembers(members.filter((member) => member.name.indexOf(value) > -1))
  }

  return (
    <CommonMain title='邀请者' left to={1} fixed className='vi-component-members-view-warpper'>
      <Search
        value={value}
        placeholder='请输入搜索姓名'
        onChange={(e) => setValue(e.detail.value)}
        onSearch={searchHandler}
        onClear={() => setFilterMembers(members)}
      />
      {filterMembers.length === 0 ? (
        <Empty></Empty>
      ) : (
        <View className='vi-component-members-view-warpper_list'>
          {filterMembers.map((item, index) => {
            return <UserBody key={index} member={item}></UserBody>
          })}
        </View>
      )}
    </CommonMain>
  )
}

export default ComponentAttendsView
