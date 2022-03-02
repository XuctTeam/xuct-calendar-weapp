/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-02 08:59:45
 * @LastEditTime: 2022-03-02 08:59:46
 * @LastEditors: Derek Xu
 */
export const upload = (): string => {
  //@ts-ignore
  return SERVICE_URL + '/ums/api/app/v1/common/upload'
}
