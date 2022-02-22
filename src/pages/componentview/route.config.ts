/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-14 10:22:59
 * @LastEditTime: 2022-02-22 16:29:51
 * @LastEditors: Derek Xu
 */
import { IDavComponent } from '~/../@types/calendar'

export type Params = {
  componentId: string
}

export type Data = {
  component: IDavComponent
}

export const Ext = { mustLogin: true }
