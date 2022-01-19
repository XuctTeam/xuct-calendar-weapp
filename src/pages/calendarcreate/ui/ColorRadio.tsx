/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-13 10:03:33
 * @LastEditTime: 2022-01-11 10:10:15
 * @LastEditors: Derek Xu
 */
import { RadioGroup, Radio } from '@tarojs/components'
import { Grid } from '@taroify/core'
import { colors } from '@/constants/index'
import { H5RadioStyle } from './H5RadioStyle'

interface IColorPropState {
  type: 'h5' | 'weapp'
  defaultColor: string
  onChage: (value: string) => void
}

const ColorRadio: React.FC<IColorPropState> = (props) => {
  return (
    <>
      {props.type === 'weapp' ? (
        <RadioGroup name='weapp-color-group' onChange={(e) => props.onChage(e.detail.value)}>
          <Grid columns={5} bordered={false}>
            {colors.map((c) => {
              return (
                <Grid.Item key={c.id + ''}>
                  <Radio value={c.value} color={`#${c.value}`} checked={c.value === props.defaultColor}></Radio>
                </Grid.Item>
              )
            })}
          </Grid>
        </RadioGroup>
      ) : (
        <RadioGroup name='h5-color-group' onChange={(e) => props.onChage(e.detail.value)}>
          <Grid columns={5} bordered={false}>
            {colors.map((c) => {
              return (
                <Grid.Item key={c.id + ''}>
                  <H5RadioStyle color={`#${c.value}`}>
                    <Radio value={c.value} color={`#${c.value}`} checked={c.value === props.defaultColor}></Radio>
                  </H5RadioStyle>
                </Grid.Item>
              )
            })}
          </Grid>
        </RadioGroup>
      )}
    </>
  )
}
export default ColorRadio
