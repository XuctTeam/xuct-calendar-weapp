/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconZiyuan = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m234.666667 614.613333a78.506667 78.506667 0 0 1-78.293334 78.293334H355.626667A78.506667 78.506667 0 0 1 277.333333 614.613333v-205.226666a78.506667 78.506667 0 0 1 78.293334-78.293334h312.746666A78.506667 78.506667 0 0 1 746.666667 409.386667z"
        fill={getIconColor(color, 0, '#5FB75F')}
      />
      <path
        d="M691.626667 378.026667l-141.013334 123.093333a58.88 58.88 0 0 1-77.226666 0l-141.013334-123.093333a39.466667 39.466667 0 0 0-16 31.36v6.826666l113.493334 98.773334-111.573334 110.08a39.253333 39.253333 0 0 0 28.16 27.306666l110.933334-109.44a14.08 14.08 0 0 0 2.56-3.626666 97.706667 97.706667 0 0 0 104.533333 0 14.08 14.08 0 0 0 2.56 3.626666l110.933333 109.44a39.253333 39.253333 0 0 0 28.16-27.306666l-111.573333-110.08 113.493333-98.773334v-6.826666a39.466667 39.466667 0 0 0-16.426666-31.36z"
        fill={getIconColor(color, 1, '#5FB75F')}
      />
    </svg>
  );
};

IconZiyuan.defaultProps = {
  size: 18,
};

export default IconZiyuan;
