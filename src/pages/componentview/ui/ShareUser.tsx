/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-28 16:13:36
 * @LastEditTime: 2022-04-07 11:49:07
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { ShareSheet } from '@taroify/core'

interface IPageOption {
  open: boolean
  selected: (event: ShareSheet.OptionObject) => void
  close: () => void
}

const ShareUser: FunctionComponent<IPageOption> = (props) => {
  return (
    <ShareSheet open={props.open} onSelect={props.selected} onClose={props.close} onCancel={props.close}>
      <ShareSheet.Header title='立即分享给好友' />
      <ShareSheet.Options>
        {process.env.TARO_ENV === 'weapp' && <ShareSheet.Option icon='wechat' name='微信' value='1' />}
        <ShareSheet.Option icon='link' name='复制链接' value='2' />
        <ShareSheet.Option icon='qrcode' name='二维码' value='3' />
      </ShareSheet.Options>
      <ShareSheet.Button type='cancel'>取消</ShareSheet.Button>
    </ShareSheet>
  )
}

export default ShareUser
