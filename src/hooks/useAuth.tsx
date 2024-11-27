import { useNavigate } from 'react-router-dom';
import { useLoading } from 'contexts/LoadingContext';
import authAPI from 'shared/api/auth/authAPIService';
import { LoginParams } from 'shared/api/auth/authAPIService.types';
import useNotification from './useNotification';

const useAuth = () => {
  const navigate = useNavigate();

  const { setLoading } = useLoading();
  const { openNotification } = useNotification();

  const login = async (params: LoginParams) => {
    setLoading(true);
    try {
      const result = await authAPI.login(params);
      if (result) {
        localStorage.setItem('accessToken', result.access);
        localStorage.setItem('refreshToken', result.refresh);
        // 메시지 호출
        openNotification('success', '로그인에 성공하였습니다.');
        navigate('/monitoring');
        return true;
      }
    } catch (error) {
      console.error('login', error);
      openNotification('error', '로그인에 실패하였습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    login
  };
};
export default useAuth;
