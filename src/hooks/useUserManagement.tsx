import { useLoading } from 'contexts/LoadingContext';
import userAPI from 'shared/api/user/userAPIService';
import useNotification from './useNotification';
import { useState } from 'react';
import { AddUserRequestType, GetUserListRequestType, User } from 'shared/api/user/userAPIService.types';

const useUserManagement = () => {
  const { setLoading } = useLoading();
  const { openNotification } = useNotification();
  const [userList, setUserList] = useState<User[]>([]);

  const getUserList = async (params: GetUserListRequestType) => {
    setLoading(true);
    try {
      const result = await userAPI.getUserList(params);
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

  const addUser = async (params: AddUserRequestType) => {
    setLoading(true);
    try {
      const result = await userAPI.addUser(params);
      openNotification('success', '유저 생성에 성공했어요. ');
      if (result) return true;
    } catch (error) {
      console.error('addUser', error);
      openNotification('error', '유저 생성에 실패했어요. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (params: AddUserRequestType) => {
    setLoading(true);
    try {
      const result = await userAPI.editUser(params);
      openNotification('success', '유저 수정에 성공했어요.');
      if (result) return true;
    } catch (error) {
      console.error('editUser', error);
      openNotification('error', '유저 수정에 실패했어요. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkId = async (userId: string) => {
    setLoading(true);
    try {
      const result = await userAPI.checkId(userId);
      console.log('result', result);
      if (result.exists) {
        openNotification('warning', '이미 사용하고 있는 아이디입니다.');
        return false;
      } else {
        openNotification('success', '사용가능한 아이디입니다.');
        return true;
      }
    } catch (error) {
      console.error('checkId', error);
      openNotification('error', '아이디 중복확인에 실패했어요. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setLoading(true);
    try {
      await userAPI.deleteUser(userId);
      openNotification('success', '아이디 삭제에 성공했어요.');
      return true;
    } catch (error) {
      console.error('deleteUser', error);
      openNotification('error', '아이디 삭제에 실패했어요. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    userList,
    getUserList,
    addUser,
    checkId,
    deleteUser,
    editUser
  };
};
export default useUserManagement;
