import { useLoading } from 'contexts/LoadingContext';
import authAPI from 'shared/api/auth/authAPIService';
import { LoginParams } from 'shared/api/auth/authAPIService.types';

const useAuth = () => {
  const { setLoading } = useLoading();

  const login = async (params: LoginParams) => {
    setLoading(true);
    try {
      const data = await authAPI.login(params);
      console.log(';data', data);
    } catch (error) {
      console.error('login', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    login
  };
};
export default useAuth;
