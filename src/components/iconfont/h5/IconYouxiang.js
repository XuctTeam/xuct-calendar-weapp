/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconYouxiang = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M735.872 968.96H241.28c-112.256 0-203.264-91.008-203.264-203.264V271.104C38.016 158.848 129.024 67.84 241.28 67.84h494.592c112.256 0 203.264 91.008 203.264 203.264v494.592c0 112.256-91.008 203.264-203.264 203.264z"
        fill={getIconColor(color, 0, '#00A9FA')}
      />
      <path
        d="M538.112 560.768L768 330.88c-5.504-3.328-11.776-4.736-18.304-4.736H227.84c-5.76 0-11.52 1.28-16.64 3.712l230.912 230.912c26.368 26.368 69.376 26.368 96 0zM192.384 346.752c-3.584 6.016-5.504 12.8-5.504 20.096v302.976c0 8.32 2.56 15.872 6.784 22.144l172.8-171.52-174.08-173.696z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M555.648 578.432c-17.408 17.664-40.704 27.392-65.664 27.392-24.832 0-48.256-9.856-65.92-27.392l-39.936-39.936-170.88 169.088c4.48 2.048 9.344 3.072 14.592 3.072h521.856c7.04 0 13.568-1.792 19.328-5.248L597.888 536.192l-42.24 42.24zM785.792 348.544L615.808 518.272l170.496 168.96c2.56-5.248 3.968-11.008 3.968-17.408V366.848c0-6.528-1.408-12.8-4.48-18.304z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </svg>
  );
};

IconYouxiang.defaultProps = {
  size: 18,
};

export default IconYouxiang;
