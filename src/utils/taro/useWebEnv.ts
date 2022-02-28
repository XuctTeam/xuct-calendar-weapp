/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-28 21:12:35
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-28 21:15:09
 */
import { useEffect, useState } from 'react'
import { getEnv } from '@tarojs/taro'

function useWebEnv(): boolean {
  const [env, setEnv] = useState<boolean>(false)

  useEffect(() => {
    setEnv(getEnv() === 'WEB')
  }, [])

  return env
}

export default useWebEnv
