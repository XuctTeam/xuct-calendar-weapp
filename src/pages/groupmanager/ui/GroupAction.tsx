/*
 * @Author: Derek Xu
 * @Date: 2022-06-20 18:04:55
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-07-07 17:35:50
 * @FilePath: \xuct-calendar-weapp\src\pages\groupmanager\ui\GroupAction.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FunctionComponent } from 'react'
import { Image, ShareSheet } from '@taroify/core'
import Images from '@/constants/images'

interface IPageOption {
  open: boolean
  actionSelected: (data: ShareSheet.OptionObject) => void
  close: () => void
}

const GroupAction: FunctionComponent<IPageOption> = (props) => {
  return (
    <ShareSheet open={props.open} onSelect={props.actionSelected} onClose={props.close} onCancel={props.close}>
      <ShareSheet.Options>
        <ShareSheet.Option icon={<Image src={Images.GROUP_ADD} />} name='添加' value={1} />
        <ShareSheet.Option icon={<Image src={Images.GROUP_SEARCH} />} name='搜索' value={2} />
      </ShareSheet.Options>
      <ShareSheet.Button type='cancel'>取消</ShareSheet.Button>
    </ShareSheet>
  )
}

export default GroupAction
