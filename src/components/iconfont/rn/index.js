/* eslint-disable */

import React from 'react';

import Icon29Refresh01 from './Icon29Refresh01';
import IconQunzuCopy from './IconQunzuCopy';
import IconQunzu from './IconQunzu';
import IconJiantou from './IconJiantou';
import IconRili from './IconRili';
import IconJinri from './IconJinri';
export { default as Icon29Refresh01 } from './Icon29Refresh01';
export { default as IconQunzuCopy } from './IconQunzuCopy';
export { default as IconQunzu } from './IconQunzu';
export { default as IconJiantou } from './IconJiantou';
export { default as IconRili } from './IconRili';
export { default as IconJinri } from './IconJinri';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case '29Refresh_01':
      return <Icon29Refresh01 key="1" {...rest} />;
    case 'qunzu-copy':
      return <IconQunzuCopy key="2" {...rest} />;
    case 'qunzu':
      return <IconQunzu key="3" {...rest} />;
    case 'jiantou':
      return <IconJiantou key="4" {...rest} />;
    case 'rili':
      return <IconRili key="5" {...rest} />;
    case 'jinri':
      return <IconJinri key="6" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
