import React, { useState } from 'react';
import { Button, Input } from 'antd';
import useUserManagement from 'hooks/useUserManagement';
import MyPage from './MyPageView';
import useNotification from 'hooks/useNotification';

const CheckPasswordView = () => {
  const { checkPassword } = useUserManagement();
  const { openNotification } = useNotification();

  const [password, setPassword] = useState<string>('');
  const [isCheckedPassword, setIsCheckedPassword] = useState<boolean>(false);

  const handleCheckPassword = async () => {
    if (!password) {
      openNotification('warning', '비밀번호를 입력해주세요.');
      return;
    }
    const res = await checkPassword(password);
    if (res) setIsCheckedPassword(true);
  };

  return isCheckedPassword ? (
    <MyPage />
  ) : (
    <div className="my-page-container">
      <div className="my-page-box">
        <h4>본인 확인을 위해 비밀번호를 입력해주세요</h4>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onPressEnter={handleCheckPassword}
          style={{ marginTop: '1rem' }}
        />
        <Button type="primary" onClick={handleCheckPassword} style={{ width: '100%', marginTop: '2rem' }}>
          확인
        </Button>
      </div>
    </div>
  );
};
export default CheckPasswordView;
