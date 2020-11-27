import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal/Modal'
interface IProps extends ModalProps {
  children?: React.ReactChild | React.ReactChild[];
}
export default function(props: IProps) {
  let { children, okText, cancelText,  ...otherProps } = props;
  okText = okText || '确认';
  cancelText = cancelText || '取消'
  return (
    <Modal
       okText={ okText }
       cancelText={ cancelText }
      { ...otherProps }
    >
      { children }
    </Modal>
  )
}
