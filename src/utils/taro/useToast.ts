/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-28 21:20:21
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 21:09:37
 */
import { showToast } from '@tarojs/taro'

export interface ToastOption {
  title: string
  duration?: number
  icon?: 'success' | 'loading' | 'none' | 'error'
}

const useToast = (option?: Partial<ToastOption>): Promise<any> => {
  const options = Object.assign({ icon: 'error', duration: 1500 }, option || {})

  return showToast({
    ...(options as ToastOption)
  })
}

export default useToast
