/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2022-02-26 22:44:03
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-02-26 22:46:42
 */
import { Fragment, FunctionComponent } from 'react'
import { Button, Flex } from '@taroify/core'

interface IPageProps {
  state: number
}

const GroupButton: FunctionComponent<IPageProps> = (props) => {
  return (
    <Fragment>
      {props.state === 0 && (
        <Flex gutter={10}>
          <Flex.Item span={12}>
            <Button color='warning'>警告按钮</Button>
          </Flex.Item>
          <Flex.Item span={12}>
            <Button color='danger'>危险按钮</Button>
          </Flex.Item>
        </Flex>
      )}
    </Fragment>
  )
}

export default GroupButton
