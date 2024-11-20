import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { DatePicker, Form, Input, Button, Modal as AntdModal } from 'antd';
import Modal from 'components/common/Modal';
import DynamicWorkItems from '../DynamicWorkItems';
import useCalendar from 'hooks/useCalendar';
import { ScheduleAmPm } from 'shared/api/calendar/calendarAPIService.types';
import { dateFormat } from 'common/types';
// import useNotification from 'hooks/useNotification';

interface AddScheduleProps {
  isModalVisible: boolean;
  handleIsModalVisible: (value: boolean) => void;
  handleSearch: () => void;
  selectedDate: string;
  isEdit: boolean;
}

dayjs.locale('ko');

const AddSchedule = (props: AddScheduleProps) => {
  //   const { openNotification } = useNotification();
  const { addSchedule, deleteSchedule, editSchedule, getCalendarTaskByDate, task } = useCalendar();
  const [form] = Form.useForm();
  const [date, setDate] = useState<Dayjs>(dayjs(new Date().setDate(new Date().getDate() - 7)));
  const [amWorkItems, setAmWorkItems] = useState<ScheduleAmPm[]>([{ loc: '', main: '', sub: '' }]);
  const [pmWorkItems, setPmWorkItems] = useState<ScheduleAmPm[]>([{ loc: '', main: '', sub: '' }]);

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
      date: '',
      amWorkItems: { loc: '', main: '', sub: '' },
      pmWorkItems: { loc: '', main: '', sub: '' }
    });
    setAmWorkItems([{ loc: '', main: '', sub: '' }]);
    setPmWorkItems([{ loc: '', main: '', sub: '' }]);
  };

  const handleOk = async () => {
    try {
      let res = false;
      await form.validateFields();
      if (props.isEdit) {
        res = await editSchedule({
          title: form.getFieldValue('title'),
          date: dayjs(form.getFieldValue('date')).format('YYYY-MM-DD'),
          am: amWorkItems,
          pm: pmWorkItems
        });
      } else {
        res = await addSchedule({
          title: form.getFieldValue('title'),
          date: dayjs(form.getFieldValue('date')).format('YYYY-MM-DD'),
          am: amWorkItems,
          pm: pmWorkItems
        });
      }

      if (res) {
        form.resetFields();
        props.handleIsModalVisible(false);
        props.handleSearch();
      }
      console.log('res', res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    props.handleIsModalVisible(false);
    resetFields();
  };

  // 작업 추가 함수
  const handleAdd = (type: 'am' | 'pm', workItems: ScheduleAmPm[]) => {
    console.log('HERE', workItems);
    console.log('worItems', form);
    if (type === 'am') {
      setAmWorkItems([...amWorkItems, { loc: '', main: '', sub: '' }]);
    } else {
      setPmWorkItems([...pmWorkItems, { loc: '', main: '', sub: '' }]);
    }
  };

  // 작업 삭제 함수
  const handleRemove = (index: number, type: 'am' | 'pm') => {
    if (type === 'am') {
      const updatedAmItems = amWorkItems.filter((_, i) => i !== index);
      setAmWorkItems(updatedAmItems);
    } else {
      const updatedPmItems = pmWorkItems.filter((_, i) => i !== index);
      setPmWorkItems(updatedPmItems);
    }
  };

  // 작업 변경 함수
  const handleChange = (value: string, field: string, index: number, type: 'am' | 'pm') => {
    if (type === 'am') {
      const updatedItems = [...amWorkItems];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      setAmWorkItems(updatedItems);
    } else {
      const updatedItems = [...pmWorkItems];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      setPmWorkItems(updatedItems);
    }
  };

  const handleClickDeleteButton = () => {
    AntdModal.confirm({
      title: '정말로 삭제하시겠어요?',
      content: '삭제 후 복구할 수 없어요.',
      onOk: async () => {
        const res = await deleteSchedule(dayjs(date).format('YYYY-MM-DD'));
        if (res) {
          props.handleSearch();
          handleCancel();
        }
      }
    });
  };

  const fillTask = async () => {
    await getCalendarTaskByDate(dayjs(props.selectedDate).format(dateFormat));
    form.setFieldValue('title', task?.title);
    form.setFieldValue('date', dayjs(props.selectedDate));
    setAmWorkItems(task?.am || [{ loc: '', main: '', sub: '' }]);
    setPmWorkItems(task?.pm || [{ loc: '', main: '', sub: '' }]);
  };

  useEffect(() => {
    if (props.isModalVisible) {
      if (props.selectedDate) {
        // 수정 모드
        setDate(dayjs(props.selectedDate));
        fillTask();
      } else {
        // 생성 모드
        resetFields();
      }
    }
  }, [props.isModalVisible]);

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
        {props.isEdit && (
          <div style={{ height: '10px' }}>
            <Button className="delete-button" onClick={handleClickDeleteButton}>
              삭제하기
            </Button>
          </div>
        )}

        <Form
          style={{ marginTop: '20px' }}
          {...formItemLayout}
          className="antd-form"
          form={form}
          initialValues={form.getFieldsValue()}>
          <Form.Item label="주요 일정명" name="title">
            <Input />
          </Form.Item>

          <Form.Item label="작업일자" name="date" rules={[{ required: true, message: '날짜를 입력해주세요!' }]}>
            <DatePicker onChange={value => setDate(value)} value={date} className="w-100" />
          </Form.Item>

          <div className="work-items">
            <DynamicWorkItems
              workItems={amWorkItems}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleChange={handleChange}
              type="am"
            />
            <DynamicWorkItems
              workItems={pmWorkItems}
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
