import { useNavigate } from 'react-router-dom';

export enum AppPaths {
  HOME = 'home',
  LOGIN = 'login',
  ALL_PATHS = '*'
}

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const handleNavigateTo = (path: AppPaths) => {
    navigate(`../${path}`);
  };
  return handleNavigateTo;
};
