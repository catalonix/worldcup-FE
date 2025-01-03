import { useNavigate } from 'react-router-dom';

export enum AppPaths {
  HOME = 'monitoring',
  LOGIN = 'login',
  MYPAGE = 'myPage',
  MONITORING_EQUIPMENT = 'monitoringEquipment',
  NDVI_SUMMARY = 'ndviSummary',
  NDVI_DETAIL = 'ndviDetail',
  SOIL_SUMMARY = 'soilSummary',
  SOIL_DETAIL = 'soilDetail',
  WEATHER_SUMMARY = 'weatherSummary',
  WEATHER_DETAIL = 'weatherDetail',
  OBSERVATION = 'observation',
  REMOTE_OPERATION = 'remoteOperation',
  USER_MANAGEMENT = 'userManagement',
  CALENDAR = 'calendar',
  ALL_PATHS = '*'
}

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const handleNavigateTo = (path: AppPaths) => {
    navigate(`../${path}`);
  };
  return handleNavigateTo;
};
