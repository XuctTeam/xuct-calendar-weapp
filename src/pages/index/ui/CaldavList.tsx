/*
 * @Description:
 * @Version: 1.0
 * @Autor: Derek Xu
 * @Date: 2021-12-02 22:46:09
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-01-13 11:09:42
 */
import Taro from '@tarojs/taro'
import { View, CheckboxGroup, Checkbox } from '@tarojs/components'
import { Popup, Empty, Button, Cell } from '@taroify/core'
import _ from 'lodash'
import { IDavCalendar } from '~/../@types/calendar'
import { useEffect, useState } from 'react'

interface ICalDavListProps {
  calendars: Array<IDavCalendar>
  open: boolean
  hasLogin: boolean
  closePopup: () => void
  selected: (value: string[]) => void
}

const CaldavList: React.FC<ICalDavListProps> = (props) => {
  const [showCalendars, setShowCalendars] = useState<Array<IDavCalendar>>([])

  useEffect(() => {
    const _showCalendars = props.calendars.filter((i) => i.display === 1)
    setShowCalendars(_showCalendars)
  }, [props.calendars])

  const checkGroupChange = (value: string[]) => {
    props.selected(value)
  }

  return (
    <>
      <Popup open={props.open} placement='top' style={{ height: '60%' }} onClose={props.closePopup}>
        <View className='title'>我的日历</View>
        {!props.hasLogin || showCalendars.length === 0 ? (
          <Empty>
            <Empty.Image src='https://img.yzcdn.cn/vant/custom-empty-image.png' />
            <Empty.Description>暂无数据</Empty.Description>
          </Empty>
        ) : (
          <View className='content'>
            <CheckboxGroup onChange={(e) => checkGroupChange(e.detail.value)}>
              <Cell.Group>
                {showCalendars.map((item) => {
                  return (
                    <Cell key={item.id + ''} title={item.name}>
                      <Checkbox className='checkbox-list__checkbox' value={item.calendarId + ''} checked={item.checked} color={`#${item.color}`}></Checkbox>
                    </Cell>
                  )
                })}
              </Cell.Group>
            </CheckboxGroup>
          </View>
        )}
        {!props.hasLogin ? (
          <></>
        ) : (
          <View className='button'>
            <Button
              color='primary'
              block
              onClick={() => {
                props.closePopup()
                Taro.navigateTo({ url: '/pages/calendarcreate/index' })
              }}
            >
              新增日历
            </Button>
          </View>
        )}
      </Popup>
    </>
  )
}
export default CaldavList
