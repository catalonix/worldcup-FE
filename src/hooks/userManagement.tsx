import { useLoading } from 'contexts/LoadingContext';
import userAPI from 'shared/api/user/userAPIService';

const useUserManagement = () => {
  const { setLoading } = useLoading();

  const getUserList = async () => {
    setLoading(true);
    try {
      const data = await userAPI.getUserList();
      console.log(';data', data);
    } catch (error) {
      console.error('getUserList', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getUserList
  };
};
export default useUserManagement;
