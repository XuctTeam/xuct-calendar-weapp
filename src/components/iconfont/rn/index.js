/* eslint-disable */

import React from 'react';

import IconIconQudaozhanghaoshangxian from './IconIconQudaozhanghaoshangxian';
import IconShouji from './IconShouji';
import IconYouxiang from './IconYouxiang';
import IconWeixin1 from './IconWeixin1';
import Icon29Refresh01 from './Icon29Refresh01';
import IconQunzuCopy from './IconQunzuCopy';
import IconQunzu from './IconQunzu';
import IconJiantou from './IconJiantou';
import IconRili from './IconRili';
import IconJinri from './IconJinri';
export { default as IconIconQudaozhanghaoshangxian } from './IconIconQudaozhanghaoshangxian';
export { default as IconShouji } from './IconShouji';
export { default as IconYouxiang } from './IconYouxiang';
export { default as IconWeixin1 } from './IconWeixin1';
export { default as Icon29Refresh01 } from './Icon29Refresh01';
export { default as IconQunzuCopy } from './IconQunzuCopy';
export { default as IconQunzu } from './IconQunzu';
export { default as IconJiantou } from './IconJiantou';
export { default as IconRili } from './IconRili';
export { default as IconJinri } from './IconJinri';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-qudaozhanghaoshangxian':
      return <IconIconQudaozhanghaoshangxian key="1" {...rest} />;
    case 'shouji':
      return <IconShouji key="2" {...rest} />;
    case 'youxiang':
      return <IconYouxiang key="3" {...rest} />;
    case 'weixin1':
      return <IconWeixin1 key="4" {...rest} />;
    case '29Refresh_01':
      return <Icon29Refresh01 key="5" {...rest} />;
    case 'qunzu-copy':
      return <IconQunzuCopy key="6" {...rest} />;
    case 'qunzu':
      return <IconQunzu key="7" {...rest} />;
    case 'jiantou':
      return <IconJiantou key="8" {...rest} />;
    case 'rili':
      return <IconRili key="9" {...rest} />;
    case 'jinri':
      return <IconJinri key="10" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
