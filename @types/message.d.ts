/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-02-21 14:43:44
 * @LastEditTime: 2022-02-21 16:40:48
 * @LastEditors: Derek Xu
 */
export interface IMessage {
  id?: string
  memberId: string
  type: 'SYSTEM' | 'GROUP'
  createTime: Date
  operation: number
  status: number
  content?: JSON
}

export interface IMessagePageComponent {
  finished: boolean
  messages: Array<IMessage>
}
