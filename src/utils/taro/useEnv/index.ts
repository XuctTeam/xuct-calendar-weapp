/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-02 09:03:59
 * @LastEditTime: 2022-03-02 09:05:14
 * @LastEditors: Derek Xu
 */
import { getEnv } from '@tarojs/taro'
import { useEffect, useState } from 'react'

export type Result = TaroGeneral.ENV_TYPE | ''

function useEnv(): Result {
  const [env, setEnv] = useState<Result>('')

  useEffect(() => {
    setEnv(getEnv())
  }, [])

  return env
}

export default useEnv
