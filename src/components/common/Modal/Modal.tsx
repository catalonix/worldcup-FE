import React from 'react';

import { Modal as AntdModal } from 'antd';
import { ReactNode } from 'react';
interface ModalProps {
  isModalVisible: boolean;
  title: string;
  handleOk?: () => void;
  handleCancel: () => void;
  children?: ReactNode;
  cancelText?: string;
  okText?: string;
  width?: number;
  footer?: React.ReactNode;
}
const Modal = (props: ModalProps) => {
  return (
    <AntdModal
      className="antd-modal"
      title={props.title}
      open={props.isModalVisible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      cancelText={props.cancelText ? props.cancelText : '닫기'}
      okText={props.okText ? props.okText : '확인'}
      width={props.width ? props.width : 600}
      footer={props.footer}>
      {props.children}
    </AntdModal>
  );
};
export default Modal;
