/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-28 21:12:35
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-03-01 17:00:53
 */

function useWebEnv(): boolean {
  return process.env.TARO_ENV === 'h5'
}

export default useWebEnv
