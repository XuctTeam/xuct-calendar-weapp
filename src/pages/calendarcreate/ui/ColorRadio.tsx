/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-13 10:03:33
 * @LastEditTime: 2022-03-01 14:38:08
 * @LastEditors: Derek Xu
 */
import { View } from '@tarojs/components'
import { Grid, Radio } from '@taroify/core'
import { GridItem } from '@taroify/core/grid/grid-item'
import { colors } from '@/constants/index'
import { styled } from 'linaria/react'

interface IColorPropState {
  defaultColor: string
  onChage: (value: string) => void
}

export const RadioColorStyle = styled(View)<{
  color: string
}>`
  .taroify-radio__icon--checked .taroify-icon {
    background-color: ${(props) => props.color};
    border-color: ${(props) => props.color};
  }
`

const ColorRadio: React.FC<IColorPropState> = (props) => {
  return (
    <>
      <Radio.Group value={props.defaultColor} size={24} onChange={(e) => props.onChage(e)}>
        <Grid columns={5} bordered={false} gutter={10}>
          {colors.map((c, i) => {
            return (
              <GridItem key={i}>
                <RadioColorStyle color={`#${c.value}`}>
                  <Radio key={i} name={c.value}></Radio>
                </RadioColorStyle>
              </GridItem>
            )
          })}
        </Grid>
      </Radio.Group>
    </>
  )
}
export default ColorRadio
