import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { DatePicker, Form, Input } from 'antd';
import Modal from 'components/common/Modal';
import DynamicWorkItems from '../DynamicWorkItems';
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
  const [date, setDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate() - 7)));
  const [amWorkItems, setAmWorkItems] = useState<{ dept: string; morningWork: string }[]>([
    { dept: '', morningWork: '' }
  ]);
  const [pmWorkItems, setPmWorkItems] = useState<{ dept: string; morningWork: string }[]>([
    { dept: '', morningWork: '' }
  ]);

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
      title: '',
      date: ''
    });

    // TODO: 작업 일정도 초기화
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      // const res = props.isEdit ? await editUser(form.getFieldsValue()) : await addUser(form.getFieldsValue());
      // if (res) {
      //   props.handleIsModalVisible(false);
      //   resetFields();
      //   props.handleSearch();
      // }
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
        console.log(date);

        // setDate(new Date(props.selectedDate));
      } else {
        // 생성 모드
        resetFields();
      }
    }
  }, [props.isModalVisible]);

  // 작업 추가 함수
  const handleAdd = (type: 'am' | 'pm') => {
    console.log('worItems', form);
    if (type === 'am') setAmWorkItems([...amWorkItems, { dept: '', morningWork: '' }]);
    else setPmWorkItems([...pmWorkItems, { dept: '', morningWork: '' }]);
  };

  // 작업 삭제 함수
  const handleRemove = (index: number, type: 'am' | 'pm') => {
    const updatedItems =
      type === 'am' ? amWorkItems.filter((_, i) => i !== index) : pmWorkItems.filter((_, i) => i !== index);
    if (type === 'am') setAmWorkItems(updatedItems);
    else setPmWorkItems(updatedItems);
  };

  // 작업 변경 함수
  const handleChange = (value: string, field: string, index: number, type: 'am' | 'pm') => {
    const updatedItems = type === 'am' ? amWorkItems : pmWorkItems;
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setAmWorkItems(updatedItems);
  };

  return (
    <div className="add-schedule-modal">
      <Modal
        title="작업 일정 설정"
        isModalVisible={props.isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        okText={props.isEdit ? '수정' : '등록'}
        cancelText="취소"
        width={900}>
        <Form
          style={{ marginTop: '20px' }}
          {...formItemLayout}
          className="antd-form"
          form={form}
          initialValues={form.getFieldsValue()}>
          <Form.Item label="주요 일정명" name="title">
            <Input />
          </Form.Item>

          <Form.Item label="작업일자" name="date">
            <DatePicker onChange={value => setDate(value)} className="w-100" />
          </Form.Item>

          <div className="work-items">
            <DynamicWorkItems
              workItems={amWorkItems} // 자식 컴포넌트에 workItems를 전달
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleChange={handleChange}
              type="am"
            />
            <DynamicWorkItems
              workItems={pmWorkItems} // 자식 컴포넌트에 workItems를 전달
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleChange={handleChange}
              type="pm"
            />
          </div>
        </Form>
      </Modal>
    </div>
  );
};
export default AddSchedule;
