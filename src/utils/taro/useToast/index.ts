/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-28 21:20:21
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-02 13:21:40
 */
import { showToast, hideToast } from '@tarojs/taro'
import { useCallback, useEffect, useRef } from 'react'

import { ToastOption } from '../index'

export type ShowToast = (option?: Partial<ToastOption>) => Promise<TaroGeneral.CallbackResult>
export type HideToast = () => Promise<TaroGeneral.CallbackResult>

function useToast(option?: Partial<ToastOption>): [ShowToast, HideToast] {
  const initialOption = useRef<Partial<ToastOption>>()

  useEffect(() => {
    initialOption.current = option
  }, [option])

  const showToastAsync = useCallback<ShowToast>(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (option?: Partial<ToastOption>) => {
      return new Promise((resolve, reject) => {
        try {
          if (!option && !initialOption.current) {
            console.warn('please provide a option')
            return reject(new Error('please provide a option'))
          } else {
            const options = Object.assign({ icon: 'error' }, initialOption.current || {}, option || {})
            if (!options.title) {
              reject({ errMsg: 'showToast: fail' })
            } else {
              showToast({
                ...(options as ToastOption),
                success: resolve,
                fail: reject
              }).catch(reject)
            }
          }
        } catch (e) {
          reject(e)
        }
      })
    },
    [initialOption]
  )

  const hideToastAsync = useCallback<HideToast>(() => {
    return new Promise((resolve, reject) => {
      try {
        hideToast({
          success: resolve,
          fail: reject
        })
      } catch (e) {
        reject(e)
      }
    })
  }, [])

  return [showToastAsync, hideToastAsync]
}

export default useToast
