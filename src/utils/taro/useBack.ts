/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-28 21:26:26
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 22:20:21
 */
import Router, { NavigateType } from 'tarojs-router-next'

interface BackOption {
  to: number
  data?: any
}

const useBack = (options: Partial<BackOption>): Promise<any> => {
  try {
    return options.data ? Router.back(options.data) : Router.back()
  } catch (err) {
    switch (options.to) {
      case 2:
        return Router.toContactmanager({ type: NavigateType.switchTab })
      case 3:
        return Router.toMessagemanager({ type: NavigateType.switchTab })
      case 4:
        if (options.data && options.data.isLogin) {
          return Router.navigate({ url: '/pages/aboutme/index' }, { type: NavigateType.redirectTo })
        }
        return Router.toAboutme({ type: NavigateType.switchTab })
      case 5:
        return Router.navigate({ url: '/pages/componentview/index' }, { type: NavigateType.redirectTo, params: options.data })
      default:
        return Router.toIndex({ type: NavigateType.switchTab })
    }
  }
}

export default useBack
