/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconJiantou = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M671.589 511.711l-39.518-39.518-230.692-230.692-0.021 0.021a28.115 28.115 0 0 0-0.809-0.851c-10.935-10.935-28.663-10.935-39.598 0-10.935 10.935-10.935 28.663 0 39.598 0.278 0.278 0.564 0.545 0.851 0.809l-0.021 0.021L592.472 511.79l-231.94 231.94c-10.935 10.935-10.935 28.663 0 39.598s28.663 10.935 39.598 0L671.668 511.79l-0.079-0.079z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconJiantou.defaultProps = {
  size: 18,
};

export default IconJiantou;
