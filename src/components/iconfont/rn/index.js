/* eslint-disable */

import React from 'react';

import IconDuigou from './IconDuigou';
import IconJiantou from './IconJiantou';
import IconRili from './IconRili';
import IconJinri from './IconJinri';
export { default as IconDuigou } from './IconDuigou';
export { default as IconJiantou } from './IconJiantou';
export { default as IconRili } from './IconRili';
export { default as IconJinri } from './IconJinri';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'duigou':
      return <IconDuigou key="1" {...rest} />;
    case 'jiantou':
      return <IconJiantou key="2" {...rest} />;
    case 'rili':
      return <IconRili key="3" {...rest} />;
    case 'jinri':
      return <IconJinri key="4" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
