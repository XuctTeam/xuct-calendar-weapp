/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-28 11:42:57
 * @LastEditTime: 2022-07-06 21:02:00
 * @LastEditors: Derek Xu
 */
import { Fragment, FunctionComponent } from 'react'
import { Empty } from '@taroify/core'
import { IGroupMember } from '~/../@types/group'
import { View } from '@tarojs/components'
import ApplyBody from './ApplyBody'

interface IPageOption {
  groups: Array<IGroupMember>
  reject: (id: string) => void
  agree: (id: string) => void
}

const ApplyMine: FunctionComponent<IPageOption> = (props) => {
  return (
    <Fragment>
      {props.groups.length === 0 ? (
        <Empty>
          <Empty.Image />
          <Empty.Description>暂无数据</Empty.Description>
        </Empty>
      ) : (
        props.groups.map((item, key) => {
          return (
            <View key={key} className='vi-group-apply-warpper_list'>
              <ApplyBody
                type={2}
                id={item.id}
                memberName={item.name}
                groupName={item.groupName}
                groupCreateName={item.groupCreateMemberName || ''}
                applyName={item.createTime}
                reject={props.reject}
                agree={props.agree}
              ></ApplyBody>
            </View>
          )
        })
      )}
    </Fragment>
  )
}

export default ApplyMine
