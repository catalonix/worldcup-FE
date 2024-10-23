import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import Modal from 'components/common/Modal';
import useUserManagement from 'hooks/userManagement';
import useNotification from 'hooks/useNotification';

interface AddUserModalProps {
  isModalVisible: boolean;
  handleIsModalVisible: (value: boolean) => void;
}

const AddUserModal = (props: AddUserModalProps) => {
  const { addUser, checkId } = useUserManagement();
  const { openNotification } = useNotification();

  const [form] = Form.useForm();

  const [isCheckedId, setIsCheckedId] = useState<boolean>(false);

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

  const resetFields = () => {
    form.setFieldsValue({
      userId: '',
      password: '',
      userName: '',
      hp: '',
      dept: '',
      userCode: '0',
      passwordCheck: ''
    });
    form.setFieldValue('userId', '');
    setIsCheckedId(false);
  };

  const handleOk = async () => {
    try {
      if (!isCheckedId) {
        openNotification('error', '아이디 중복 확인을 해주세요.');
        return;
      }

      await form.validateFields();
      const res = await addUser(form.getFieldsValue());
      if (res) {
        props.handleIsModalVisible(false);
        resetFields();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    props.handleIsModalVisible(false);
    resetFields();
  };

  const handleDuplicationCheckBtnClick = async () => {
    const res = await checkId(form.getFieldValue('userId'));
    setIsCheckedId(res);
  };

  useEffect(() => {
    form.setFieldsValue({
      userId: '',
      password: '',
      userName: '',
      hp: '',
      dept: '',
      userCode: '0',
      passwordCheck: ''
    });
  }, []);

  return (
    <Form style={{ marginTop: '20px' }} {...formItemLayout} className="antd-form" form={form}>
      <Modal
        title="회원 추가"
        isModalVisible={props.isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        okText="등록"
        cancelText="취소">
        <Form.Item
          style={{ marginTop: '20px' }}
          label="아이디"
          name="userId"
          rules={[{ whitespace: true, max: 8, required: true, message: '아이디를 8글자 미만으로 입력해주세요.' }]}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Input onChange={e => form.setFieldValue('userId', e.target.value)} disabled={isCheckedId} />
            <Button onClick={handleDuplicationCheckBtnClick} disabled={isCheckedId}>
              중복 확인
            </Button>
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
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="비밀번호 확인"
          name="passwordCheck"
          rules={[
            {
              required: true,
              message: '비밀번호를 한 번 더 입력해주세요.'
            },
            {
              validator: (_, value) => {
                const password = form.getFieldValue('password');
                if (!value || password === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
              }
            }
          ]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="담당자"
          name="userName"
          rules={[
            {
              required: true,
              message: '담당자를 입력해주세요.'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="권한설정"
          name="userCode"
          rules={[
            {
              required: true,
              message: '권한을 선택해주세요.'
            }
          ]}>
          <Radio.Group defaultValue={'0'} style={{ width: '100%' }}>
            <Radio.Button value="0">사용자</Radio.Button>
            <Radio.Button value="1">관리자</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="부서"
          name="dept"
          rules={[
            {
              required: true,
              message: '부서를 입력해주세요.'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="연락처"
          name="hp"
          rules={[
            {
              required: true,
              message: '연락처를 입력해주세요.'
            },
            {
              pattern: /^((\+82-1[0-9]{1})|(\d{2,3})-?(\d{3,4})-?(\d{4}))$/,
              message: '유효한 전화번호를 입력해주세요.'
            }
          ]}>
          <Input />
        </Form.Item>
      </Modal>
    </Form>
  );
};
export default AddUserModal;
