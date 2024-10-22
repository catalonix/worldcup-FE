import React from 'react';

import { Button, Form, Select, Input, Radio } from 'antd';

import Modal from 'components/common/Modal';
import { userSearchOptions } from 'common/constants/userManagement';

interface AddUserModalProps {
  isModalVisible: boolean;
  handleIsModalVisible: (value: boolean) => void;
}

const AddUserModal = (props: AddUserModalProps) => {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  };

  const handleOk = () => {
    props.handleIsModalVisible(false);
  };

  const handleCancel = () => {
    props.handleIsModalVisible(false);
  };

  const handleDuplicationCheckBtnClick = () => {
    alert('중복확인 api 연동필요');
  };

  return (
    <Modal
      title="회원 추가"
      isModalVisible={props.isModalVisible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      okText="등록"
      cancelText="취소">
      <Form style={{ marginTop: '20px' }} {...formItemLayout} className="antd-form">
        <Form.Item
          label="아이디"
          name="id"
          rules={[
            {
              required: true,
              message: '아이디를 입력해주세요.'
            }
          ]}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Input />
            <Button onClick={handleDuplicationCheckBtnClick}>중복 확인</Button>
          </div>
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해주세요.'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="비밀번호 확인"
          name="passwordCheck"
          rules={[
            {
              required: true,
              message: 'Please input!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="담당자"
          name="variant"
          rules={[
            {
              required: true,
              message: 'Please input!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="권한설정"
          name="variant"
          rules={[
            {
              required: true,
              message: 'Please input!'
            }
          ]}>
          <Radio.Group defaultValue="user" style={{ width: '100%' }}>
            <Radio.Button value="user">사용자</Radio.Button>
            <Radio.Button value="admin">관리자</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="부서"
          name="variant"
          rules={[
            {
              required: true,
              message: 'Please input!'
            }
          ]}>
          <Select options={userSearchOptions} defaultValue={'all'} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="연락처"
          name="variant"
          rules={[
            {
              required: true,
              message: 'Please input!'
            }
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddUserModal;
