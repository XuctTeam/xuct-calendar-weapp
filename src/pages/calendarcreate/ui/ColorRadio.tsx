/*
 * @Description:
 * @Author: Derek Xu
 * @Date: 2021-12-13 10:03:33
 * @LastEditTime: 2022-01-30 13:47:24
 * @LastEditors: Derek Xu
 */
import { Grid, Radio } from '@taroify/core'
import { colors } from '@/constants/index'
import { H5RadioStyle } from './H5RadioStyle'

interface IColorPropState {
  type: 'h5' | 'weapp'
  defaultColor: string
  onChage: (value: string) => void
}

interface IColorStateProps {
  color: string
}

const radioColorStyle = (props: IColorStateProps): React.CSSProperties => ({
  .taroify - radio__icon--checked .taroify - icon{
    
  }
})

const ColorRadio: React.FC<IColorPropState> = (props) => {
  return (
    <>
      <Radio.Group value={props.defaultColor} size={24} onChange={(e) => props.onChage(e)}>
        <Grid columns={5} bordered={false} gutter={10}>
          {colors.map((c, i) => {
            return <Radio key={i} name={c.value} style={radioColorStyle({ color: c.value })}></Radio>
          })}
        </Grid>
      </Radio.Group>
    </>
  )
}
export default ColorRadio
