/*
 * @Description: 
 * @Author: Derek Xu
 * @Date: 2022-01-28 11:47:13
 * @LastEditTime: 2022-04-07 10:05:11
 * @LastEditors: Derek Xu
 */
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true
      }
    ],
    'linaria/babel' // 添加到 babel-preset
  ],
  plugins: [
    [
      'import',
      {
        libraryName: '@taroify/core',
        libraryDirectory: '',
        style: true
      },
      '@taroify/core'
    ],
    [
      'import',
      {
        libraryName: '@taroify/icons',
        libraryDirectory: '',
        camel2DashComponentName: false,
        style: () => '@taroify/icons/style'
      },
      '@taroify/icons'
    ],
    [
      'import',
      {
        libraryName: 'taro-hooks',
        camel2DashComponentName: false,
      },
      'taro-hooks',
    ],
  ]
}
