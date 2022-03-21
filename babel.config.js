/*
 * @Description: 
 * @Author: Derek Xu
 * @Date: 2022-01-28 11:47:13
 * @LastEditTime: 2022-03-21 12:44:54
 * @LastEditors: Derek Xu
 */
// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
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
