import React, { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import ChooseFolder from './ChooseFolder';
import { IOperateProps } from '@/types';

export default function(props: IOperateProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const { type, id, now } = props;

  useEffect(() => {
    if(!now) return ;
    setVisible(true);
  }, [props.now])

  return (
    <ChooseFolder visible={ visible } />
  )
}
