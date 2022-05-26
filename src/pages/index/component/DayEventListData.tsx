/*
 * @Author: Derek Xu
 * @Date: 2022-05-25 15:12:01
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-05-25 17:56:07
 * @FilePath: \xuct-calendar-weapp\src\pages\index\component\DayEventListData.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 徐涛 jianhao2010303@163.com, All Rights Reserved.
 */
import { Fragment, FunctionComponent } from 'react'
import { IDavComponent } from '~/../@types/calendar'
import DayEventData from './DayEventData'

interface IPageOption {
  componentList: IDavComponent[]
  viewComponent: (component: IDavComponent) => void
}

const DayEventListData: FunctionComponent<IPageOption> = (props) => {
  return (
    <>
      {props.componentList.map((i, index) => {
        return (
          <Fragment key={index}>
            <DayEventData color={i.color || '417ff9'} component={i} viewComponent={props.viewComponent}></DayEventData>
          </Fragment>
        )
      })}
    </>
  )
}

export default DayEventListData
