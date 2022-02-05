/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-01-26 11:43:14
 * @LastEditTime: 2022-02-04 16:25:21
 * @LastEditors: Derek Xu
 */
import { FunctionComponent } from 'react'
import Cell from '@taroify/core/cell'
import { ClusterOutlined, Description, ManagerOutlined } from '@taroify/icons'
import Router from 'tarojs-router-next'
import Taro from '@tarojs/taro'

const SystemSetting: FunctionComponent = () => {
  const getVersion = () => {
    //@ts-ignore
    return VERSION.version
  }

  const menuClick = (type: number) => {
    if (type === 1) {
      Taro.openSetting({
        success: function (res) {
          console.log(res.authSetting)
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
        }
      })
    } else if (type === 2) {
      Router.toSelfprivacy()
    }
  }

  return (
    <>
      {process.env.TARO_ENV === 'weapp' && <Cell icon={<ManagerOutlined />} title='权限管理' clickable onClick={() => menuClick(1)}></Cell>}
      <Cell icon={<Description />} title='隐私协议' clickable onClick={() => menuClick(2)}></Cell>
      <Cell icon={<ClusterOutlined />} title='当前版本'>
        {getVersion()}
      </Cell>
    </>
  )
}

export default SystemSetting
