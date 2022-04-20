/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-15 15:34:01
 * @LastEditTime: 2022-04-20 14:04:06
 * @LastEditors: Derek Xu
 */
import { FunctionComponent, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Router from 'tarojs-router-next'
import { Empty } from '@taroify/core'
import CommonMain from '@/components/mixin'
import { TMember } from '~/../@types/group'
import { queryComponentMembers } from '@/api/component'
import { UserBody } from './ui'

import './index.scss'

const ComponentAttendsView: FunctionComponent = () => {
  const [members, setMembers] = useState<TMember[]>([])

  useEffect(() => {
    const { componentId, creatorMemberId } = Router.getParams()
    if (!componentId || !creatorMemberId) return
    queryComponentMembers(creatorMemberId, componentId)
      .then((res) => {
        setMembers(res as any as Array<TMember>)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <CommonMain title='邀请者' left to={1} fixed className='vi-component-members-view-warpper'>
      {members.length === 0 ? (
        <Empty></Empty>
      ) : (
        <View className='vi-component-members-view-warpper_list'>
          {members.map((item, index) => {
            return <UserBody key={index} member={item}></UserBody>
          })}
        </View>
      )}
    </CommonMain>
  )
}

export default ComponentAttendsView
