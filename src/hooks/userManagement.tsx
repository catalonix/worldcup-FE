import { useLoading } from 'contexts/LoadingContext';
import userAPI from 'shared/api/user/userAPIService';
import useNotification from './useNotification';
import { useState } from 'react';
import { GetUserListRequestType, User } from 'shared/api/user/userAPIService.types';

const useUserManagement = () => {
  const { setLoading } = useLoading();
  const { openNotification } = useNotification();
  const [userList, setUserList] = useState<User[]>([]);

  const getUserList = async (params: GetUserListRequestType) => {
    setLoading(true);
    try {
      const result = await userAPI.getUserList(params);
      console.log('result', result);
      if (result) {
        setUserList(result.results);
      }
    } catch (error) {
      console.error('getUserList', error);
      openNotification('error', '유저 조회에 실패하였습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return {
    userList,
    getUserList
  };
};
export default useUserManagement;
