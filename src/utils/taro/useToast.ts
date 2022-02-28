/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-28 21:20:21
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-28 21:47:18
 */
import { useEffect, useRef } from 'react'
import { showToast } from '@tarojs/taro'

export interface ToastOption {
  title: string
  duration?: number
  icon?: 'success' | 'loading' | 'none' | 'error'
}

function useToast(option?: Partial<ToastOption>) {
  const initialOption = useRef<Partial<ToastOption>>()

  useEffect(() => {
    initialOption.current = option
  }, [option])

  const options = Object.assign({ icon: 'error' }, initialOption.current || {}, option || {})

  showToast({
    ...(options as ToastOption)
  })
}

export default useToast
