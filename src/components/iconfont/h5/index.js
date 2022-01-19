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

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'duigou':
      return <IconDuigou {...rest} />;
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
