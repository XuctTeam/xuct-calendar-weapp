/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-28 16:13:36
 * @LastEditTime: 2022-01-28 21:12:18
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import { ShareSheet } from '@taroify/core'

interface IPageStateProps {
  open: boolean
  selected: (event: ShareSheet.OptionObject) => void
  close: () => void
}

const ShareUser: FunctionComponent<IPageStateProps> = (props) => {
  return (
    <ShareSheet open={props.open} onSelect={props.selected} onClose={props.close} onCancel={props.close}>
      <ShareSheet.Header title='立即分享给好友' />
      <ShareSheet.Options>
        {process.env.TARO_ENV === 'weapp' && <ShareSheet.Option icon='wechat' name='微信' />}
        <ShareSheet.Option icon='link' name='复制链接' description='2' />
        <ShareSheet.Option icon='qrcode' name='二维码' description='3' />
      </ShareSheet.Options>
      <ShareSheet.Button type='cancel'>取消</ShareSheet.Button>
    </ShareSheet>
  )
}

export default ShareUser
