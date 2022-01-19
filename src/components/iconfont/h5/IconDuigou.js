/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconDuigou = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M511.877208 511.877149m-511.877149 0a511.877149 511.877149 0 1 0 1023.754299 0 511.877149 511.877149 0 1 0-1023.754299 0Z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <path
        d="M511.877208 102.37543c226.2497 0 409.50172 183.25202 409.50172 409.501719s-183.25202 409.50172-409.50172 409.50172-409.50172-183.25202-409.501719-409.50172 183.763897-409.50172 409.501719-409.501719z"
        fill={getIconColor(color, 1, '#4381E6')}
      />
      <path
        d="M741.198171 365.480285c-12.285052-11.773174-31.224506-11.773174-43.509557 0l-240.070383 230.344717-131.040551-125.409902c-12.285052-11.773174-31.224506-11.773174-43.509557 0-11.773174 10.74942-12.285052 29.176998-1.023755 40.438295l1.023755 1.023754L436.11939 658.274014c12.285052 11.773174 31.224506 11.773174 43.509558 0l262.081101-251.33168c11.773174-10.74942 12.285052-29.176998 1.023754-40.438295-0.511877 0-1.023754-0.511877-1.535632-1.023754z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </svg>
  );
};

IconDuigou.defaultProps = {
  size: 18,
};

export default IconDuigou;
