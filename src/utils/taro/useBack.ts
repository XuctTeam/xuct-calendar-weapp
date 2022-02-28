/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-28 21:26:26
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-28 21:31:56
 */

import { useEffect, useRef } from 'react'
import Router, { NavigateType } from 'tarojs-router-next'

interface BackOption {
  to: number
  data?: any
}

function useBack(option?: Partial<BackOption>) {
  const initialOption = useRef<Partial<BackOption>>()

  useEffect(() => {
    initialOption.current = option
  }, [option])

  const options = Object.assign({}, initialOption.current || {}, option || {})

  try {
    if (options.data) {
      Router.back(options.data)
      return
    }
    Router.back()
  } catch (err) {
    if (options.to === 1) {
      Router.toIndex({ type: NavigateType.switchTab })
    } else if (options.to === 2) {
      //Router.toAboutme({ type: NavigateType.switchTab })
      Router.toContactmanager({ type: NavigateType.switchTab })
    } else if (options.to === 3) {
      Router.toMessagemanager({ type: NavigateType.switchTab })
      //Router.navigate({ url: '/pages/componentview/index' }, { type: NavigateType.redirectTo, params: data })
    } else if (options.to === 4) {
      //Router.toContactmanager({ type: NavigateType.switchTab })
      Router.toAboutme({ type: NavigateType.switchTab })
    } else if (options.to === 5) {
      Router.navigate({ url: '/pages/componentview/index' }, { type: NavigateType.redirectTo, params: data })
    }
  }
}

export default useBack
