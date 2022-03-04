/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Icon29Refresh01 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1029 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M514.547264 5.094527C233.329353 5.094527 5.094527 232.8199 5.094527 514.547264s228.234826 509.452736 509.452737 509.452736 509.452736-228.234826 509.452736-509.452736S795.765174 5.094527 514.547264 5.094527zM202.252736 440.676617C236.38607 294.973134 364.768159 193.59204 514.547264 193.59204s278.161194 101.381095 312.294527 247.084577c4.075622 16.302488-6.113433 33.114428-22.925373 36.680597-16.302488 4.075622-33.114428-6.113433-36.680597-22.925373C739.725373 336.748259 635.797015 254.726368 514.547264 254.726368S289.369154 336.748259 261.858706 454.941294c-3.566169 14.264677-15.793035 23.434826-29.548258 23.434825-2.547264 0-4.585075-0.509453-7.132339-1.018905-16.81194-4.075622-27.000995-20.378109-22.925373-36.680597zM575.681592 514.547264c0 33.623881-27.510448 61.134328-61.134328 61.134328s-61.134328-27.510448-61.134329-61.134328 27.510448-61.134328 61.134329-61.134329 61.134328 27.000995 61.134328 61.134329z m252.179105 70.304477c-15.793035 69.795025-55.020896 133.476617-111.060697 178.817911-57.058706 45.850746-128.38209 71.323383-201.743284 71.323383-73.361194 0-144.684577-25.472637-201.743283-71.323383-56.039801-45.341294-95.777114-108.513433-111.570149-178.308458-3.566169-16.302488 6.622886-32.604975 22.925373-36.680597 16.302488-3.566169 32.604975 6.622886 36.680597 22.925373C288.350249 690.81791 392.278607 774.368159 514.547264 774.368159c120.740299 0 227.21592-85.078607 253.707462-202.762189 3.566169-16.302488 19.868657-27.000995 36.680597-22.925373 16.302488 3.566169 26.491542 19.868657 22.925374 36.171144z"
        fill={getIconColor(color, 0, '#DD6572')}
      />
    </svg>
  );
};

Icon29Refresh01.defaultProps = {
  size: 18,
};

export default Icon29Refresh01;
