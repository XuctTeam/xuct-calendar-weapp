/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-14 13:08:38
 * @LastEditTime: 2022-03-14 13:08:38
 * @LastEditors: Derek Xu
 */
import { getSystemInfo } from '@tarojs/taro'
import { useCallback, useEffect, useState } from 'react'

export type Result = Taro.getSystemInfo.Result | undefined

function useSystemInfo(): Result {
  const [systemInfo, setSystemInfo] = useState<Result>()

  useEffect(() => {
    getSystemInfoSync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getSystemInfoSync = useCallback(() => {
    try {
      getSystemInfo({
        success: setSystemInfo,
        fail: () => console.error({ errMsg: 'getSystemInfo: fail' })
      })
    } catch (e) {
      console.error({ errMsg: 'getSystemInfo: fail', data: e })
    }
  }, [])

  return systemInfo
}

export default useSystemInfo
