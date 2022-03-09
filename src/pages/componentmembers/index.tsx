/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-03-09 20:48:43
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-09 22:18:04
 */
import { FunctionComponent, useEffect, useState } from 'react'
import Router from 'tarojs-router-next'
import CommonMain from '@/components/mixin'
import { distinctMemberList } from '@/api/groupmember'

import './index.scss'

const ComponentMembers: FunctionComponent = () => {
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    const data = Router.getData()
    if (data) {
      setIds(data as any as Array<string>)
    }

    distinctMemberList().then((res) => {
      console.log(res)
    })
  }, [])

  return (
    <CommonMain title='参与者选择' left to={1} fixed className='vi-component-members-warpper'>
      <></>
    </CommonMain>
  )
}

export default ComponentMembers
