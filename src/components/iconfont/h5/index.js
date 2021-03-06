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

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'ziyuan':
      return <IconZiyuan {...rest} />;
    case 'zuixing-81':
      return <IconZuixing81 {...rest} />;
    case 'icon-account':
      return <IconIconAccount {...rest} />;
    case 'shouji':
      return <IconShouji {...rest} />;
    case 'youxiang':
      return <IconYouxiang {...rest} />;
    case 'weixin1':
      return <IconWeixin1 {...rest} />;
    case '29Refresh_01':
      return <Icon29Refresh01 {...rest} />;
    case 'qunzu-copy':
      return <IconQunzuCopy {...rest} />;
    case 'qunzu':
      return <IconQunzu {...rest} />;
    case 'jiantou':
      return <IconJiantou {...rest} />;
    case 'rili':
      return <IconRili {...rest} />;
    case 'jinri':
      return <IconJinri {...rest} />;

  }

  return null;
};

export default IconFont;
