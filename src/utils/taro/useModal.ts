/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-28 21:41:35
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 08:47:55
 */
import { showModal } from '@tarojs/taro'
import { useCallback, useEffect, useRef } from 'react'

interface SuccessCallbackResult extends TaroGeneral.CallbackResult {
  /** 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭） */
  cancel: boolean
  /** 为 true 时，表示用户点击了确定按钮 */
  confirm: boolean
  /** 调用结果 */
  errMsg: string
}

export interface ModalOption {
  title?: string
  content?: string
  mask?: boolean
  cancelColor?: string
  cancelText?: string
  confirmColor?: string
  confirmText?: string
  showCancel?: boolean
}

export type ShowModal = (option?: ModalOption) => Promise<SuccessCallbackResult>

function useModal(option?: ModalOption): [ShowModal] {
  const initialOption = useRef<ModalOption>()

  useEffect(() => {
    initialOption.current = option
  }, [option])

  const showModalAsync = useCallback<ShowModal>(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (option?: ModalOption) => {
      return new Promise((resolve, reject) => {
        try {
          if (!option && !initialOption.current) {
            console.warn('please provide a option')
            return reject(new Error('please provide a option'))
          } else {
            const options = Object.assign({}, initialOption.current || {}, option || {})
            showModal({
              ...options,
              success: resolve,
              fail: reject
            }).catch(reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    },
    [initialOption]
  )

  return [showModalAsync]
}

export default useModal
