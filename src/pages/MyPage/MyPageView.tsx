import React, { useEffect } from 'react';
import { Button, Form, Input, Radio } from 'antd';
import useUserManagement from 'hooks/useUserManagement';
import { useMyInfoStore } from 'shared/store/myInfo/myInfo';
import { AddUserRequestType } from 'shared/api/user/userAPIService.types';
const MyPage = () => {
  const { editUser } = useUserManagement();
  const { myInfo } = useMyInfoStore();

  const [form] = Form.useForm<AddUserRequestType>();

  // TODO: 전역상태 작업 후 작업 예정

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

  const handleEdit = async () => {
    try {
      await form.validateFields();
      await editUser(form.getFieldsValue());
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue({ ...myInfo });
  };

  useEffect(() => {
    form.setFieldsValue({ ...myInfo });
  }, []);

  return (
    <div>
      <Form
        style={{ marginTop: '2rem', width: '80%', marginLeft: '1rem' }}
        {...formItemLayout}
        className="antd-form"
        form={form}
        initialValues={form.getFieldsValue()}>
        <Form.Item label="아이디" name="userId">
          <Input disabled />
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
          <Radio.Group style={{ width: '100%' }}>
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
        <div className="mypage-form__button">
          <Button type="primary" onClick={handleCancel} style={{ marginTop: '1rem' }}>
            취소
          </Button>
          <Button type="primary" onClick={handleEdit} style={{ marginTop: '1rem' }}>
            수정
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default MyPage;
