/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2022-04-02 09:02:31
 * @LastEditTime: 2022-04-02 11:12:40
 * @LastEditors: Derek Xu
 */
import { Cell } from '@taroify/core'
import { FunctionComponent, useEffect, useState } from 'react'

interface IPageOption {
  status: number
  operation: number
  content: JSON | null
}

const EventBody: FunctionComponent<IPageOption> = (props) => {
  const [summary, setSummary] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [createMemberName, setCreateMemberName] = useState<string>('')

  useEffect(() => {
    if (!props.content) return
    if (props.content['summary']) {
      setSummary(props.content['summary'])
    }
    if (props.content['location']) {
      setLocation(props.content['location'])
    }
    if (props.content['startDate']) {
      setStartDate(props.content['startDate'])
    }
    if (props.content['createMemberName']) {
      setCreateMemberName(props.content['createMemberName'])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getType = () => {
    if (props.operation === 3) return '删除消息'
    return ''
  }

  return (
    <Cell.Group inset>
      <Cell title='分类'>日程消息</Cell>
      <Cell title='类型'>{getType()}</Cell>
      <Cell title='标题'>{summary}</Cell>
      <Cell title='地点'>{location}</Cell>
      <Cell title='开始时间'>{startDate}</Cell>
      <Cell title='组织者'>{createMemberName}</Cell>
    </Cell.Group>
  )
}

export default EventBody
