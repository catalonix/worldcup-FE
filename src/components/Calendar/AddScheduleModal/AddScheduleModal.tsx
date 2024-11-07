import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import Modal from 'components/common/Modal';
// import useNotification from 'hooks/useNotification';

interface AddScheduleProps {
  isModalVisible: boolean;
  handleIsModalVisible: (value: boolean) => void;
  handleSearch: () => void;
  selectedDate: string;
  isEdit: boolean;
}

const AddSchedule = (props: AddScheduleProps) => {
  //   const { openNotification } = useNotification();

  const [form] = Form.useForm();

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
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      //   const res = props.isEdit ? await editUser(form.getFieldsValue()) : await addUser(form.getFieldsValue());
      //   if (res) {
      //     props.handleIsModalVisible(false);
      //     resetFields();
      //     props.handleSearch();
      //   }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    props.handleIsModalVisible(false);
    resetFields();
  };

  useEffect(() => {
    if (props.isModalVisible) {
      if (props.selectedDate) {
        // 수정 모드
        // TODO:  해당 날짜의 상세 값 받아와서 초기 값 채우기
      } else {
        // 생성 모드
        resetFields();
      }
    }
  }, [props.isModalVisible]);

  return (
    <Modal
      title="작업 일정 설정"
      isModalVisible={props.isModalVisible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      okText={props.isEdit ? '수정' : '등록'}
      cancelText="취소">
      <Form
        style={{ marginTop: '20px' }}
        {...formItemLayout}
        className="antd-form"
        form={form}
        initialValues={form.getFieldsValue()}>
        <Form.Item label="주요 일정명" name="userId">
          <Input />
        </Form.Item>

        <Form.Item
          label="작업일자"
          name="userName"
          rules={[
            {
              required: true,
              message: '작업일자를 입력해주세요.'
            }
          ]}>
          <Input />
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
      </Form>
    </Modal>
  );
};
export default AddSchedule;
