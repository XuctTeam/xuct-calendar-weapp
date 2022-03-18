/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-03-02 12:02:21
 * @LastEditTime: 2022-03-18 16:51:02
 * @LastEditors: Derek Xu
 */

export const saveImageForH5 = async (filePath: string) => {
  if (filePath) {
    let result = true
    try {
      const downloadElement = document.createElement('a')
      downloadElement.href = filePath
      downloadElement.download = filePath.split('/').reverse()[0]
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
    } catch (e) {
      result = false
    }
    return result
  }
  return false
}
