/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconIconQudaozhanghaoshangxian = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M716.8 0c169.664 0 307.2 137.536 307.2 307.2v409.6c0 169.664-137.536 307.2-307.2 307.2H307.2C137.536 1024 0 886.464 0 716.8V307.2C0 137.536 137.536 0 307.2 0h409.6zM563.2 203.4432a102.4 102.4 0 0 0-102.4 0l-190.4256 109.9392a102.4 102.4 0 0 0-51.2 88.6784v219.8784a102.4 102.4 0 0 0 51.2 88.6784L460.8 820.5696a102.4 102.4 0 0 0 102.4 0l190.4256-109.952a102.4 102.4 0 0 0 51.2-88.6784V402.0608a102.4 102.4 0 0 0-51.2-88.6784zM419.7504 448.6144c3.0208-0.2048 6.272 1.9072 9.7536 6.3232 3.4816 4.608 7.4624 10.1632 11.9424 16.6784 4.48 6.528 9.088 13.3504 13.8496 20.48 4.7744 7.1168 9.4848 14.08 14.1568 20.9152 4.672 6.8224 8.832 12.736 12.4928 17.7536 4.032 5.44 5.5808 9.9584 4.6464 13.5552-0.9088 3.6096-3.9296 5.312-9.0624 5.12-2.4832 0-5.5552 0.064-9.216 0.192l-2.8672 0.1024a331.392 331.392 0 0 1-12.352 0.3072c-3.6736 0.192-5.9136 1.4464-6.7328 3.7632a25.216 25.216 0 0 0-1.1776 7.168l-0.0512 2.304v22.6688c0.0256 8.192 0.0768 19.456 0.128 23.424l0.1152 8.3456 0.0256 8.192v15.0656l-0.1024 3.1616-0.3072 3.1488c-0.2432 2.112-0.896 4.16-1.92 6.016a12.3904 12.3904 0 0 1-4.4032 4.5184c-1.92 1.2032-4.5184 1.8048-7.808 1.8048-3.8528 0-7.3856 0.0512-10.5856 0.1536s-7.0016 0.1536-11.392 0.1536c-6.0416-0.0128-10.112-1.5744-12.224-4.672-1.8432-2.7136-2.88-6.8608-3.1104-12.416l-0.0512-2.4832v-16.4736c-0.0256-3.2-0.0768-6.5408-0.128-10.0352-0.0768-4.0192-0.128-16.768-0.128-24.8192l-0.0128-19.7376-0.0512-2.8928a43.9552 43.9552 0 0 0-1.6-11.392c-1.1008-3.52-3.5712-5.1712-7.4112-4.9664-2.7264 0-6.0544-0.1152-9.9968-0.3072a210.7904 210.7904 0 0 0-10.5856-0.3072c-4.928 0-8.0896-1.4592-9.472-4.3648-1.3696-2.9056-0.4096-6.656 2.8928-11.2768 3.4688-4.8256 7.5008-10.6496 12.0704-17.472l14.2848-21.2224 4.9024-7.2448 9.5232-14.1056c4.6592-6.912 8.832-12.8896 12.4928-17.8944 3.2896-4.6208 6.4384-7.04 9.472-7.232zM649.344 617.664a21.1328 21.1328 0 1 1 0 42.2656h-116.224l-1.8176-0.0768a21.1328 21.1328 0 0 1 1.8176-42.1888z m0-84.5312a21.1328 21.1328 0 1 1 0 42.2656h-116.224l-1.8176-0.0768a21.1328 21.1328 0 0 1 1.8176-42.1888z m0-84.5312a21.1328 21.1328 0 1 1 0 42.2656h-116.224l-1.8176-0.0768a21.1328 21.1328 0 0 1 1.8176-42.1888z m0-84.5312a21.1328 21.1328 0 1 1 0 42.2656H374.656l-1.8304-0.0768a21.1328 21.1328 0 0 1 1.8304-42.1888z"
        fill={getIconColor(color, 0, '#47C13D')}
      />
    </svg>
  );
};

IconIconQudaozhanghaoshangxian.defaultProps = {
  size: 18,
};

export default IconIconQudaozhanghaoshangxian;
