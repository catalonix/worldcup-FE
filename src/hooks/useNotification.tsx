import { notification } from 'antd';
import { useCallback } from 'react';

const useNotification = () => {
  const openNotification = useCallback(
    (type: 'success' | 'info' | 'warning' | 'error', message: string, description?: string) => {
      notification[type]({
        message,
        description,
        duration: 2 // 2초 후 자동 닫힘
      });
    },
    []
  );

  return { openNotification };
};

export default useNotification;
