/* eslint-disable */

import React from 'react';

import IconZiyuan from './IconZiyuan';
import IconZuixing81 from './IconZuixing81';
import IconIconAccount from './IconIconAccount';
import IconShouji from './IconShouji';
import IconYouxiang from './IconYouxiang';
import IconWeixin1 from './IconWeixin1';
import Icon29Refresh01 from './Icon29Refresh01';
import IconQunzuCopy from './IconQunzuCopy';
import IconQunzu from './IconQunzu';
import IconJiantou from './IconJiantou';
import IconRili from './IconRili';
import IconJinri from './IconJinri';
export { default as IconZiyuan } from './IconZiyuan';
export { default as IconZuixing81 } from './IconZuixing81';
export { default as IconIconAccount } from './IconIconAccount';
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
    case 'ziyuan':
      return <IconZiyuan key="1" {...rest} />;
    case 'zuixing-81':
      return <IconZuixing81 key="2" {...rest} />;
    case 'icon-account':
      return <IconIconAccount key="3" {...rest} />;
    case 'shouji':
      return <IconShouji key="4" {...rest} />;
    case 'youxiang':
      return <IconYouxiang key="5" {...rest} />;
    case 'weixin1':
      return <IconWeixin1 key="6" {...rest} />;
    case '29Refresh_01':
      return <Icon29Refresh01 key="7" {...rest} />;
    case 'qunzu-copy':
      return <IconQunzuCopy key="8" {...rest} />;
    case 'qunzu':
      return <IconQunzu key="9" {...rest} />;
    case 'jiantou':
      return <IconJiantou key="10" {...rest} />;
    case 'rili':
      return <IconRili key="11" {...rest} />;
    case 'jinri':
      return <IconJinri key="12" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
