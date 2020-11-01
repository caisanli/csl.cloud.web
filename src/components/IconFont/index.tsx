import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1886935_iyglu5227tq.js',
});

export default function(props) {
  return <IconFont {...props} />;
}
