/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-11-30 13:24:21
 * @LastEditTime: 2022-03-31 17:22:39
 * @LastEditors: Derek Xu
 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户信息无效',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '请求资源不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  424: '验证失败',
  500: '服务器异常',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时',

  1003: '账号或密码错误',
  1004: '无效的Token',
  1007: '无效的验证码',
  1001: '无效登陆方式',
  1103: '账号被冻结',
  1101: '用户未认证',
  1104: '密码错误',
  1200: '服务器异常',

  5000: '用户中心异常',
  5001: '微信访问异常',
  9999: '访问服务异常'
}

export default codeMessage
